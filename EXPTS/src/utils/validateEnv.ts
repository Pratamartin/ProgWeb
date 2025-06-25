import { cleanEnv, port } from 'envalid';

export default function validateEnv() {
  cleanEnv(process.env, {
    PORT: port()
  });
}
