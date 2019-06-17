import express from 'express';
import picController from './pic.controller';

export const picRouter = express.Router();
picRouter.route('/').post(picController.create);