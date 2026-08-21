import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Chip } from '@heroui/react';
import {
  Sparkles,
  MessageSquare,
  Briefcase,
  Heart,
  Coins,
  Activity,
  Key,
  Send,
  RotateCcw,
  Copy,
  Check,
  ExternalLink,
  Bot,
  User,
  ShieldCheck,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  HelpCircle,
  StopCircle,
} from 'lucide-react';

import {
  buildAstrologicalContext,
  getSystemPrompt,
  QUICK_PROMPTS,
} from '../engine/aiPromptEngine.js';
import {
  getStoredConfig,
  saveStoredConfig,
  isAiConfigured,
  validateApiKey,
  streamAstrologyConsultation,
  AVAILABLE_MODELS,
} from '../engine/llmService.js';
import { CONSULTATION_TOPICS, generateAstrologicalInsight } from '../engine/aiConsultation.js';

const categoryIconMap = {
  career: Briefcase,
  marriage: Heart,
  wealth: Coins,
  dasha: Sparkles,
  remedies: Activity,
};

export default function AiConsultationView({ kundliData, birthDateObj, t, lang }) {
  // AI Config & Settings State
  const [aiConfig, setAiConfig] = useState(getStoredConfig());
  const [showSettings, setShowSettings] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(
    aiConfig.provider === 'gemini' ? aiConfig.geminiKey : aiConfig.openAiKey
  );
  const [tempProvider, setTempProvider] = useState(aiConfig.provider);
  const [tempModel, setTempModel] = useState(
    aiConfig.provider === 'gemini' ? aiConfig.geminiModel : aiConfig.openAiModel
  );
  const [tempBaseUrl, setTempBaseUrl] = useState(aiConfig.openAiBaseUrl);
  const [showKeyText, setShowKeyText] = useState(false);
  const [validationStatus, setValidationStatus] = useState(null); // { type: 'success' | 'error', message: string }
  const [isValidating, setIsValidating] = useState(false);

  // Chat State
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [activeCategory, setActiveCategory] = useState('career');
  const [copiedId, setCopiedId] = useState(null);

  const abortControllerRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Sync config on mount
  useEffect(() => {
    const cfg = getStoredConfig();
    setAiConfig(cfg);
    setTempProvider(cfg.provider);
    setTempApiKey(cfg.provider === 'gemini' ? cfg.geminiKey : cfg.openAiKey);
    setTempModel(cfg.provider === 'gemini' ? cfg.geminiModel : cfg.openAiModel);
    setTempBaseUrl(cfg.openAiBaseUrl);
  }, []);

  // Update temp key/model when provider toggles in settings
  const handleProviderChange = (provider) => {
    setTempProvider(provider);
    if (provider === 'gemini') {
      setTempApiKey(aiConfig.geminiKey);
      setTempModel(aiConfig.geminiModel || 'gemini-2.5-flash');
    } else {
      setTempApiKey(aiConfig.openAiKey);
      setTempModel(aiConfig.openAiModel || 'gpt-4o-mini');
    }
    setValidationStatus(null);
  };

  // Scroll to bottom when messages or streaming text updates
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText, isStreaming]);

  // Initial Welcome Message
  useEffect(() => {
    if (messages.length === 0 && kundliData) {
      const asc = kundliData.panchang?.ascendant || 'Lagna';
      const rashi = kundliData.panchang?.moonSign || 'Moon Sign';
      const nak = kundliData.panchang?.nakshatra || 'Nakshatra';

      let welcomeContent = '';
      if (lang === 'gu') {
        welcomeContent = `🙏 **નમસ્તે! હું તમારો AI વૈદિક જ્યોતિષાચાર્ય છું.**\n\nમેં તમારી જન્મકુંડળીનું ગહન વિશ્લેષણ કર્યું છે:\n- **લગ્ન (Ascendant):** ${asc}\n- **ચંદ્ર રાશિ (Moon Sign):** ${rashi}\n- **જન્મ નક્ષત્ર (Nakshatra):** ${nak}\n\nતમે કારકિર્દી, લગ્ન, ધન, મહાદશા, સાડાસાતી કે રત્ન અને વૈદિક ઉપાયો વિશે કોઈપણ પ્રશ્ન પૂછી શકો છો.`;
      } else if (lang === 'hi') {
        welcomeContent = `🙏 **प्रणाम! मैं आपका AI वैदिक ज्योतिषाचार्य हूँ।**\n\nमैंने आपकी जन्म कुंडली का सूक्ष्म विश्लेषण किया है:\n- **लग्न (Ascendant):** ${asc}\n- **चंद्र राशि (Moon Sign):** ${rashi}\n- **जन्म नक्षत्र (Nakshatra):** ${nak}\n\nआप अपने करियर, विवाह, धन, महादशा, साढ़ेसाती या रत्न एवं वैदिक उपायों के विषय में कोई भी प्रश्न पूछ सकते हैं।`;
      } else {
        welcomeContent = `🙏 **Pranam! I am your AI Vedic Astrologer.**\n\nI have carefully analyzed your natal Kundli:\n- **Ascendant (Lagna):** ${asc}\n- **Moon Sign (Rashi):** ${rashi}\n- **Birth Nakshatra:** ${nak}\n\nAsk me anything regarding your career prospects, marriage timeline, financial yogas, running Mahadasha, or authentic Vedic remedies.`;
      }

      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: welcomeContent,
          timestamp: new Date(),
          isOffline: !isAiConfigured(),
        },
      ]);
    }
  }, [kundliData, lang]);

  // Save Settings Handler
  const handleSaveSettings = () => {
    const updated = {
      provider: tempProvider,
      geminiKey: tempProvider === 'gemini' ? tempApiKey : aiConfig.geminiKey,
      openAiKey: tempProvider === 'openai' ? tempApiKey : aiConfig.openAiKey,
      geminiModel: tempProvider === 'gemini' ? tempModel : aiConfig.geminiModel,
      openAiModel: tempProvider === 'openai' ? tempModel : aiConfig.openAiModel,
      openAiBaseUrl: tempBaseUrl,
    };
    saveStoredConfig(updated);
    setAiConfig(updated);
    setShowSettings(false);
    setValidationStatus({
      type: 'success',
      message: t?.aiKeyValid || 'Settings saved successfully!',
    });
  };

  // Test API Key Handler
  const handleTestKey = async () => {
    setIsValidating(true);
    setValidationStatus(null);
    try {
      await validateApiKey(tempProvider, tempApiKey, tempModel, tempBaseUrl);
      setValidationStatus({
        type: 'success',
        message: t?.aiKeyValid || 'API Key is active and verified!',
      });
    } catch (err) {
      setValidationStatus({
        type: 'error',
        message: err.message || 'Validation failed. Check your API key and network.',
      });
    } finally {
      setIsValidating(false);
    }
  };

  // Stop Generation Handler
  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  };

  // Send Message Handler
  const handleSendMessage = async (userQuery) => {
    const query = (userQuery || inputValue).trim();
    if (!query || isStreaming || !kundliData) return;

    setInputValue('');
    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);

    const hasApiKey = isAiConfigured();

    // 1. If NO API KEY configured -> Fallback to Offline Astrological Synthesis Engine
    if (!hasApiKey) {
      setIsStreaming(true);
      setStreamingText('');

      // Find topic match or fallback
      let matchedTopic = 'career';
      const qLower = query.toLowerCase();
      if (
        qLower.includes('marri') ||
        qLower.includes('spous') ||
        qLower.includes('love') ||
        qLower.includes('લગ્ન') ||
        qLower.includes('વિવાહ')
      ) {
        matchedTopic = 'marriage';
      } else if (
        qLower.includes('money') ||
        qLower.includes('wealth') ||
        qLower.includes('finance') ||
        qLower.includes('ધન') ||
        qLower.includes('પૈસા') ||
        qLower.includes('सम्पत्ति')
      ) {
        matchedTopic = 'wealth';
      } else if (
        qLower.includes('health') ||
        qLower.includes('illness') ||
        qLower.includes('રોગ') ||
        qLower.includes('સ્વાસ્થ્ય') ||
        qLower.includes('रोग') ||
        qLower.includes('स्वास्थ्य')
      ) {
        matchedTopic = 'health';
      } else if (
        qLower.includes('study') ||
        qLower.includes('exam') ||
        qLower.includes('education') ||
        qLower.includes('વિદ્યા') ||
        qLower.includes('શિક્ષણ') ||
        qLower.includes('शिक्षा')
      ) {
        matchedTopic = 'education';
      } else if (
        qLower.includes('spirit') ||
        qLower.includes('god') ||
        qLower.includes('moksha') ||
        qLower.includes('ધર્મ') ||
        qLower.includes('મોક્ષ') ||
        qLower.includes('पूजा')
      ) {
        matchedTopic = 'spirituality';
      }

      const insight = generateAstrologicalInsight(matchedTopic, kundliData, lang);

      // Simulate rapid typewriter for offline response
      const synthesizedText = `**[${t?.aiModeOffline || 'Offline Vedic Engine'}] Astrological Analysis (${insight.topic}):**\n\n${insight.summary[lang] || insight.summary.en}\n\n**🔑 Key Planetary Influencers:** ${insight.keyInfluencers}\n\n**💡 Auspicious Astrological Guidance & Upaye:**\n${insight.actionPlan[lang] || insight.actionPlan.en}\n\n*(Tip: Add your free Google Gemini API key in **AI Settings** above for full multi-turn conversational answers.)*`;

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `asst-${Date.now()}`,
            role: 'assistant',
            content: synthesizedText,
            timestamp: new Date(),
            isOffline: true,
          },
        ]);
        setIsStreaming(false);
      }, 500);
      return;
    }

    // 2. LIVE LLM STREAMING
    setIsStreaming(true);
    setStreamingText('');

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const chartContext = buildAstrologicalContext(kundliData, birthDateObj, lang);
      const systemPrompt = getSystemPrompt(lang);

      // Filter previous messages for history (only text contents)
      const filteredHistory = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, content: m.content }));

      let finalResponse = '';
      await streamAstrologyConsultation({
        systemPrompt,
        chartContext,
        history: filteredHistory,
        userMessage: query,
        onChunk: (accumulated) => {
          setStreamingText(accumulated);
          finalResponse = accumulated;
        },
        signal: controller.signal,
      });

      if (finalResponse) {
        setMessages((prev) => [
          ...prev,
          {
            id: `asst-${Date.now()}`,
            role: 'assistant',
            content: finalResponse,
            timestamp: new Date(),
            isOffline: false,
          },
        ]);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        // User aborted
        if (streamingText) {
          setMessages((prev) => [
            ...prev,
            {
              id: `asst-${Date.now()}`,
              role: 'assistant',
              content: streamingText + '\n\n*(Generation stopped by user)*',
              timestamp: new Date(),
              isOffline: false,
            },
          ]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'assistant',
            content: `⚠️ **AI Consultation Error:** ${err.message || 'Unable to connect to AI provider.'}\n\nPlease check your API key in **AI Settings** or verify your internet connection.`,
            timestamp: new Date(),
            isError: true,
          },
        ]);
      }
    } finally {
      setIsStreaming(false);
      setStreamingText('');
      abortControllerRef.current = null;
    }
  };

  // Copy Message Handler
  const handleCopyMessage = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Clear Chat Handler
  const handleClearChat = () => {
    setMessages([]);
    setStreamingText('');
  };

  if (!kundliData) return null;

  const isConfigured = isAiConfigured();
  const currentCategoryPrompts =
    QUICK_PROMPTS.find((p) => p.category === activeCategory) || QUICK_PROMPTS[0];

  return (
    <Card className="rounded-2xl glass-panel p-4 sm:p-6 shadow-sm space-y-5 border border-[var(--border-gold)]">
      {/* Header Bar */}
      <Card.Header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4 p-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl glass-badge-gold">
              <Sparkles className="h-5 w-5 text-[var(--text-gold)]" />
            </div>
            <div>
              <Card.Title className="text-xl font-bold font-serif text-[var(--text-primary)] flex items-center gap-2">
                {t?.aiAstrologerTitle || 'AI Vedic Astrologer'}
              </Card.Title>
              <Card.Description className="text-xs text-[var(--text-muted)]">
                {t?.aiAstrologerSubtitle ||
                  'Conversational astrological consultation grounded in your complete Kundli dossier'}
              </Card.Description>
            </div>
          </div>
        </div>

        {/* Action Controls: AI Mode Badge & Settings Toggle */}
        <div className="flex items-center gap-2">
          <Chip
            className={`px-3 py-1 text-xs font-medium border ${
              isConfigured
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
            }`}
          >
            <Chip.Label className="flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}
              />
              {isConfigured
                ? `${aiConfig.provider === 'gemini' ? 'Gemini 2.5' : 'OpenAI'} AI Active`
                : t?.aiModeOffline || 'Offline Vedic Engine'}
            </Chip.Label>
          </Chip>

          <Button
            type="button"
            onPress={() => setShowSettings(!showSettings)}
            className="flex items-center gap-1.5 rounded-xl glass-card px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--border-gold)] transition cursor-pointer"
            title="Configure AI Provider & API Key"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--text-gold)]" />
            <span>{t?.aiSettings || 'AI Settings'}</span>
            {showSettings ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </Button>

          {messages.length > 1 && (
            <Button
              type="button"
              onPress={handleClearChat}
              className="p-1.5 rounded-xl glass-card text-[var(--text-muted)] hover:text-rose-500 transition cursor-pointer"
              title={t?.aiClearChat || 'Clear History'}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card.Header>

      {/* Collapsible Settings Drawer */}
      {showSettings && (
        <Card className="rounded-2xl glass-panel-accent p-5 space-y-4 border border-[var(--border-gold)] animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
            <h4 className="text-sm font-semibold font-serif text-[var(--text-primary)] flex items-center gap-2">
              <Key className="h-4 w-4 text-[var(--text-gold)]" />
              {t?.aiSettings || 'AI Provider & Key Configuration'}
            </h4>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--text-gold)] hover:underline flex items-center gap-1"
            >
              <span>{t?.getFreeGeminiKey || 'Get free Gemini API Key'}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Provider Select */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--text-secondary)]">
                {t?.aiProvider || 'AI Provider'}
              </label>
              <select
                value={tempProvider}
                onChange={(e) => handleProviderChange(e.target.value)}
                className="w-full rounded-xl glass-input px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none"
              >
                <option value="gemini" className="dark:bg-[#151928] bg-[var(--depth-2)]">
                  Google Gemini (Recommended Free)
                </option>
                <option value="openai" className="dark:bg-[#151928] bg-[var(--depth-2)]">
                  OpenAI / OpenRouter Compatible
                </option>
              </select>
            </div>

            {/* Model Select */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--text-secondary)]">
                {t?.aiModel || 'Model'}
              </label>
              <select
                value={tempModel}
                onChange={(e) => setTempModel(e.target.value)}
                className="w-full rounded-xl glass-input px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none"
              >
                {(AVAILABLE_MODELS[tempProvider] || AVAILABLE_MODELS.gemini).map((m) => (
                  <option key={m.id} value={m.id} className="dark:bg-[#151928] bg-[var(--depth-2)]">
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* API Key Input */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--text-secondary)]">
                {t?.aiApiKey || 'API Key'}
              </label>
              <div className="relative">
                <input
                  type={showKeyText ? 'text' : 'password'}
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder={t?.aiKeyPlaceholder || 'AIzaSy... / sk-...'}
                  className="w-full rounded-xl glass-input pl-3 pr-14 py-2 text-xs text-[var(--text-primary)] font-mono focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowKeyText(!showKeyText)}
                  className="absolute right-2 top-2 text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] px-1.5 py-0.5 rounded cursor-pointer"
                >
                  {showKeyText ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>

          {/* Validation Status Message */}
          {validationStatus && (
            <div
              className={`p-2.5 rounded-xl text-xs flex items-center gap-2 border ${
                validationStatus.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-300'
              }`}
            >
              {validationStatus.type === 'success' ? (
                <ShieldCheck className="h-4 w-4 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0" />
              )}
              <span>{validationStatus.message}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <Button
              type="button"
              onPress={handleTestKey}
              disabled={isValidating || !tempApiKey}
              className="rounded-xl glass-card px-3.5 py-1.5 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--border-gold)] transition cursor-pointer disabled:opacity-50"
            >
              {isValidating ? 'Validating...' : t?.aiTestKey || 'Test Key'}
            </Button>
            <Button
              type="button"
              onPress={handleSaveSettings}
              className="rounded-xl glass-button-primary px-4 py-1.5 text-xs font-medium text-[#0c0e17] transition shadow-xs cursor-pointer"
            >
              {t?.aiSaveSettings || 'Save Settings'}
            </Button>
          </div>
        </Card>
      )}

      {/* Offline Notice Banner if API Key is not set */}
      {!isConfigured && (
        <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 text-xs text-[var(--text-primary)] flex items-start gap-2.5">
          <HelpCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-700 dark:text-amber-300">
              {t?.aiModeOffline || 'Offline Vedic Engine Active'}
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {t?.aiOfflineNotice ||
                'You can ask questions using the built-in classical rules. To enable deep conversational multi-turn AI consultations in Gujarati, Hindi & English, click "AI Settings" above and paste a free Google Gemini key.'}
            </p>
          </div>
        </div>
      )}

      {/* Astrological Quick-Prompt Category Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[var(--text-gold)]" />
            {t?.aiQuickPrompts || 'Quick Astrological Guidance Topics'}:
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 pb-1">
          {QUICK_PROMPTS.map((cat) => {
            const Icon = categoryIconMap[cat.category] || Sparkles;
            const isActive = activeCategory === cat.category;
            return (
              <button
                key={cat.category}
                type="button"
                onClick={() => setActiveCategory(cat.category)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer border ${
                  isActive
                    ? 'border-[var(--border-gold)] glass-button-primary text-[#0c0e17] shadow-xs'
                    : 'border-[var(--border-subtle)] glass-card text-[var(--text-primary)] hover:border-[var(--border-gold)]/50'
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 ${isActive ? 'text-[#0c0e17]' : 'text-[var(--text-gold)]'}`}
                />
                <span>{cat.title[lang] || cat.title.en}</span>
              </button>
            );
          })}
        </div>

        {/* Suggested Question Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
          {currentCategoryPrompts.questions.map((qObj, qIdx) => {
            const questionText = qObj[lang] || qObj.en;
            return (
              <button
                key={qIdx}
                type="button"
                disabled={isStreaming}
                onClick={() => handleSendMessage(questionText)}
                className="text-left p-2.5 rounded-xl glass-card border border-[var(--border-subtle)] hover:border-[var(--border-gold)] text-xs text-[var(--text-primary)] hover:text-[var(--text-gold)] transition cursor-pointer disabled:opacity-50 line-clamp-2"
              >
                💬 {questionText}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Multi-turn Chat Stream Canvas */}
      <div className="rounded-2xl glass-card p-4 space-y-4 max-h-[460px] min-h-[280px] overflow-y-auto border border-[var(--border-subtle)]">
        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';
          const isUser = msg.role === 'user';
          const isError = msg.isError;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              {isAssistant && (
                <div className="h-8 w-8 rounded-full glass-badge-gold flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="h-4 w-4 text-[var(--text-gold)]" />
                </div>
              )}

              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
                  isUser
                    ? 'glass-button-primary text-[#0c0e17] rounded-tr-none font-medium'
                    : isError
                      ? 'bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 rounded-tl-none'
                      : 'glass-panel text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-tl-none'
                }`}
              >
                {/* Content formatting with Markdown-like paragraphs and bullet lines */}
                <div className="space-y-2 whitespace-pre-wrap">
                  {msg.content.split('\n\n').map((block, bIdx) => (
                    <p key={bIdx} className="leading-relaxed">
                      {block}
                    </p>
                  ))}
                </div>

                {/* Footer metadata & copy action */}
                <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5 text-[10px] text-[var(--text-muted)]">
                  <span>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    {msg.isOffline && ' • Offline Synthesis'}
                  </span>

                  {isAssistant && (
                    <button
                      type="button"
                      onClick={() => handleCopyMessage(msg.id, msg.content)}
                      className="opacity-60 hover:opacity-100 flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-gold)] transition cursor-pointer"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-500" />
                          <span className="text-emerald-500">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {isUser && (
                <div className="h-8 w-8 rounded-full glass-card border border-[var(--border-gold)] flex items-center justify-center shrink-0 mt-0.5">
                  <User className="h-4 w-4 text-[var(--text-gold)]" />
                </div>
              )}
            </div>
          );
        })}

        {/* Live Streaming Response Bubble */}
        {isStreaming && (
          <div className="flex gap-3 justify-start animate-fadeIn">
            <div className="h-8 w-8 rounded-full glass-badge-gold flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="h-4 w-4 text-[var(--text-gold)] animate-pulse" />
            </div>

            <div className="max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed glass-panel text-[var(--text-primary)] border border-[var(--border-gold)] rounded-tl-none space-y-2">
              <div className="flex items-center gap-2 text-xs text-[var(--text-gold)] font-medium pb-1 border-b border-[var(--border-subtle)]">
                <Sparkles className="h-3.5 w-3.5 animate-spin" />
                <span>
                  {t?.aiThinking || 'Analyzing planetary placements and dasha timeline...'}
                </span>
              </div>

              {streamingText ? (
                <div className="space-y-2 whitespace-pre-wrap">
                  {streamingText.split('\n\n').map((block, bIdx) => (
                    <p key={bIdx} className="leading-relaxed">
                      {block}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="flex gap-1.5 py-2">
                  <span
                    className="h-2 w-2 rounded-full bg-[var(--text-gold)] animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="h-2 w-2 rounded-full bg-[var(--text-gold)] animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="h-2 w-2 rounded-full bg-[var(--text-gold)] animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Query Bar with Stop/Send Controls */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              t?.aiAskPlaceholder ||
              'Ask anything about your career, marriage, dasha, health, or remedies...'
            }
            disabled={isStreaming}
            className="w-full rounded-xl glass-input pl-4 pr-10 py-3 text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none disabled:opacity-50"
          />
        </div>

        {isStreaming ? (
          <Button
            type="button"
            onPress={handleStopStreaming}
            className="flex items-center gap-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 px-4 py-3 text-xs font-medium text-rose-500 transition cursor-pointer"
          >
            <StopCircle className="h-4 w-4" />
            <span>Stop</span>
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!inputValue.trim() || !kundliData}
            className="flex items-center gap-1.5 rounded-xl glass-button-primary px-5 py-3 text-xs sm:text-sm font-medium text-[#0c0e17] transition shadow-xs cursor-pointer disabled:opacity-50"
          >
            <span>{t?.aiSend || 'Consult'}</span>
            <Send className="h-4 w-4" />
          </Button>
        )}
      </form>
    </Card>
  );
}
