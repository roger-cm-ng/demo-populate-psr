import jwt from 'jsonwebtoken';

const jwtSecretKey = 'abc123';

export default class JsonWebToken {
  static sign(data, res) {
    const {
      email, firstName, lastName, color
    } = data[0];

    jwt.sign(data[0], jwtSecretKey, (err, token) => {
      res.status(200).json({
        token,
        email,
        firstName,
        lastName,
        color
      });
    });
  }

  static verify(token, success, error) {
    jwt.verify(token, jwtSecretKey, (err, authData) => {
      if (err) {
        error(err);
      } else {
        success(authData);
      }
    });
  }
}
