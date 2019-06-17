import express from 'express';
import { picRouter } from './resources/pic';

export const restRouter = express.Router();
restRouter.use('/pics', picRouter);