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
  async findAll(req, res) {
    try {
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
      };
      const pics = await Pic.paginate({}, options);
      return res.json(pics);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  async findOne(req, res) {
    try {
      const { id } = req.params;
      const pic = await Pic.findById(id);
      if (!pic) {
        return res.status(404).json({err: 'Could not find pic'});
      }
      return res.json(pic);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const pic = await Pic.findOneAndRemove({_id: id});
      if (!pic) {
        return res.status(404).json({err: 'Could not find pic'});
      }
      return res.json(pic);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const schema = Joi.object().keys({
        title: Joi.string().optional(),
        url: Joi.string().optional(),
        blurb: Joi.string().optional(),
        price: Joi.number().optional(),
        limit: Joi.number().integer().optional()
      });
      const { value, error } = Joi.validate(req.body, schema);
      if (error && error.details) {
        return res.status(400).json(error);
      }
      const pic = await Pic.findOneAndUpdate({ _id: id }, value, { new: true });
      if (!pic) {
        return res.status(404).json({ err: 'could not find pic' });
      }
      return res.json(pic);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
};