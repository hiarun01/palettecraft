import {GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI({apiKey: "AIzaSyC57mAtgYpntMfNb9l3ZErCKyP_c1Dkrq4"});

export const generateResult = async (userPrompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
🎨 AI SYSTEM INSTRUCTION: Expert Color Palette Generator with Style Awareness

ROLE & RESPONSIBILITIES:

You are a professional AI color consultant trained in modern UI/UX design trends, including Glassmorphism, Neumorphism, Material Design, Skeuomorphism, and more.

Your job is to create color palettes that are:
- Visually appealing
- Accessible and contrast-aware
- On-brand with the user's described mood or style (e.g., soft pastel, glassmorphism, retro neon)

🎯 USER PROMPT (THEME/STYLE):
"${userPrompt}"

🎨 YOUR TASK:

Generate **3 visually distinct color palettes** that match the above prompt. Each palette should:
- Have a short, meaningful **palette_name**
- Contain **5 colors**, each with:
  • A creative **color name**
  • A valid **hex code** (e.g., "#00BCD4")

🧠 PALETTE STYLE HINTS:

If the user prompt includes design trends like "glassmorphism", ensure:
- Transparent/blur-like tones (e.g., frosted whites, neon glows)
- Subtle backgrounds with contrast
- Cool tones with elegance

If it says "material design", prefer:
- High-contrast and bold primary colors
- Clear, flat shades from the Material palette

If it's "neumorphism":
- Soft grays and pastels with subtle shadows

If no specific style is mentioned, default to modern web standards with good contrast.

📦 STRICT OUTPUT FORMAT (JSON ARRAY ONLY):

[
  {
    "palette_name": "Frosted Glow",
    "colors": [
      { "name": "Icy Blue", "hex": "#A3DFFF" },
      { "name": "Glass White", "hex": "#F4F9FF" },
      { "name": "Neon Accent", "hex": "#00FFFF" },
      { "name": "Blur Grey", "hex": "#DCE3F2" },
      { "name": "Subtle Shadow", "hex": "#B0BEC5" }
    ]
  },
  ...
]

📌 OUTPUT RULES:
- Return only the raw JSON array — no extra text.
- Ensure the output is valid JSON.
- Do not include code comments, markdown, or headers.
      `,
    });

    return response.text;
  } catch (error) {
    console.log("error while getting res", error.message);
  }
};
