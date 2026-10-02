// Lightweight, zero-dependency Node 24 ESM AI Proxy Server
// Provides secure SSE streaming, rate limiting, and hides Gemini & OpenAI API keys

import http from 'node:http';
import { URL } from 'node:url';

// Load .env if present
try {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile();
  }
} catch {
  // .env file is optional; environment variables may be provided directly
}

const PORT = parseInt(process.env.PORT || '3001', 10);
const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || '').trim();
const OPENAI_API_KEY = (process.env.OPENAI_API_KEY || '').trim();

// In-Memory Token Bucket Rate Limiter (30 requests/minute per client IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;

function isRateLimited(clientIp) {
  const now = Date.now();
  const record = rateLimitMap.get(clientIp);

  if (!record || now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(clientIp, { count: 1, startTime: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count++;
  return false;
}

// Clean up stale rate limiter records every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now - record.startTime > RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// Helper: Read request JSON body
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 2 * 1024 * 1024) {
        // 2MB payload guard
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(new Error('Malformed JSON body: ' + err.message));
      }
    });
    req.on('error', reject);
  });
}

// Helper: Set common CORS headers
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Server handler
const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const clientIp =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // 1. Health Check
  if (req.method === 'GET' && (pathname === '/api/health' || pathname === '/health')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        status: 'ok',
        service: 'kundli-ai-proxy',
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        providers: {
          gemini: Boolean(GEMINI_API_KEY),
          openai: Boolean(OPENAI_API_KEY),
        },
      })
    );
    return;
  }

  // 2. AI Consultation Chat Streaming
  if (req.method === 'POST' && pathname === '/api/chat/stream') {
    if (isRateLimited(clientIp)) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          error: 'Too many requests. Please wait a minute before requesting another reading.',
        })
      );
      return;
    }

    let payload;
    try {
      payload = await readJsonBody(req);
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
      return;
    }

    const {
      provider = 'gemini',
      model,
      systemPrompt = '',
      chartContext = '',
      history = [],
      userMessage = '',
    } = payload;

    if (!userMessage.trim()) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'User message is required.' }));
      return;
    }

    // Provider 1: Gemini
    if (provider === 'gemini') {
      if (!GEMINI_API_KEY) {
        res.writeHead(503, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            error:
              'Server GEMINI_API_KEY is not configured in .env. Falling back to client key.',
          })
        );
        return;
      }

      const targetModel = model || 'gemini-2.5-flash';
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:streamGenerateContent?alt=sse&key=${encodeURIComponent(
        GEMINI_API_KEY
      )}`;

      const contents = [];
      const initialContextPrompt = `Here is the native's Vedic Astrological Chart Dossier:\n${chartContext}\n\nPlease keep this context in mind for all inquiries.`;
      contents.push({ role: 'user', parts: [{ text: initialContextPrompt }] });
      contents.push({
        role: 'model',
        parts: [
          {
            text: 'I have ingested your Vedic Chart Dossier. I will consult ancient Jyotish principles, Parashari rules, and transit wisdom to guide you.',
          },
        ],
      });

      for (const msg of history.slice(-8)) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }

      contents.push({ role: 'user', parts: [{ text: userMessage }] });

      try {
        const geminiRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
            contents,
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2500,
            },
          }),
        });

        if (!geminiRes.ok) {
          const errText = await geminiRes.text();
          res.writeHead(geminiRes.status, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: `Gemini API error: ${errText}` }));
          return;
        }

        // Forward SSE Stream
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        });

        const reader = geminiRes.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const jsonStr = trimmed.replace(/^data:\s*/, '');
            if (!jsonStr || jsonStr === '[DONE]') continue;

            try {
              const data = JSON.parse(jsonStr);
              const chunkText =
                data.candidates?.[0]?.content?.parts?.[0]?.text || '';
              if (chunkText) {
                res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
              }
            } catch {
              // Ignore line parse errors
            }
          }
        }

        res.write('data: [DONE]\n\n');
        res.end();
        return;
      } catch (err) {
        console.error('Gemini Stream Error:', err);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        } else {
          res.end();
        }
        return;
      }
    }

    // Provider 2: OpenAI
    if (provider === 'openai') {
      if (!OPENAI_API_KEY) {
        res.writeHead(503, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            error:
              'Server OPENAI_API_KEY is not configured in .env. Falling back to client key.',
          })
        );
        return;
      }

      const messages = [];
      if (systemPrompt) {
        messages.push({ role: 'system', content: systemPrompt });
      }
      messages.push({
        role: 'system',
        content: `Native's Vedic Astrological Dossier:\n${chartContext}`,
      });

      for (const msg of history.slice(-8)) {
        messages.push({ role: msg.role, content: msg.content });
      }
      messages.push({ role: 'user', content: userMessage });

      try {
        const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: model || 'gpt-4o-mini',
            messages,
            stream: true,
            temperature: 0.7,
            max_tokens: 2500,
          }),
        });

        if (!openAiRes.ok) {
          const errText = await openAiRes.text();
          res.writeHead(openAiRes.status, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: `OpenAI API error: ${errText}` }));
          return;
        }

        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        });

        const reader = openAiRes.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const jsonStr = trimmed.replace(/^data:\s*/, '');
            if (jsonStr === '[DONE]') {
              res.write('data: [DONE]\n\n');
              continue;
            }
            try {
              const data = JSON.parse(jsonStr);
              const delta = data.choices?.[0]?.delta?.content || '';
              if (delta) {
                res.write(`data: ${JSON.stringify({ text: delta })}\n\n`);
              }
            } catch {
              // Ignore line parse errors
            }
          }
        }

        res.end();
        return;
      } catch (err) {
        console.error('OpenAI Stream Error:', err);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        } else {
          res.end();
        }
        return;
      }
    }

    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: `Unsupported provider: ${provider}` }));
  }

  // 404 Fallback
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`✨ Kundli AI Proxy Server running at http://localhost:${PORT}`);
  console.log(`   - Health check: http://localhost:${PORT}/api/health`);
  console.log(
    `   - Gemini configured: ${Boolean(GEMINI_API_KEY) ? '✅ Yes' : '❌ No (set GEMINI_API_KEY in .env)'}`
  );
  console.log(
    `   - OpenAI configured: ${Boolean(OPENAI_API_KEY) ? '✅ Yes' : '❌ No (set OPENAI_API_KEY in .env)'}`
  );
});
