import express from "express";
import dotenv from "dotenv";
import validateEnv from "./utils/validateEnv";
import morgan from "morgan";
import router from "./router/router";
import { engine } from "express-handlebars";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.engine("handlebars", engine({
  helpers: require("./views/helpers/helpers.ts")
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(morgan("short"));
app.use("/css", express.static(`${process.cwd()}/public/css`));
app.use("/js", express.static(`${process.cwd()}/public/js`));
app.use("/img", express.static(`${process.cwd()}/public/img`));
app.use(router);

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
