import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth-middlewares';
import {
  login,
  authenticate,
  register,
} from '../controllers/auth-controller';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/authenticate', authMiddleware, authenticate);

export default authRouter;
