/* eslint no-console: 0 */

import userService from './user.service';
import User, { STANDARD_ROLE } from './user.model';
import jwt from '../../helpers/jwt';

export default {
  async signup(req, res) {
    try {
      const { value, error } = userService.validateSignup(req.body);
      if (error) {
        return res.status(400).json(error);
      }
      const encryptedPass = userService.encryptPassword(value.password);

      // eslint-disable-next-line no-unused-vars
      const user = await User.create({
        email: value.email,
        firstName: value.firstName,
        lastName: value.lastName,
        password: encryptedPass,
        role: STANDARD_ROLE
      });
      return res.json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async login(req, res) {
    try {
      const { value, error } = userService.validateLogin(req.body);
      if (error) {
        return res.status(400).json(error);
      }
      const user = await User.findOne({ email: value.email });
      if (!user) {
        return res.status(401).json({ err: 'unauthorized' });
      }
      const authenticated = userService.comparePassword(value.password, user.password);
      if (!authenticated) {
        return res.status(401).json({ err: 'unauthorized' });
      }
      // eslint-disable-next-line no-underscore-dangle
      const token = jwt.issue({ id: user._id }, '1d');
      return res.json({ token });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  authenticate(req, res) {
    return res.json(req.user);
  }
};
