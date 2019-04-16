/* eslint-disable no-console */
import express from 'express';
import compression from 'compression';
import path from 'path';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import index from './routes/index';
import api from './routes/api';
import DB from './config/data-base';

const port = 3000;
const app = express();
const server = http.Server(app);

app.use(compression());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('port', process.env.PORT || port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', index);
app.use('/api', api);

DB.init();

// setTimeout(() => {
//   DB.get({
//     payload: { email: 'creativexcitant@gmail.com' },
//     db: 'administration',
//     lib: 'users',
//     success: (data) => {
//       console.log(data[0]);
//     }
//   });
// }, 3000);

server.listen(app.get('port'), app.get('ip'), () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
