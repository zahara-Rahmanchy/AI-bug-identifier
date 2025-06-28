/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import AppError from './AppError';
type ErrorResponse = {
  success: boolean;
  name: string;
  errorMessage: string;
  errorDetails: any;
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // console.log(err.name, err.isJoi);
  let statusCode = 500;
  const errorResponse: ErrorResponse = {
    success: false,
    name:'',
    errorMessage: err.message,
    errorDetails: err,
  };

  if (err instanceof AppError) {
    errorResponse.name = err.name;
    statusCode = err.statusCode;
    errorResponse.errorMessage = err.message;
    errorResponse.errorDetails = err;
  } 
   res.status(statusCode).json({
    // success: false,
    ...errorResponse,
    stack: err.stack,
  });
};
export default globalErrorHandler;
