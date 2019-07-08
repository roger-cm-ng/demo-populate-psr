import express from 'express';
import picRouter from './resources/pic/pic.router';
import userRouter from './resources/user/user.router';

const restRouter = express.Router();
restRouter.use('/pics', picRouter);
restRouter.use('/users', userRouter);

export default restRouter;
