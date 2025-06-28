import { Language } from "@google/genai";
import AppError from "../errors/AppError";
import { analyzeCodeWithGemini } from "../llms/geminiAI";
// interface PromptOptions {
//   mode?: "casual" | "developer-friendly";
//   language?: string;
// }

const findBugUsingllm = async (language:string,code:string)=>{
    const systemInstructionprompt=`
    You are an expert AI code auditor specialized in detecting software bugs.

    Your goal is to:
    - Analyze small code snippets written in ${language} programming languages.
    - Identify the **most accurate and meaningful** bug type or category based on the context of the code.
    - Use precise, natural bug type labels that a senior developer would recognize.(logical, runtime, syntax,off-by-one etc.).
    - Avoid vague classifications like "error" or "problem". 
    - Use natural but precise labels that reflect how and when the bug causes failure.
    - If there are multiple bugs, then give the bug_type which most accurately describes it.
    - Provide a concise and professional explanation of the issue.
    - Suggest a fix or improvement, if appropriate.

    Always return your output in **strictly valid JSON** format:
    {
      "language":
      "bug_type": "<Write the type that most accurately describes the bug in the given code>",
      "description": "<Brief explanation of the bug and why it occurs>",
      "suggestion": "<Optional. Fix or guidance to resolve the issue>"
    }

    -Do not explain the JSON. Do not add commentary. 
    - Only return the JSON object.
    -Be concise, correct, and consistent.
    -Do NOT wrap in Markdown or add any extra commentary.
    `.trim();
    const contentPrompt= `
     Analyze the ${language} code snippet and you must identify the most precise and critical bug
     return a structured bug report in JSON.

    Code:
    \`\`\`${language}
    ${code}
    \`\`\`
    `
    const response = await analyzeCodeWithGemini(systemInstructionprompt,contentPrompt)
    let raw = response?.trim();
    
    raw = raw?.replace(/```json|```/g, "").trim();

    let parsed;
    parsed = JSON.parse(raw as string);
    
    return parsed
}

const getSampleBugSnippets = async(language:string,mode:string)=>{
    console.log("lan: ",language,"mode: ",mode)
    const toneInstruction = mode === "casual" ? `Use a friendly, beginner-oriented tone — 
        as if you're helping a new programmer understand the bug clearly without 
        sounding too technical or intimidating.Avoid jargon and write explanations in a helpful 
        and conversational way.`

      : `Use a professional, developer-friendly tone — concise, technically accurate, and 
        suitable for someone with programming experience.
        Avoid unnecessary elaboration. Be clean and precise in your wording.`;


    const systemPrompt = `You are an AI assistant that generates buggy code examples for learning 
                      and debugging purposes.
            
            ${toneInstruction}
            For each snippet:
            - The code snippet must be in ${language} programming language
            - Include the buggy code (short, 1–5 lines)
            - Describe the type of bug and why it happens in detail
           
        
            Respond with a JSON array of 3 to 5 examples.

            Each item should follow:
            {
            
            "code": "<buggy snippet>",
            "bug_type": "<precise bug type>",
            "description": "<explanation>",
            }

            Do not wrap your response in Markdown or add any extra commentary.
            `.trim();

    const userContent = `Generate 3 to 5 buggy code snippets with their bug analysis in the 
    specified JSON format.The code should be in the ${language}`;

    
    const response = await analyzeCodeWithGemini(systemPrompt,userContent)

    let raw = response?.trim();
    
    raw = raw?.replace(/```json|```/g, "").trim();

    let parsed;
    parsed = JSON.parse(raw as string);
    
    return parsed
    
}




export const BugServices = {
    findBugUsingllm,
    getSampleBugSnippets
}