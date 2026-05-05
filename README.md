# Nancy: AI Chatbot for the Active Pregnancy Foundation

An AI-powered chatbot that answers questions about physical activity before, during, and after pregnancy using APF's own knowledge base. Built with React, TypeScript, and Google Gemini. The entire pipeline runs client-side. No server is required at query time.

## Tech Stack

React 19 · TypeScript · Vite · Tailwind CSS · Google Gemini API · Supabase · `@xenova/transformers`


## Getting Started

### Prerequisites
- Node.js v18+, npm v9+
- Google Gemini API key
- Supabase project

### Install and Run

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build → dist/
npm run preview      # preview locally
```

## Environment Variables

Create a `.env` file in the project root. **Never commit this file.**

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_PASSWORD=your_supabase_database_password
```


## Ingest Pipeline

Run once before deployment, and again whenever source documents change.

```bash
npx tsx scripts/ingest.ts
# Output: src/constants/chunks.json
```

Processes all 39 APF PDFs: extracts text, falls back to OCR for image-based files, chunks, and embeds using `all-MiniLM-L6-v2`. 
Allow ~500MB for `node_modules` and model cache.

## Updating the Knowledge Base

1. Add or replace files in `data/pdfs/`
2. Register the source in `src/constants/sources.ts`
3. Run `npx tsx scripts/ingest.ts`
4. Rebuild: `npm run build`

## Deployment

Set all `VITE_` environment variables in Vercel project settings before deploying.

- Chatbot → `/`
- Admin dashboard → `/admin`


*Module: 55-708252 AI Research and Development Project | Jan–Apr 2026*
