import { Router } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const router = Router();

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
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
    return res.status(400).send('<h1>Parâmetro inválido. Use um número inteiro positivo.</h1>');
  }

  const paragraphs = lorem.generateParagraphs(count);
  const html = paragraphs
    .split('\n')
    .map(p => `<p>${p}</p>`)
    .join('');

  res.send(`<html><body>${html}</body></html>`);
});

export default router;
