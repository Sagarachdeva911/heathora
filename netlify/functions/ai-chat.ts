import type { Config } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";
import { json } from "../lib/http.js";

const SYSTEM_INSTRUCTION =
  "You are Healthora's health and wellness assistant. " +
  "Provide clear, evidence-aware general health education. " +
  "Do not diagnose diseases, prescribe medicines, or claim " +
  "to replace a qualified healthcare professional. " +
  "For emergencies, advise contacting local emergency " +
  "services. Use simple, friendly language.";

// Uses Netlify AI Gateway credentials (injected automatically), or a user-provided GEMINI_API_KEY.
function createClient() {
  const env = process.env;
  if (env.GEMINI_API_KEY) {
    return new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY,
      httpOptions: env.GOOGLE_GEMINI_BASE_URL ? { baseUrl: env.GOOGLE_GEMINI_BASE_URL } : undefined,
    });
  }
  return new GoogleGenAI({
    apiKey: env.NETLIFY_AI_GATEWAY_KEY,
    httpOptions: { baseUrl: env.NETLIFY_AI_GATEWAY_BASE_URL?.replace(/\/$/, "") },
  });
}

interface HistoryItem {
  role: "user" | "model";
  text: string;
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return json({ success: false, message: "Method not allowed" }, 405);
  }

  const { message, history = [] } = await req.json().catch(() => ({}));

  if (typeof message !== "string" || !message.trim()) {
    return json({ success: false, message: "Please enter a message." }, 400);
  }
  if (message.length > 4000) {
    return json({ success: false, message: "Message must be 4000 characters or fewer." }, 400);
  }
  if (!Array.isArray(history) || history.length > 10) {
    return json({ success: false, message: "Chat history is invalid." }, 400);
  }

  const validHistory = history.every(
    (item: HistoryItem) =>
      item && ["user", "model"].includes(item.role) && typeof item.text === "string" && item.text.length <= 4000
  );
  if (!validHistory) {
    return json({ success: false, message: "Chat history contains invalid messages." }, 400);
  }

  try {
    const ai = createClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: [
        ...(history as HistoryItem[]).map((item) => ({ role: item.role, parts: [{ text: item.text }] })),
        { role: "user", parts: [{ text: message.trim() }] },
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
        maxOutputTokens: 800,
      },
    });

    const reply = response.text?.trim();
    if (!reply) throw new Error("The AI could not generate a response.");

    return json({ success: true, reply });
  } catch (error) {
    console.error("AI chat error:", (error as Error).message);
    return json({ success: false, message: "Healthora AI is temporarily unavailable. Please try again." }, 500);
  }
};

export const config: Config = {
  path: "/api/ai/chat",
};
