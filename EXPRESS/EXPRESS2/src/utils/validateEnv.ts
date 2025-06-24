import { cleanEnv, port, str } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    LOG_DIR: str(),
    LOG_FORMAT: str(),
  });
};

export default validateEnv;
