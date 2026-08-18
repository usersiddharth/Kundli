// Universal LLM Service for Client-Side AI Astrology Consultations
// Supports Google Gemini API & OpenAI-compatible endpoints with SSE Streaming

const STORAGE_KEYS = {
  PROVIDER: 'astro_ai_provider',
  GEMINI_KEY: 'astro_gemini_api_key',
  OPENAI_KEY: 'astro_openai_api_key',
  GEMINI_MODEL: 'astro_gemini_model',
  OPENAI_MODEL: 'astro_openai_model',
  OPENAI_BASE_URL: 'astro_openai_base_url',
};

export const AVAILABLE_MODELS = {
  gemini: [
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (Ultra Fast & Smart)', isDefault: true },
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (Deep Astrological Reasoning)' },
  ],
  openai: [
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini (Fast & Affordable)', isDefault: true },
    { id: 'gpt-4o', name: 'GPT-4o (High Intelligence)' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  ],
};

// Storage Helpers
export function getStoredConfig() {
  return {
    provider: localStorage.getItem(STORAGE_KEYS.PROVIDER) || 'gemini',
    geminiKey: localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) || '',
    openAiKey: localStorage.getItem(STORAGE_KEYS.OPENAI_KEY) || '',
    geminiModel: localStorage.getItem(STORAGE_KEYS.GEMINI_MODEL) || 'gemini-2.5-flash',
    openAiModel: localStorage.getItem(STORAGE_KEYS.OPENAI_MODEL) || 'gpt-4o-mini',
    openAiBaseUrl:
      localStorage.getItem(STORAGE_KEYS.OPENAI_BASE_URL) || 'https://api.openai.com/v1',
  };
}

export function saveStoredConfig(config) {
  if (config.provider) localStorage.setItem(STORAGE_KEYS.PROVIDER, config.provider);
  if (config.geminiKey !== undefined)
    localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, config.geminiKey.trim());
  if (config.openAiKey !== undefined)
    localStorage.setItem(STORAGE_KEYS.OPENAI_KEY, config.openAiKey.trim());
  if (config.geminiModel) localStorage.setItem(STORAGE_KEYS.GEMINI_MODEL, config.geminiModel);
  if (config.openAiModel) localStorage.setItem(STORAGE_KEYS.OPENAI_MODEL, config.openAiModel);
  if (config.openAiBaseUrl !== undefined)
    localStorage.setItem(STORAGE_KEYS.OPENAI_BASE_URL, config.openAiBaseUrl.trim());
}

export function isAiConfigured() {
  const cfg = getStoredConfig();
  if (cfg.provider === 'gemini') return Boolean(cfg.geminiKey);
  if (cfg.provider === 'openai') return Boolean(cfg.openAiKey);
  return false;
}

/**
 * Validate an API key with a minimal probe call
 */
export async function validateApiKey(
  provider,
  apiKey,
  model,
  baseUrl = 'https://api.openai.com/v1'
) {
  if (!apiKey) throw new Error('API key is empty');

  if (provider === 'gemini') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-2.5-flash'}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Respond with OK' }] }],
        generationConfig: { maxOutputTokens: 5 },
      }),
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(
        errJson.error?.message || `HTTP ${res.status}: Gemini API key validation failed.`
      );
    }
    return true;
  }

  if (provider === 'openai') {
    const cleanBase = baseUrl.replace(/\/+$/, '');
    const url = `${cleanBase}/chat/completions`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Respond with OK' }],
        max_tokens: 5,
      }),
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(
        errJson.error?.message || `HTTP ${res.status}: OpenAI API key validation failed.`
      );
    }
    return true;
  }

  throw new Error(`Unsupported provider: ${provider}`);
}

/**
 * Stream consultation response from Google Gemini API
 */
async function streamGeminiChat({
  apiKey,
  model,
  systemPrompt,
  chartContext,
  history = [],
  userMessage,
  onChunk,
  signal,
}) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey)}`;

  // Construct Gemini contents array
  const contents = [];

  // Context injection as first interaction
  const initialContextPrompt = `Here is the native's Vedic Astrological Chart Dossier:\n${chartContext}\n\nPlease keep this context in mind for all inquiries.`;
  contents.push({ role: 'user', parts: [{ text: initialContextPrompt }] });
  contents.push({
    role: 'model',
    parts: [
      {
        text: "Pranam. I have analyzed the native's complete Kundli dossier, planetary placements, Bhavas, and Dasha timeline. I am ready to offer classical Vedic guidance.",
      },
    ],
  });

  // Add conversation history
  history.forEach((msg) => {
    if (msg.role === 'user') {
      contents.push({ role: 'user', parts: [{ text: msg.content }] });
    } else if (msg.role === 'assistant') {
      contents.push({ role: 'model', parts: [{ text: msg.content }] });
    }
  });

  // Add the current user query
  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  const bodyPayload = {
    contents,
    systemInstruction: {
      role: 'system',
      parts: [{ text: systemPrompt }],
    },
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 2048,
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyPayload),
    signal,
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    throw new Error(
      errorJson.error?.message || `HTTP ${response.status}: Failed to stream from Gemini API.`
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let accumulatedText = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || ''; // Keep remainder in buffer

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('data: ')) {
        const jsonStr = trimmed.slice(6);
        if (jsonStr === '[DONE]') continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const chunkText = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (chunkText) {
            accumulatedText += chunkText;
            onChunk(accumulatedText);
          }
        } catch {
          // ignore chunk parse errors
        }
      }
    }
  }

  return accumulatedText;
}

/**
 * Stream consultation response from OpenAI / Compatible API
 */
async function streamOpenAIChat({
  apiKey,
  model,
  baseUrl = 'https://api.openai.com/v1',
  systemPrompt,
  chartContext,
  history = [],
  userMessage,
  onChunk,
  signal,
}) {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const endpoint = `${cleanBase}/chat/completions`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Native's Astrological Dossier:\n${chartContext}` },
    {
      role: 'assistant',
      content:
        "Understood. I have reviewed the native's Kundli positions, Dasha, and Yogas and am ready to provide authentic Vedic guidance.",
    },
  ];

  history.forEach((msg) => {
    messages.push({ role: msg.role, content: msg.content });
  });

  messages.push({ role: 'user', content: userMessage });

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model || 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      stream: true,
    }),
    signal,
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    throw new Error(
      errorJson.error?.message || `HTTP ${response.status}: Failed to stream from OpenAI API.`
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let accumulatedText = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('data: ')) {
        const jsonStr = trimmed.slice(6);
        if (jsonStr === '[DONE]') continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const chunkText = parsed.choices?.[0]?.delta?.content || '';
          if (chunkText) {
            accumulatedText += chunkText;
            onChunk(accumulatedText);
          }
        } catch {
          // ignore
        }
      }
    }
  }

  return accumulatedText;
}

/**
 * Universal Stream Caller
 */
export async function streamAstrologyConsultation({
  systemPrompt,
  chartContext,
  history = [],
  userMessage,
  onChunk,
  signal,
}) {
  const config = getStoredConfig();

  if (config.provider === 'gemini') {
    if (!config.geminiKey) {
      throw new Error(
        'Google Gemini API key is not configured. Please add your key in AI Settings.'
      );
    }
    return streamGeminiChat({
      apiKey: config.geminiKey,
      model: config.geminiModel,
      systemPrompt,
      chartContext,
      history,
      userMessage,
      onChunk,
      signal,
    });
  }

  if (config.provider === 'openai') {
    if (!config.openAiKey) {
      throw new Error('OpenAI API key is not configured. Please add your key in AI Settings.');
    }
    return streamOpenAIChat({
      apiKey: config.openAiKey,
      model: config.openAiModel,
      baseUrl: config.openAiBaseUrl,
      systemPrompt,
      chartContext,
      history,
      userMessage,
      onChunk,
      signal,
    });
  }

  throw new Error(`Invalid provider '${config.provider}'.`);
}
