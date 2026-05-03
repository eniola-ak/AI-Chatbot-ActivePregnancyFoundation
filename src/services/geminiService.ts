/// <reference types="vite/client" />
import { GoogleGenAI } from "@google/genai";
import { retrieveContext } from "./ragService";
import { shouldReferToGP, getGPReferralResponse } from '../constants/medicalDictionary';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
 
export type UserCategory =
  | 'preconception'
  | 'pregnant'
  | 'postnatal'
  | 'professional'
  | 'supporter'
  | 'other'
  | null;

const MODEL_CHAIN = [ 
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-2.5-flash-lite', 
  'gemma-3-27b-it',         
  'gemma-3-12b-it',     
  'gemma-3-4b-it', 
];

function buildSystemInstruction(
  userName: string,
  category: UserCategory
): string {
  const categoryContext: Record<NonNullable<UserCategory>, string> = {
    preconception:
      "This user is thinking of becoming pregnant. Focus on preconception physical activity guidance from the APF preconception resources (https://www.activepregnancyfoundation.org/preconception). Help them understand how staying active before pregnancy benefits both them and their future baby.",
    pregnant:
      "This user is currently pregnant. Focus on safe physical activity during pregnancy. The user has already completed the pregnancy pre-screening questions. Do not repeat the screening. Answer their specific questions using APF resources.",
    postnatal:
      "This user has recently had a baby. Focus on safe return to physical activity after childbirth. The user has already completed the postnatal pre-screening questions. Do not repeat the screening. Use APF postnatal resources and POGP guidance.",
    professional:
      "This user is a healthcare or fitness professional supporting someone who is pregnant or postnatal. They may ask clinical questions. Point them to the This Mum Moves educational programme (https://www.activepregnancyfoundation.org/thismummoves) where appropriate. Be more technically detailed in your answers.",
    supporter:
      "This user is a partner, parent, or friend supporting someone who is pregnant or postnatal. Help them understand how to encourage and support physical activity safely. Keep answers warm, practical, and non-clinical.",
    other:
      "This user has described a situation that doesn't fit the standard categories. Do your best with available APF resources. Be especially careful to stay within your knowledge base and recommend professional advice when in doubt.",
  };
 
  const contextLine = category
    ? categoryContext[category]
    : "The user's situation is not yet known. Answer general APF questions only.";
 
  return `
You are Nancy — a warm, friendly, and knowledgeable assistant from the Active Pregnancy Foundation (APF).
You support women and their families with safe, personalised guidance on physical activity before, during, and after pregnancy.
 
USER CONTEXT:
- Name: ${userName || 'the user'}
- Situation: ${contextLine}
 
YOUR PERSONALITY:
- Speak like a knowledgeable, supportive friend — warm, encouraging, and clear.
- Use the user's first name occasionally to keep things personal.
- Avoid cold or clinical language. Replace medical jargon with plain English where possible.
- Use gentle emoji occasionally (💛 ✨ 😊) but don't overdo it.
- Keep answers concise and scannable — use short paragraphs, not walls of text.
 
STRICT RULES:
1. ONLY answer using the CONTEXT provided below each question.
2. CRITICAL: If the context does not contain ANY information relevant to the question,
   you MUST respond with this sentence word-for-word as your ENTIRE response (do not add anything before or after it):
   "I don't have specific information on that in my database. Please consult your healthcare provider."
   Do NOT paraphrase it. Do NOT say "I don't have specific information about X" — use the exact phrase above.
   Do NOT use this fallback if the retrieved context mentions the topic at all.
3. Do NOT use any outside knowledge. Do NOT make things up.
4. Always recommend consulting a GP or midwife for personal medical decisions.
5. If a user reports a YES to any screening question, clearly advise them to speak to their GP or midwife before resuming physical activity.
6. Cite your source at the end of each answer in parentheses, e.g. (Source: APF General FAQs).
7. Never diagnose conditions or prescribe specific treatments.
8. NEVER use the word "No" as a direct response to a user's question. Instead of refusing or negating, offer a softer alternative. For example, use phrases like "That's not something I can help with directly, but...", "I'd suggest checking with your midwife or GP about that", or "It's best to approach that carefully. Here's what I can share...". Always redirect warmly rather than shutting the conversation down.
`.trim();
}
 
async function tryModel(
  ai: GoogleGenAI,
  model: string,
  contents: { role: string; parts: { text: string }[] }[],
  systemInstruction: string
): Promise<string> {
  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      systemInstruction,
      temperature: 0.2,
    },
  });
 
  const text = response.text;
  if (!text) throw new Error(`${model} returned empty response`);
  return text;
}

export async function explainMedicalTerm(
  term: string,
  definition: string,
  source: string,
  userName: string = ''
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });
 
  const prompt = `The user selected "Not sure" when asked about "${term}" in a pregnancy health screening.
 
Definition from ${source}: "${definition}"
 
Please explain what "${term}" means in 1-2 warm, friendly sentences using ONLY this definition.
Use plain English — like a knowledgeable friend explaining something.
${userName ? `Address the user as ${userName}.` : ''}
Do NOT add medical advice. Do NOT suggest treatments. Keep it under 3 sentences total.
At the end of your explanation, always add: (Source: ${source})`;
 
  const systemInstruction = `You are Nancy, a warm friendly assistant from the Active Pregnancy Foundation.
Explain medical terms in plain English using only the definition provided. Keep responses short and warm.`;
 
  const contents = [{ role: 'user', parts: [{ text: prompt }] }];
 
  for (const model of MODEL_CHAIN) {
    try {
      return await tryModel(ai, model, contents, systemInstruction);
    } catch {
    }
  }
 
  return `No worries! **${term}** means: ${definition} _(Source: ${source})_`;
}

export const getGeminiResponse = async (
  history: ChatMessage[],
  userName: string = '',
  category: UserCategory = null
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });
 
  const lastUserMessage = [...history].reverse().find(m => m.role === 'user');
  if (!lastUserMessage) return "Please ask a question.";
  if (shouldReferToGP(lastUserMessage.text)) {
  return getGPReferralResponse(lastUserMessage.text)!;}
 
  const contexts = await retrieveContext(lastUserMessage.text, 8);
  console.log('Retrieved contexts:', contexts.map(c => ({ score: c.score, label: c.sourceLabel, preview: c.text.slice(0, 80) })));
 
  const contextBlock = contexts.length > 0
    ? contexts.map((c, i) => `[${i + 1}] (${c.sourceLabel})\n${c.text}`).join('\n\n')
    : 'No relevant context found in the APF database.';
 
  const augmentedHistory = history.map((m, idx) => {
    if (idx === history.length - 1 && m.role === 'user') {
      return {
        ...m,
        text: `CONTEXT FROM APF DATABASE:\n${contextBlock}\n\nUSER QUESTION: ${m.text}`,
      };
    }
    return m;
  });
 
  const contents = augmentedHistory.map(m => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));
 
  const systemInstruction = buildSystemInstruction(userName, category);

  const errors: string[] = [];
 
  for (const model of MODEL_CHAIN) {
    try {
      console.log(`Trying model: ${model}`);
      const text = await tryModel(ai, model, contents, systemInstruction);
      if (model !== MODEL_CHAIN[0]) {
        console.warn(`Fell back to model: ${model}`);
      }
      return text;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push(`${model}: ${message}`);
      console.warn(`Model ${model} failed — ${message}`);
    }
  }
 
  console.error('All models failed:\n' + errors.join('\n'));
  return "I'm having trouble connecting right now. Please try again in a moment, or contact the APF team directly if the problem persists.";
};