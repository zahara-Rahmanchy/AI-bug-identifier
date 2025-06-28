import { Language } from "@google/genai";
import AppError from "../errors/AppError";
import { analyzeCodeWithGemini } from "../llms/geminiAI";

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

const getSampleBugSnippets = async(language:string,mode:string){
    
}




export const BugServices = {
    findBugUsingllm
}