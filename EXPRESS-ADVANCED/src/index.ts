import express from 'express';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import router from './router/router';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(process.cwd(), 'src', 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
