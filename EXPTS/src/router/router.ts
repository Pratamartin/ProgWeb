import { Router } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const router = Router();

const lorem = new LoremIpsum({
  sentencesPerParagraph: { min: 4, max: 8 },
  wordsPerSentence: { min: 4, max: 16 }
});


router.get('/', (_req, res) => {
  res.send('Hello from TypeScript Express App!');
});


router.get('/about', (_req, res) => {
  res.render('about');
});


router.get('/lorem/:count', (req, res) => {
  const count = parseInt(req.params.count);

  if (isNaN(count) || count < 1) {
    return res
      .status(400)
      .send('<h1>Parâmetro inválido. Use um número inteiro positivo.</h1>');
  }

  const paragraphs = lorem.generateParagraphs(count);
  const html = paragraphs
    .split('\n')
    .map(p => `<p>${p}</p>`)
    .join('');

  res.send(`<html><body>${html}</body></html>`);
});


router.get('/hb1', (_req, res) => {
  res.render('hb/hb1', {
    mensagem: 'Olá, você está aprendendo Express + HBS!'
  });
});


router.get('/hb2', (_req, res) => {
  res.render('hb/hb2', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework'
  });
});


router.get('/hb3', (_req, res) => {
  const professores = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 }
  ];

  res.render('hb/hb3', { professores });
});


router.get('/hb4', (_req, res) => {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true }
  ];

  res.render('hb/hb4', { technologies });
});


export default router;
