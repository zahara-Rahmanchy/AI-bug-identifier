import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import { BugServices } from '../services/bugService';

const findBug = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { code, language } = req.body;
    console.log("lang: ",language,"\ncode: ",code)
   

    if (!code || !language) {
      throw new AppError(400, 'Both code and language fields are required.');
    }

    if (typeof code !== "string" || typeof language !== "string"){
      throw new AppError(400, 'Invalid type! Code and language should be string'); 
    }
    const lineCount = code?.trim().split('\n').length;
      if (lineCount > 30) {
        throw new AppError(400, `Code snippet exceeds ${30} lines. Please submit a shorter snippet.`);
       
      }
    const result = await BugServices.findBugUsingllm(language,code);
    // console.log("res: ",typeof result)
    res.status(201).json(result);

  } catch (error: any) {
    console.error(' Error:', error.message);
    next(error)
    // res.status(500).json({ error: 'Failed to analyze code. Please try again.' });
  }
};

const bugSampleSnippets = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const language = req?.query?.language? req.query.language: "python";
    const mode = req?.query?.mode ? req?.query?.mode:  "developer-friendly";
   console.log("language controller: ",language,"\nmode controller: ",mode)
    const response = await BugServices.getSampleBugSnippets(language as string,mode as string);
    res.status(200).json(response);


  }

  catch (error: any) {
    console.error(' Error:', error.message);
    next(error);
   
  }
  

}
export const BugControllers={
    findBug,
    bugSampleSnippets
    
}