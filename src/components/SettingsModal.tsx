import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Settings, 
  Check, 
  AlertCircle, 
  X, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Sliders,
  Globe,
  Cpu,
  CheckCheck
} from 'lucide-react';
import { ApiConfig, AiProvider } from '../types';
import { 
  AVAILABLE_GEMINI_MODELS,
  AVAILABLE_CUSTOM_AI_PRESETS,
  POPULAR_CUSTOM_AI_MODELS,
  testCustomAiConnection, 
  testGeminiConnection
} from '../services/openai';

interface SettingsModalProps {
  config: ApiConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newConfig: ApiConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  config,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ApiConfig>(() => {
    const provider = (config.provider === 'openai' ? 'custom_ai' : config.provider) || 'gemini';
    return {
      ...config,
      provider,
      customAiApiKey: config.customAiApiKey || config.apiKey || '',
      customAiBaseUrl: config.customAiBaseUrl || config.baseUrl || 'https://api.openai.com/v1',
      customAiModel: config.customAiModel || config.model || 'gpt-4o',
      geminiApiKey: config.geminiApiKey || '',
      geminiModel: config.geminiModel || 'gemini-3.8-flash',
    };
  });

  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    const provider = (config.provider === 'openai' ? 'custom_ai' : config.provider) || 'gemini';
    setFormData({
      ...config,
      provider,
      customAiApiKey: config.customAiApiKey || config.apiKey || '',
      customAiBaseUrl: config.customAiBaseUrl || config.baseUrl || 'https://api.openai.com/v1',
      customAiModel: config.customAiModel || config.model || 'gpt-4o',
      geminiApiKey: config.geminiApiKey || '',
      geminiModel: config.geminiModel || 'gemini-3.8-flash',
    });
    setTestResult(null);
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handleProviderChange = (provider: AiProvider) => {
    let defaultModel = formData.model;
    if (provider === 'gemini') {
      defaultModel = formData.geminiModel || 'gemini-3.8-flash';
    } else {
      defaultModel = formData.customAiModel || 'gpt-4o';
    }

    setFormData(prev => ({
      ...prev,
      provider,
      model: defaultModel,
    }));
    setTestResult(null);
  };

  const handleApplyPreset = (preset: typeof AVAILABLE_CUSTOM_AI_PRESETS[0]) => {
    setFormData(prev => ({
      ...prev,
      customAiBaseUrl: preset.url,
      customAiModel: preset.defaultModel,
      baseUrl: preset.url,
      model: preset.defaultModel,
    }));
  };

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);

    const activeProvider = formData.provider === 'gemini' ? 'gemini' : 'custom_ai';

    if (activeProvider === 'gemini') {
      const result = await testGeminiConnection(formData);
      setTestResult(result);
    } else {
      const result = await testCustomAiConnection(formData);
      setTestResult(result);
    }
    setIsTesting(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalProvider = formData.provider === 'gemini' ? 'gemini' : 'custom_ai';
    
    const updatedConfig: ApiConfig = {
      ...formData,
      provider: finalProvider,
      apiKey: formData.customAiApiKey || formData.apiKey || '',
      baseUrl: formData.customAiBaseUrl || formData.baseUrl || 'https://api.openai.com/v1',
      model: finalProvider === 'gemini' 
        ? (formData.geminiModel || 'gemini-3.8-flash')
        : (formData.customAiModel || 'gpt-4o'),
    };

    onSave(updatedConfig);
    onClose();
  };

  const currentProvider = formData.provider === 'gemini' ? 'gemini' : 'custom_ai';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Configurazione Motore AI</h3>
              <p className="text-xs text-slate-500">Scegli tra Google Gemini (Sistema) o Custom AI (Standard OpenAI API)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Provider Selection Tabs (2 Clean Options) */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Provider Intelligenza Artificiale
            </label>

            <div className="grid grid-cols-2 gap-3">
              {/* 1. Google Gemini */}
              <button
                type="button"
                onClick={() => handleProviderChange('gemini')}
                className={`p-3.5 rounded-xl border text-left transition relative flex flex-col justify-between cursor-pointer ${
                  currentProvider === 'gemini'
                    ? 'bg-indigo-50/90 border-indigo-500 shadow-xs ring-2 ring-indigo-400/40'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">Google Gemini</span>
                  </div>
                  {currentProvider === 'gemini' && <Check className="w-4 h-4 text-indigo-600 font-bold" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Usa la <strong className="text-emerald-700">Chiave di Sistema</strong> (3.8 Flash, 3.7, 2.5 Flash, 3.1 Pro)
                </p>
                <span className="mt-2.5 inline-block text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-md w-fit">
                  ✓ Preconfigurato
                </span>
              </button>

              {/* 2. Custom AI (OpenAI API Standard) */}
              <button
                type="button"
                onClick={() => handleProviderChange('custom_ai')}
                className={`p-3.5 rounded-xl border text-left transition relative flex flex-col justify-between cursor-pointer ${
                  currentProvider === 'custom_ai'
                    ? 'bg-purple-50/90 border-purple-500 shadow-xs ring-2 ring-purple-400/40'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">Custom AI</span>
                  </div>
                  {currentProvider === 'custom_ai' && <Check className="w-4 h-4 text-purple-600 font-bold" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Standard <strong className="text-purple-700">OpenAI API</strong> (URL, Model, API Key)
                </p>
                <span className="mt-2.5 inline-block text-[10px] font-bold text-purple-800 bg-purple-50 border border-purple-300 px-2 py-0.5 rounded-md w-fit">
                  OpenAI Standard
                </span>
              </button>
            </div>
          </div>

          {/* TAB 1: GOOGLE GEMINI */}
          {currentProvider === 'gemini' && (
            <div className="space-y-4 p-4.5 bg-slate-50 border border-slate-200 rounded-xl animate-in fade-in">
              <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Chiave di sistema attiva con failover intelligente e Light Mode nativo.</span>
              </div>

              {/* Optional Custom Gemini Key */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-indigo-600" /> Chiave Personale Google Gemini API (Opzionale)
                  </label>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1 font-medium"
                  >
                    Ottieni chiave Gemini <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <input
                  type="password"
                  value={formData.geminiApiKey || ''}
                  onChange={(e) => setFormData({ ...formData, geminiApiKey: e.target.value })}
                  placeholder="AIzaSy... (Lascia vuoto per usare la chiave di sistema preconfigurata)"
                  className="w-full bg-white border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-mono"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Se inserita, userà la tua quota personale Google AI Studio invece della chiave di sistema.
                </p>
              </div>

              {/* Gemini Model Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Seleziona Modello Gemini
                </label>
                <div className="space-y-1.5">
                  {AVAILABLE_GEMINI_MODELS.map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition ${
                        (formData.geminiModel || formData.model) === m.id
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-950 font-semibold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="gemini_model"
                          value={m.id}
                          checked={(formData.geminiModel || formData.model) === m.id}
                          onChange={() => setFormData({ ...formData, geminiModel: m.id, model: m.id })}
                          className="text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <span className="text-xs">{m.name}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-bold">
                        {m.tag}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOM AI (OPENAI API STANDARD) */}
          {currentProvider === 'custom_ai' && (
            <div className="space-y-4 p-4.5 bg-purple-50/40 border border-purple-200/90 rounded-xl animate-in fade-in">
              <div className="flex items-start gap-2.5 text-xs text-purple-900 bg-purple-100/70 border border-purple-300/80 px-3.5 py-2.5 rounded-xl">
                <Cpu className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Motore Custom AI (Standard OpenAI API)</strong>
                  <span className="text-[11px] text-purple-800">
                    Configura qualsiasi endpoint compatibile con lo standard OpenAI (OpenAI, OpenRouter, Groq, DeepSeek, Together, Ollama locale, ecc.) inserendo URL, Modello e API Key personalizzata.
                  </span>
                </div>
              </div>

              {/* Fast Presets Pills */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  Preset Rapidi Endpoint:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {AVAILABLE_CUSTOM_AI_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className={`px-2.5 py-1 text-[11px] rounded-lg border transition font-medium flex items-center gap-1 cursor-pointer ${
                        (formData.customAiBaseUrl || formData.baseUrl) === preset.url
                          ? 'bg-purple-600 text-white border-purple-600 font-bold shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50/50'
                      }`}
                    >
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. Custom Base URL Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-purple-600" /> Endpoint URL Base (Standard OpenAI)
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">/chat/completions</span>
                </div>
                <input
                  type="text"
                  value={formData.customAiBaseUrl || formData.baseUrl || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    customAiBaseUrl: e.target.value,
                    baseUrl: e.target.value 
                  })}
                  placeholder="https://api.openai.com/v1"
                  className="w-full bg-white border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-mono shadow-xs"
                />
              </div>

              {/* 2. Custom Model Name (Text + Suggestions) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-purple-600" /> Nome Modello Custom
                  </label>
                  <span className="text-[10px] text-slate-500">Scrivi o seleziona un modello</span>
                </div>
                <input
                  type="text"
                  list="popular-models"
                  value={formData.customAiModel || formData.model || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    customAiModel: e.target.value,
                    model: e.target.value 
                  })}
                  placeholder="gpt-4o, o3-mini, deepseek-chat, llama-3.3-70b-versatile..."
                  className="w-full bg-white border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-mono shadow-xs"
                />
                <datalist id="popular-models">
                  {POPULAR_CUSTOM_AI_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </datalist>

                <div className="flex flex-wrap gap-1 mt-1.5">
                  {POPULAR_CUSTOM_AI_MODELS.slice(0, 6).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, customAiModel: m.id, model: m.id })}
                      className={`text-[10px] px-2 py-0.5 rounded border transition cursor-pointer ${
                        (formData.customAiModel || formData.model) === m.id
                          ? 'bg-purple-100 border-purple-400 text-purple-900 font-bold'
                          : 'bg-slate-100/80 border-slate-200 text-slate-600 hover:bg-slate-200/70'
                      }`}
                    >
                      {m.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Custom API Key Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-purple-600" /> Custom API Key / Bearer Token
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={formData.customAiApiKey || formData.apiKey || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      customAiApiKey: e.target.value,
                      apiKey: e.target.value 
                    })}
                    placeholder="sk-... oppure il tuo Bearer Token"
                    className="w-full bg-white border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none pr-16 font-mono shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2 py-1 text-[10px] text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200 rounded font-semibold cursor-pointer"
                  >
                    {showKey ? 'Nascondi' : 'Mostra'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  La chiave è salvata solo in locale nel tuo browser.
                </p>
              </div>
            </div>
          )}

          {/* Temperature / Creativity Slider */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-600" /> Precisione / Temperature
              </label>
              <span className="font-mono text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {formData.temperature}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={formData.temperature}
              onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0.0 (Massima coerenza geometrica XML)</span>
              <span>1.0 (Più discorsivo)</span>
            </div>
          </div>

          {/* Test connection alert */}
          {testResult && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                testResult.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-medium'
                  : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}
            >
              {testResult.success ? (
                <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 font-bold" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}
        </form>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/90 shrink-0">
          <button
            type="button"
            onClick={handleTest}
            disabled={isTesting}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 disabled:opacity-50 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            {isTesting ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
                <span>Verifica in corso...</span>
              </>
            ) : (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-slate-600" />
                <span>Testa Connessione</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition cursor-pointer"
            >
              Annulla
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              Salva Modifiche
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
