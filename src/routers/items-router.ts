import { Router } from 'express';
import {
 add, get, remove, update,
} from '../controllers/items-controller';
import { authMiddleware, userMiddleware } from '../middlewares/auth-middlewares';

const itemsRouter = Router();

itemsRouter.use(authMiddleware, userMiddleware);

itemsRouter.post('/get', get);
itemsRouter.post('/add', add);
itemsRouter.patch('/update/:itemId', update);
itemsRouter.delete('/delete/:itemId', remove);

export default itemsRouter;
