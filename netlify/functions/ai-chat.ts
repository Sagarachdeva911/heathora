import type { Config } from "@netlify/functions";

// Gemini is served through Netlify AI Gateway, which injects
// GEMINI_API_KEY and GOOGLE_GEMINI_BASE_URL at runtime.
const MODEL = "gemini-3.1-flash-lite";

const SYSTEM_PROMPT =
  "You are Healthora's health and wellness assistant. " +
  "Provide clear, evidence-aware general health education. " +
  "Do not diagnose diseases, prescribe medicines, or claim " +
  "to replace a qualified healthcare professional. " +
  "For emergencies, advise contacting local emergency " +
  "services. Use simple, friendly language.";

interface HistoryItem {
  role: "user" | "model";
  text: string;
}

function badRequest(message: string) {
  return Response.json({ success: false, message }, { status: 400 });
}

async function generateHealthResponse(message: string, history: HistoryItem[]) {
  const apiKey = process.env.GEMINI_API_KEY;
  const baseUrl = (
    process.env.GOOGLE_GEMINI_BASE_URL ||
    "https://generativelanguage.googleapis.com"
  ).replace(/\/$/, "");

  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured.");

  const contents = [
    ...history.slice(-10).map((item) => ({
      role: item.role,
      parts: [{ text: item.text }],
    })),
    { role: "user", parts: [{ text: message.trim() }] },
  ];

  let response: Response | undefined;

  // Retry temporary server and rate-limit errors up to 3 attempts.
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      response = await fetch(`${baseUrl}/v1beta/models/${MODEL}:generateContent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.4, maxOutputTokens: 800 },
        }),
      });
    } catch (error) {
      console.error("Gemini network error:", (error as Error).message);
      if (attempt === 2) throw new Error("Could not connect to the Gemini API.");
      await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
      continue;
    }

    if (response.status !== 429 && response.status < 500) break;

    if (attempt < 2) {
      await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
    }
  }

  if (!response || !response.ok) {
    const errorData = response ? await response.json().catch(() => ({})) : {};
    console.error(
      "Gemini API error:",
      response?.status || "Network error",
      errorData.error?.message || "Unknown error"
    );
    throw new Error("The AI service is temporarily unavailable.");
  }

  const data = await response.json();
  const answer = data.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text || "")
    .join("")
    .trim();

  if (!answer) throw new Error("The AI could not generate a response.");

  return answer;
}

export default async (req: Request) => {
  const { message, history = [] } = await req.json().catch(() => ({}));

  if (typeof message !== "string" || !message.trim()) {
    return badRequest("Please enter a message.");
  }
  if (message.length > 4000) {
    return badRequest("Message must be 4000 characters or fewer.");
  }
  if (!Array.isArray(history) || history.length > 10) {
    return badRequest("Chat history is invalid.");
  }

  const validHistory = history.every(
    (item) =>
      item &&
      ["user", "model"].includes(item.role) &&
      typeof item.text === "string" &&
      item.text.length <= 4000
  );
  if (!validHistory) {
    return badRequest("Chat history contains invalid messages.");
  }

  try {
    const reply = await generateHealthResponse(message, history);
    return Response.json({ success: true, reply });
  } catch (error) {
    console.error("AI chat error:", (error as Error).message);
    return Response.json(
      {
        success: false,
        message: "Healthora AI is temporarily unavailable. Please try again.",
      },
      { status: 500 }
    );
  }
};

export const config: Config = {
  path: "/api/ai/chat",
  method: "POST",
};
