import express from 'express';
import jwt from 'jsonwebtoken';
import DataBase from '../config/data-base';
import Estimate from '../config/estimate';

const Api = express.Router();
const jwtSecretKey = 'abc123';
const verifyToken = (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  req.token = req.headers.authorization.split(' ')[1];
  next();
};

Api.post('/authenticate', (req, res) => {
  DataBase.getUser(
    req.body,
    (data) => {
      jwt.sign(data, jwtSecretKey, (err, token) => {
        res.status(200).json({
          token,
          ...data
        });
      });
    },
    (status, err) => {
      res.status(status).json(err);
    }
  );
});

Api.post('/verify-user', verifyToken, (req, res) => {
  jwt.verify(req.token, jwtSecretKey, (err, authData) => {
    if (err) {
      res.status(403).json({
        message: 'Forbidden'
      });
    } else {
      res.status(200).json({
        token: req.token,
        ...authData
      });
    }
  });
});

Api.post('/vote', verifyToken, (req, res) => {
  jwt.verify(req.token, jwtSecretKey, (err, authData) => {
    if (err) {
      res.status(403).json({
        message: 'Forbidden'
      });
    } else {
      Estimate.vote(req.body.card, authData);
      res.status(200).json({});
    }
  });
});

Api.get('/estimations', verifyToken, (req, res) => {
  jwt.verify(req.token, jwtSecretKey, (err) => {
    if (err) {
      res.status(403).json({
        message: 'Forbidden'
      });
    } else {
      res.status(200).json(Estimate.users);
    }
  });
});

export default Api;
