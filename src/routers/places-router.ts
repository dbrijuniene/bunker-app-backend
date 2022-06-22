import { Router } from 'express';
import {
 add, get, remove, update,
} from '../controllers/places-controller';
import { authMiddleware, userMiddleware } from '../middlewares/auth-middlewares';

const placesRouter = Router();

placesRouter.use(authMiddleware, userMiddleware);

placesRouter.get('/', get);
placesRouter.post('/add', add);
placesRouter.patch('/update/:placeId', update);
placesRouter.delete('/delete/:placeId', remove);

export default placesRouter;
