
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is available
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Using a mock service.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const generateMockResponse = (text: string) => {
    return new Promise(resolve => setTimeout(() => resolve(text), 500));
}

export const generateAreaNotification = async (areaName: string): Promise<string> => {
  const prompt = `Generate a concise and friendly public notification for residents of ${areaName}. Announce that the CleanReach garbage collection truck has entered their area and is starting its rounds. Keep it under 25 words.`;
  
  if (!ai) {
    return generateMockResponse(`CleanReach Alert: Our truck is now in ${areaName} for garbage collection. Please bring out your bins!`) as Promise<string>;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating area notification:", error);
    return `Error: Could not generate notification for ${areaName}.`;
  }
};

export const generateClientNotification = async (clientName: string, areaName: string): Promise<string> => {
  const prompt = `Generate a concise, friendly, and personalized notification for a resident named ${clientName} in the ${areaName} area. Inform them that the CleanReach garbage collection truck is nearby and will be at their location shortly. Keep it under 30 words.`;

  if (!ai) {
    return generateMockResponse(`Hi ${clientName}, the CleanReach collection truck is in ${areaName} and will be at your address soon!`) as Promise<string>;
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating client notification:", error);
    return `Error: Could not generate notification for ${clientName}.`;
  }
};
