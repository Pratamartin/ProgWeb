import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import validateEnv from './utils/validateEnv';
import { logger } from './middlewares/logger';
import * as helpers from './views/helpers/helpers';
import router from './router/router';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine({ helpers }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/img', express.static(path.join(__dirname, '../public/img')));
app.use(logger('complete'));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
