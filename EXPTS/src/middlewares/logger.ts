import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

type FormatType = 'simple' | 'complete';

export function logger(format: FormatType = 'simple') {
  const logPath = path.resolve(process.env.LOGS_PATH || 'logs/access.log');
  fs.mkdirSync(path.dirname(logPath), { recursive: true });

  return (req: Request, _res: Response, next: NextFunction) => {
    const now = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const protocol = req.httpVersion;
    const userAgent = req.get('User-Agent') || 'Unknown';

    let logLine = `[${now}] ${method} ${url}`;

    if (format === 'complete') {
      logLine += ` HTTP/${protocol} - ${userAgent}`;
    }

    logLine += '\n';

    fs.appendFile(logPath, logLine, (err) => {
      if (err) console.error('Erro ao escrever log:', err);
    });

    next();
  };
}
