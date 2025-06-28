import express from 'express';
import { BugControllers} from '../controllers/bugController';

const router = express.Router();

// router.post('/', BugControllers.findBug);
router.post(
  '/find-bug',
  BugControllers.findBug
);

router.get(
  '/sample-cases',
  BugControllers.bugSampleSnippets
);

export const bugsRoutes = router;