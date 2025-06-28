import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
export interface IInput  {
  language:string,
  code:string
}
dotenv.config()
const key = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({apiKey:key});

export const analyzeCodeWithGemini=async (systemPrompt:string,contentPrompt:string)=> {

  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:contentPrompt,
     config: {
      systemInstruction: systemPrompt
    },
  });
  console.log(response.text);
  // return response.text;
    

return response.text;

}

