import { GoogleGenAI } from "@google/genai";
export interface IInput  {
  language:string,
  code:string
}
const ai = new GoogleGenAI({apiKey:"AIzaSyBizPigzI0E6sB8-xKTibGIO4u1M_E0cG4"});

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

