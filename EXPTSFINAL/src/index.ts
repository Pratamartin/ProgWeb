import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import validateEnv from './utils/validateEnv';
import { logger } from './middlewares/logger';
import * as helpers from './views/helpers/helpers';
import router from './router/router';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine({ helpers }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  genid: () => uuidv4(),
  secret: 'Hi9Cf#mK98',
  resave: true,
  saveUninitialized: false
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/img', express.static(path.join(__dirname, '../public/img')));
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));


app.use('/script.js', express.static(path.join(__dirname, '../public/script.js')));
app.use('/game.js', express.static(path.join(__dirname, '../public/game.js')));
app.use('/obstacle.js', express.static(path.join(__dirname, '../public/obstacle.js')));
app.use('/player.js', express.static(path.join(__dirname, '../public/player.js')));
app.use('/bullet.js', express.static(path.join(__dirname, '../public/bullet.js')));
app.use('/hud.js', express.static(path.join(__dirname, '../public/hud.js')));
app.use('/menu.js', express.static(path.join(__dirname, '../public/menu.js')));
app.use('/collision.js', express.static(path.join(__dirname, '../public/collision.js')));
app.use('/network.js', express.static(path.join(__dirname, '../public/network.js')));


app.use('/style.css', express.static(path.join(__dirname, '../public/style.css')));


app.use(logger('complete'));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
