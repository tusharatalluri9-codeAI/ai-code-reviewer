import axios from "axios";
import type { Language, ReviewPersona, CodeReview } from "../types";

// prettier-ignore
const API_KEY = 'YOUR_ANTHROPIC_KEY_HERE';
const API_URL = "https://api.anthropic.com/v1/messages";

const personaPrompts: Record<ReviewPersona, string> = {
  "senior-dev": `You are a senior software engineer with 10+ years of experience. 
    Review code for bugs, best practices, readability, and maintainability.`,
  "security-auditor": `You are a security expert specializing in application security.
    Review code for security vulnerabilities, injection risks, auth issues, and data exposure.`,
  "performance-engineer": `You are a performance engineering specialist.
    Review code for performance bottlenecks, memory leaks, inefficient algorithms, and optimization opportunities.`,
};

export async function reviewCode(
  code: string,
  language: Language,
  persona: ReviewPersona,
): Promise<CodeReview> {
  const prompt = `
    ${personaPrompts[persona]}
    
    Review this ${language} code and respond with ONLY a JSON object in this exact format:
    {
      "summary": "2-3 sentence overall assessment",
      "issues": [
        {
          "type": "bug|security|performance|style",
          "severity": "critical|warning|info",
          "line": 5,
          "message": "Description of the issue",
          "suggestion": "How to fix it"
        }
      ],
      "improvedCode": "the full improved version of the code"
    }
    
    Code to review:
    \`\`\`${language}
    ${code}
    \`\`\`
  `;

  const response = await axios.post(
    API_URL,
    {
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
        "anthropic-dangerous-direct-browser-access": "true",
      },
    },
  );

  const text = response.data.content[0].text;
  const clean = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);

  return {
    id: Date.now().toString(),
    code,
    language,
    persona,
    summary: parsed.summary,
    issues: parsed.issues,
    improvedCode: parsed.improvedCode,
    timestamp: new Date(),
    loading: false,
  };
}

export async function askFollowUp(
  question: string,
  code: string,
  review: CodeReview,
): Promise<string> {
  const prompt = `
    You are a code review assistant. The user has received a code review and has a follow up question.
    
    Original code:
    \`\`\`${review.language}
    ${code}
    \`\`\`
    
    Review summary: ${review.summary}
    
    User question: ${question}
    
    Answer concisely in 2-3 sentences.
  `;

  const response = await axios.post(
    API_URL,
    {
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
        "anthropic-dangerous-direct-browser-access": "true",
      },
    },
  );

  return response.data.content[0].text;
}
