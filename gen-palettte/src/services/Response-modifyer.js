export function ResponseModify(aiOutput) {
  const match = aiOutput.match(/```json\s*([\s\S]*?)\s*```/);
  let jsonString = match && match[1] ? match[1] : aiOutput.trim();

  try {
    return JSON.parse(jsonString);
  } catch (err) {
    throw new Error(err, "Invalid JSON format from AI response");
  }
}
