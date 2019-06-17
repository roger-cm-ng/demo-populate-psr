import Joi from 'joi';
import Pic from './pic.model';

export default {
  async create(req, res) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().required(),
        url: Joi.string().required(),
        blurb: Joi.string().optional(),
        price: Joi.number().optional(),
        limit: Joi.number().integer().optional()
      });
      const { value, error } = Joi.validate(req.body, schema);
      if (error && error.details) {
        return res.status(400).json(error);
      }
      const pic = await Pic.create(value);
      return res.json(pic);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
};