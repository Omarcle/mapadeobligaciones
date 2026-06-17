import { useState, useCallback } from 'react';

export function useChat(entityContext) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `¡Hola! Soy **ENIA-Bot** 🤖🇵🇪\n\nEstoy aquí para ayudarte a entender las obligaciones de tu entidad según la **Estrategia Nacional de IA 2026-2030** (RM N° 152-2026-PCM).\n\n${entityContext ? `Veo que eres **${entityContext.label}** — ¡puedo orientarte específicamente sobre tus obligaciones! 🎯` : 'Selecciona tu tipo de entidad arriba para consultas más precisas.'}\n\n¿Sobre qué obligación quieres aprender más? 💡`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(
    async (content) => {
      if (!content.trim() || isLoading) return;

      const userMessage = { role: 'user', content };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setIsLoading(true);
      setError(null);

      try {
        // Filter out the initial assistant message for the API call
        const apiMessages = newMessages.filter((m, i) => !(i === 0 && m.role === 'assistant'));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: apiMessages,
            entityContext: entityContext
              ? { label: entityContext.label, nivel: entityContext.nivel }
              : null,
          }),
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }

        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.response },
        ]);
      } catch (err) {
        setError('No pude conectarme con el asistente. Verifica tu conexión e intenta de nuevo.');
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: '⚠️ Tuve un problema técnico. Por favor intenta de nuevo en un momento.',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, entityContext]
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        role: 'assistant',
        content: `¡Chat reiniciado! Soy **ENIA-Bot** 🤖 — listo para responder tus preguntas sobre la ENIA 2026-2030. ¿Qué necesitas saber? 💡`,
      },
    ]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearChat };
}
