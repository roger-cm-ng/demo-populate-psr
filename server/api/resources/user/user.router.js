import express from 'express';
import passport from 'passport';
import userController from './user.controller';

const userRouter = express.Router();
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/me', passport.authenticate('jwt', { session: false }), userController.authenticate);

export default userRouter;
