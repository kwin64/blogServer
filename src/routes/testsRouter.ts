import { Router } from 'express';
import testsController from '../controllers/testsController';

const testsRouter = Router({});
testsRouter.delete('/all-data', testsController.resetDB);

export default testsRouter;
