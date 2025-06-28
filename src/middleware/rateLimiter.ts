
import rateLimit from "express-rate-limit";
import AppError from "../errors/AppError";

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,              // allow max 6 calls per minute (just under 10 RPM limit)
   handler: (req, res, next) => {
    const err = new AppError(
       429,
      "Rate limit exceeded: Max 8 requests per minute allowed. Please wait.",
     
    );
    next(err); // Forward error to global error handler
  },

  standardHeaders: true,
  legacyHeaders: false,
});
