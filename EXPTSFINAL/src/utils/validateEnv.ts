import { cleanEnv, str, port } from 'envalid';

export default function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    DATABASE_URL: str(),
    SESSION_SECRET: str(),
  });
}
