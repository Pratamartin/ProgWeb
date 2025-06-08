import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv-flow';
import { createLink } from './utils.js';

config();

const dir = process.argv[2] || '.';
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url);

  if (url === '/' || url === '') {
    fs.readdir(dir, (err, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end(`Erro: ${err.message}`);
      }

      const html = files.map(createLink).join('');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    });
  } else {
    const filePath = path.join(dir, url);

    fs.readFile(filePath, 'utf-8', (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Arquivo não encontrado');
      }

      const html = `
        <a href="/">Voltar</a><br><br>
        <pre>${content}</pre>
      `;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    });
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
