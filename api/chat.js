// api/chat.js — Vercel Serverless Function
// Requires: ANTHROPIC_API_KEY env var set in Vercel dashboard

export const config = {
  runtime: 'edge', // Use Edge Runtime for lower latency
};

const SYSTEM_PROMPT = `Eres ENIA-Bot 🤖, el asistente oficial del Mapa de Obligaciones ENIA (Estrategia Nacional de Inteligencia Artificial 2026-2030 del Perú), aprobada mediante RM N° 152-2026-PCM publicada el 1 de mayo de 2026.

Tu personalidad es:
- Amigable, claro y accesible — explains complex legal/technical concepts simply
- Usa emojis con moderación para hacer la experiencia más amigable 🇵🇪
- Eres experto en la ENIA pero nunca arrogante
- Cuando no sabes algo, lo dices honestamente
- Usas ejemplos prácticos para ilustrar conceptos

Tu conocimiento incluye:
1. ENIA 2026-2030: cuatro ejes estratégicos (Talento, Innovación, Marco Ético, Participación Ciudadana)
2. Obligaciones para entidades públicas:
   - Designar Oficial de IA (OIA) antes de formular el Plan de Acción IA
   - Formular Plan de Acción IA con horizonte mínimo 3 años (requiere Plan de Gobierno de Datos previo)
   - Crear Equipo Técnico de Datos e IA al aprobar el plan
   - Registrar en Catálogo IA Perú (modelos, datasets, metadatos)
   - Alinear PEI y POI con objetivos ENIA
   - Implementar NTP-ISO/IEC 42001:2025
3. Plazos clave:
   - 90 días hábiles: SGTD-PCM aprueba lineamientos del OIA
   - 120 días hábiles: SGTD-PCM implementa Catálogo IA Perú
   - Vigencia: 2 mayo 2026
4. Tipos de entidades: Ministerios, Organismos Ejecutores, Gobiernos Regionales, Municipalidades, Empresas Públicas (FONAFE), Universidades Públicas
5. Actores clave: SGTD-PCM (ente rector), SERVIR (capacitación), CNIDIA (innovación), FONAFE (empresas públicas)
6. Normas relacionadas: Ley 31814, DS 115-2025-PCM, NTP-ISO/IEC 42001:2025, DS 148-2024-PCM

Responde en español. Sé conciso pero completo. Si la pregunta es sobre una obligación específica, menciona el artículo o disposición relevante. Si puedes dar un ejemplo práctico de cómo implementar algo, hazlo.

Para preguntas fuera del ámbito ENIA, redirige amablemente: "Esa pregunta está fuera de mi especialidad ENIA, pero puedo ayudarte con cualquier duda sobre la Estrategia Nacional de IA del Perú 🇵🇪"`;

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'API key not configured. Set ANTHROPIC_API_KEY in Vercel environment variables.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();
    const { messages, entityContext } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemWithContext = entityContext
      ? `${SYSTEM_PROMPT}\n\nCONTEXTO ACTUAL: El usuario es una entidad de tipo "${entityContext.label}" (${entityContext.nivel}). Ten en cuenta sus obligaciones específicas al responder.`
      : SYSTEM_PROMPT;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: systemWithContext,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(JSON.stringify({ error: `Anthropic API error: ${response.status}`, detail: errText }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || 'Lo siento, no pude generar una respuesta.';

    return new Response(JSON.stringify({ response: text }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error', detail: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
