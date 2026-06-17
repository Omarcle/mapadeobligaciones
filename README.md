# 🗺️ Mapa de Obligaciones ENIA

**Aplicación web interactiva** para que entidades públicas peruanas conozcan sus obligaciones según la **Estrategia Nacional de Inteligencia Artificial 2026-2030** (RM N° 152-2026-PCM).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TU_USUARIO/enia-mapa-obligaciones&env=ANTHROPIC_API_KEY&envDescription=Tu%20API%20key%20de%20Anthropic%20Claude&envLink=https://console.anthropic.com/)

---

## ✨ Características

- 🏛️ **6 tipos de entidad pública** peruana con obligaciones diferenciadas
- 📋 **Obligaciones detalladas** con plazos, responsables y normativa de referencia  
- 🗓️ **Cronograma visual** de hitos clave de la ENIA
- 🎯 **4 ejes estratégicos** explicados de forma clara
- 🤖 **ENIA-Bot** — chatbot con IA (Claude API) para resolver dudas en tiempo real
- 🌙 Diseño dark moderno con identidad visual inspirada en la bandera peruana
- 📱 Responsive — funciona en móvil y desktop

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite |
| Estilos | Tailwind CSS |
| IA / Chat | Claude API (Anthropic) via Vercel Edge Functions |
| Deploy | Vercel |
| Runtime serverless | Vercel Edge Runtime |

---

## 🚀 Despliegue en Vercel

### Prerequisitos
- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [Anthropic](https://console.anthropic.com) con API key
- Node.js 18+

### Paso 1: Subir a GitHub

```bash
git init
git add .
git commit -m "feat: Mapa de Obligaciones ENIA inicial"
git remote add origin https://github.com/TU_USUARIO/enia-mapa-obligaciones.git
git push -u origin main
```

### Paso 2: Importar en Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa tu repositorio de GitHub
3. Vercel detectará automáticamente que es un proyecto Vite

### Paso 3: Configurar variable de entorno

En el dashboard de Vercel, ve a tu proyecto → **Settings** → **Environment Variables**:

```
ANTHROPIC_API_KEY = sk-ant-api03-...tu-key-aqui...
```

⚠️ **Importante:** Agrega esta variable en los entornos **Production**, **Preview** y **Development**.

### Paso 4: Deploy

Haz clic en **Deploy** y Vercel construirá y desplegará automáticamente.

---

## 💻 Desarrollo local

```bash
# Instalar dependencias
npm install

# Crear archivo de variables de entorno local
echo "ANTHROPIC_API_KEY=sk-ant-api03-..." > .env.local

# Iniciar servidor de desarrollo con Vercel CLI (para serverless functions)
npm install -g vercel
vercel dev

# O solo el frontend (sin chat IA)
npm run dev
```

> **Nota:** Para que el chat con IA funcione en local, necesitas `vercel dev` (no `npm run dev`) para que las Edge Functions estén disponibles.

---

## 📁 Estructura del proyecto

```
enia-mapa-obligaciones/
├── api/
│   └── chat.js              # Edge Function → Claude API
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── StarField.jsx    # Fondo animado de estrellas
│   │   ├── EntitySelector.jsx
│   │   ├── ObligacionCard.jsx
│   │   ├── EjesEstrategicos.jsx
│   │   ├── Timeline.jsx
│   │   └── ChatBot.jsx      # Interfaz del chat IA
│   ├── data/
│   │   └── obligaciones.js  # Datos ENIA por tipo de entidad
│   ├── hooks/
│   │   └── useChat.js       # Hook para gestión del chat
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

---

## 🔧 Cómo funciona el chat IA

```
Usuario hace pregunta
        ↓
ChatBot.jsx (React)
        ↓
POST /api/chat (Edge Function en Vercel)
        ↓
Claude API (claude-sonnet-4-6)
  System prompt: experto en ENIA 2026-2030
  Contexto: tipo de entidad del usuario
        ↓
Respuesta formateada al usuario
```

La Edge Function **nunca expone** la API key al cliente — la lee desde las variables de entorno de Vercel.

---

## 📖 Fuentes normativas

- [RM N° 152-2026-PCM — Texto ENIA](https://cdn.www.gob.pe/uploads/document/file/9902385/8081563-anexo-rm-n-152-2026-pcm-enia%282%29.pdf)
- [El Peruano — Publicación oficial](https://www.elperuano.pe)
- [SGTD-PCM — Ente rector](https://www.gob.pe/pcm)

---

## ⚠️ Aviso legal

Esta aplicación es una herramienta de orientación educativa basada en fuentes públicas oficiales. **No constituye asesoría legal**. Para interpretaciones normativas vinculantes, consulta con asesores jurídicos especializados o con la SGTD-PCM.

---

## 🤝 Contribuciones

¿Encontraste un error en los datos o quieres agregar más información? Abre un issue o pull request.

---

*Desarrollado con ❤️ para impulsar el cumplimiento de la ENIA en el Perú 🇵🇪*
