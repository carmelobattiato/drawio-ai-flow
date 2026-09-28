<div align="center">

# 🧠 DrawIO AI Flow Studio

**Turn documents and plain-language prompts into professional, editable draw.io diagrams — powered by AI.**

Upload a DOCX, PPTX, PDF or Excel file (or just describe what you need), and get a live-rendered diagram you can refine, restyle and export as `.drawio`, PNG or SVG.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini-API-8E75B2?logo=googlegemini&logoColor=white)

</div>

---

## ✨ Features

- **📄 Document-to-diagram** — extract content from **PDF, DOCX, PPTX, XLSX, XLS and CSV** files and turn it into a structured diagram.
- **💬 Prompt-to-diagram** — describe a flow, architecture or process in natural language and let the model build it.
- **⚡ Live rendering** — diagrams are rendered in real time as the model streams its answer.
- **✏️ Editable output** — every diagram is native draw.io XML: tweak it in the built-in **XML code editor** or open it later in [diagrams.net](https://app.diagrams.net).
- **🎨 Template gallery** — start from ready-made layouts and rich cloud/provider icon sets.
- **📤 Multi-format export** — download as **`.drawio`**, high-resolution **PNG** or standalone **SVG**.
- **🔌 Bring your own model** — use the built-in Gemini key or plug in any **OpenAI-compatible provider** (OpenAI, OpenRouter, Groq, DeepSeek, Together, Mistral, Ollama).

## 🧩 Tech Stack

| Layer     | Technology                                                            |
| --------- | -------------------------------------------------------------------- |
| Frontend  | React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Motion · Lucide    |
| Backend   | Node.js · Express 4 (run with `tsx`)                                 |
| AI        | `@google/genai` (Gemini) + any OpenAI-compatible endpoint            |
| Parsing   | `pdfjs-dist` (PDF) · `mammoth` (DOCX) · `jszip` (PPTX) · `xlsx` (Excel/CSV) |

## 🚀 Quick Start

**Prerequisites:** Node.js 18+ and a [Gemini API key](https://aistudio.google.com/app/apikey).

```bash
# 1. Install dependencies
npm install

# 2. Configure your environment
cp .env.example .env.local
# then edit .env.local and set GEMINI_API_KEY

# 3. Start the app (Express + Vite dev middleware)
npm run dev
```

The app is served on `http://localhost:3000` by default. Set the `PORT` environment variable to change it.

> 💡 You can also skip the `.env` file and paste a personal API key directly in the app's **Settings** panel.

## ⚙️ Configuration

Copy `.env.example` to `.env.local` and fill in:

| Variable         | Required | Description                                              |
| ---------------- | :------: | -------------------------------------------------------- |
| `GEMINI_API_KEY` |   Yes    | System-wide Google Gemini API key.                      |
| `APP_URL`        |    No    | Public URL where the app is hosted (self-referential links). |
| `PORT`           |    No    | Port the Express server listens on (default `3000`).    |

The default model is **`gemini-3.8-flash`**; you can switch models and providers at any time from the in-app model selector.

## 📜 Scripts

| Command           | Description                                       |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Start the server with Vite dev middleware (HMR).  |
| `npm run build`   | Build the production bundle into `dist/`.         |
| `npm start`       | Run the server (serves the built `dist/`).        |
| `npm run preview` | Preview the production build locally.             |
| `npm run lint`    | Type-check the project (`tsc --noEmit`).          |
| `npm run clean`   | Remove the `dist/` folder.                        |

## 🗂️ Project Structure

```
.
├── server.ts                 # Express server + AI proxy endpoints
├── index.html                # App entry point
├── src/
│   ├── App.tsx               # Root component & app state
│   ├── main.tsx              # React bootstrap
│   ├── components/           # UI: chat, uploader, viewer, editor, settings…
│   │   ├── ChatInterface.tsx
│   │   ├── DocumentUploader.tsx
│   │   ├── DrawioViewer.tsx
│   │   ├── XmlCodeEditor.tsx
│   │   ├── TemplateGallery.tsx
│   │   └── SettingsModal.tsx
│   └── services/             # Domain logic
│       ├── openai.ts         # AI providers, models & default config
│       ├── docParser.ts      # PDF/DOCX/PPTX/Excel/CSV extraction
│       ├── drawioParser.ts   # draw.io XML → graph model
│       ├── drawioExport.ts   # graph → SVG / PNG export
│       ├── drawioPrompt.ts   # system prompt for diagram generation
│       └── templates.ts      # diagram templates & icon catalogs
└── vite.config.ts
```

## 🔗 API Endpoints

The Express server exposes a thin proxy so API keys never reach the browser:

| Method | Endpoint                | Purpose                                   |
| ------ | ----------------------- | ----------------------------------------- |
| `POST` | `/api/gemini/generate`  | Generate a diagram with Gemini.           |
| `POST` | `/api/gemini/test`      | Validate a Gemini API key.                |
| `GET`  | `/api/gemini/status`    | Report availability and the default model.|
| `POST` | `/api/custom-ai/generate` | Generate via an OpenAI-compatible provider. |
| `POST` | `/api/custom-ai/test`   | Validate a custom provider connection.    |

## 🏗️ How It Works

1. **Input** — you upload a document or type a prompt in the chat.
2. **Extraction** — documents are parsed client-side into clean Markdown/text.
3. **Generation** — the content is sent through the server to the selected AI model, guided by a draw.io-specific system prompt.
4. **Rendering** — the returned XML is parsed into a graph and rendered live.
5. **Refine & export** — edit the XML, restyle, then export to `.drawio`, PNG or SVG.

## 📄 License

Released for internal/experimental use. Add your preferred license here.
