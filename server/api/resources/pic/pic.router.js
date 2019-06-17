import express from 'express';
import picController from './pic.controller';

export const picRouter = express.Router();
picRouter
  .route('/')
  .post(picController.create)
  .get(picController.findAll);

picRouter
  .route('/:id')
  .get(picController.findOne)
  .delete(picController.delete)
  .put(picController.update);

