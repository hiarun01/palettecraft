import {GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI({apiKey: "AIzaSyC57mAtgYpntMfNb9l3ZErCKyP_c1Dkrq4"});

export const generateResult = async (userPrompt) => {
  const content = `
You are a professional color palette generator AI. Based on the given user prompt, generate 10 visually distinct color palettes that match the theme/mood.
The response should include:
- A suitable palette name
- A list of 10 visually distinct colors
- Each color should have a name and a hex code

Format your response as a JSON array like this:
[
  {
    "palette_name": "Name",
    "colors": [
      { "name": "Color 1", "hex": "#XXXXXX" },
      { "name": "Color 2", "hex": "#XXXXXX" },
      { "name": "Color 3", "hex": "#XXXXXX" },
      { "name": "Color 4", "hex": "#XXXXXX" },
      { "name": "Color 5", "hex": "#XXXXXX" },
      { "name": "Color 6", "hex": "#XXXXXX" },
      { "name": "Color 7", "hex": "#XXXXXX" },
      { "name": "Color 8", "hex": "#XXXXXX" },
      { "name": "Color 9", "hex": "#XXXXXX" },
    ]
  }
]

User Prompt: ${userPrompt}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{role: "user", parts: [{text: content}]}],
    });

    return response.text;
  } catch (error) {
    console.log("error while getting res", error.message);
    return null;
  }
};
