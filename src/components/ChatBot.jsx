import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, RotateCcw, Bot, Sparkles } from 'lucide-react';
import { useChat } from '../hooks/useChat';

const QUICK_QUESTIONS = [
  '¿Qué es el OIA y cómo lo designo?',
  '¿Cuáles son los plazos más urgentes?',
  '¿Qué es el Catálogo IA Perú?',
  '¿Necesito un Plan de Gobierno de Datos previo?',
  '¿Qué es la NTP-ISO/IEC 42001?',
  '¿Qué pasa si no cumplo con la ENIA?',
];

function renderMarkdown(text) {
  // Simple markdown: bold, line breaks
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

export default function ChatBot({ entityContext, isOpen, onToggle }) {
  const { messages, isLoading, sendMessage, clearChat } = useChat(entityContext);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  const handleQuick = (q) => {
    sendMessage(q);
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={onToggle}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-slate-700 rotate-90'
            : 'enia-gradient hover:scale-110'
        }`}
        aria-label="Abrir asistente IA"
      >
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <div className="relative">
            <Bot size={24} className="text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm animate-slide-up">
          <div className="glass-dark rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
               style={{ height: '520px' }}>
            
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3"
                 style={{ background: 'linear-gradient(135deg, rgba(217,16,35,0.2), rgba(240,165,0,0.15))' }}>
              <div className="w-9 h-9 rounded-xl enia-gradient flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm font-display">ENIA-Bot</span>
                  <Sparkles size={12} className="text-yellow-400" />
                </div>
                <div className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Asistente activo
                </div>
              </div>
              <button
                onClick={clearChat}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                title="Limpiar chat"
              >
                <RotateCcw size={13} className="text-slate-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full enia-gradient flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                      <Bot size={12} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-3 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user' ? 'chat-bubble-user text-white' : 'chat-bubble-ai text-slate-100'
                    }`}
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                  />
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full enia-gradient flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="chat-bubble-ai px-4 py-3 flex items-center gap-1.5">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions (show only if few messages) */}
            {messages.length <= 2 && (
              <div className="px-3 pb-2">
                <p className="text-xs text-slate-500 mb-1.5">💡 Preguntas frecuentes:</p>
                <div className="flex flex-wrap gap-1">
                  {QUICK_QUESTIONS.slice(0, 3).map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuick(q)}
                      className="text-xs px-2 py-1 rounded-lg bg-white/5 hover:bg-yellow-400/10 hover:text-yellow-400 text-slate-400 transition-colors border border-white/5"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-white/10">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pregunta sobre la ENIA..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-yellow-400/50 focus:bg-white/8 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-9 h-9 rounded-xl enia-gradient flex items-center justify-center disabled:opacity-40 transition-opacity hover:opacity-90 flex-shrink-0"
                >
                  <Send size={15} className="text-white" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
