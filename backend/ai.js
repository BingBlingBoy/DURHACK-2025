import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function extractHingeInfo(images) {
  const contents = [
    ...images.map((i) => ({
      inlineData: i,
    })),
    {
      text: "Extract the demographic information of this profile including: age, gender, height, location, whether they drink, job, and education. Return this data in JSON format.",
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite-preview-09-2025",
    contents,
  });
  console.log(response);

  return response;
}
