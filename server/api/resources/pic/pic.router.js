import express from 'express';
import passport from 'passport';
import picController from './pic.controller';
import isAdmin from '../../middlewares/is-admin';

const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin];

const picRouter = express.Router();
picRouter
  .route('/')
  .post(adminPolicy, picController.create)
  .get(picController.findAll);

picRouter
  .route('/:id')
  .get(picController.findOne)
  .delete(adminPolicy, picController.delete)
  .put(adminPolicy, picController.update);

export default picRouter;
