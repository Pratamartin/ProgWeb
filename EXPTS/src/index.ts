import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { engine } from 'express-handlebars';
import validateEnv from './utils/validateEnv';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/img', express.static(path.join(__dirname, '../public/img')));

app.get('/', (_req, res) => {
  res.send('Hello from TypeScript Express App!');
});

app.get('/about', (_req, res) => {
  res.render('about');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
