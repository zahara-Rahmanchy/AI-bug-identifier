import express from 'express';
import { BugControllers} from '../controllers/bugController';
import { rateLimiter } from '../middleware/rateLimiter';

const router = express.Router();


router.post(
  '/find-bug',
  rateLimiter,
  BugControllers.findBug
);

router.get(
  '/sample-cases',
  rateLimiter,
  BugControllers.bugSampleSnippets
);

export const bugsRoutes = router;