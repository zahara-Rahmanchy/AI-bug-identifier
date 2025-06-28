import { Request, Response } from 'express';
import AppError from '../errors/AppError';
import { BugServices } from '../services/bugService';

const findBug = async (req: Request, res: Response) => {
  try {
    const { code, language } = req.body;
    console.log("lang: ",language,"\ncode: ",code)
   

    if (!code || !language) {
      throw new AppError(400, 'Both code and language fields are required.');
      
    }
    if (typeof code !== "string" || typeof language !== "string"){
      res.status(400).json({ error: 'Invalid type! Code and language should be string' });
      return;
    }
    const lineCount = code?.trim().split('\n').length;
      if (lineCount > 30) {
        res.status(400).json({
          error: `Code snippet exceeds ${30} lines. Please submit a shorter snippet.`,
        });
        return;
      }
    const result = await BugServices.findBugUsingllm(language,code);
    console.log("res: ",typeof result)
    res.status(201).json(result);
  } catch (error: any) {
    console.error(' Error:', error.message);
    res.status(500).json({ error: 'Failed to analyze code. Please try again.' });
  }
};

export const BugControllers={
    findBug,
    
}