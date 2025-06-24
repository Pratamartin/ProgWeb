import { Request, Response } from "express";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum();

const index = (req: Request, res: Response) => {
  res.send("Página principal do site");
};

const bemvindo = (req: Request, res: Response) => {
  res.send(`Seja bem-vindo ${req.params.nome}`);
};

const loremHandler = (req: Request, res: Response) => {
  const qtd = parseInt(req.params.qtd, 10);
  const output = Array.from({ length: qtd }, () => `<p>${lorem.generateParagraphs(1)}</p>`).join("\n");
  res.send(output);
};

const hb1 = (req: Request, res: Response) => {
  res.render("main/hb1", { mensagem: "Express + HBS!", layout: "main" });
};

const hb2 = (req: Request, res: Response) => {
  res.render("main/hb2", {
    poweredByNodejs: true,
    name: "Express",
    type: "Framework",
    layout: "main"
  });
};

const hb3 = (req: Request, res: Response) => {
  const profes = [
    { nome: "David Fernandes", sala: 1238 },
    { nome: "Horácio Fernandes", sala: 1233 },
    { nome: "Edleno Moura", sala: 1236 },
    { nome: "Elaine Harada", sala: 1231 }
  ];
  res.render("main/hb3", { profes, layout: "main" });
};

const hb4 = (req: Request, res: Response) => {
  const technologies = [
    { name: "Express", type: "Framework", poweredByNodejs: true },
    { name: "Laravel", type: "Framework", poweredByNodejs: false },
    { name: "React", type: "Library", poweredByNodejs: true },
    { name: "Handlebars", type: "Engine View", poweredByNodejs: true },
    { name: "Django", type: "Framework", poweredByNodejs: false },
    { name: "Docker", type: "Virtualization", poweredByNodejs: false },
    { name: "Sequelize", type: "ORM tool", poweredByNodejs: true }
  ];
  res.render("main/hb4", { technologies, layout: "main" });
};

export default { index, bemvindo, lorem: loremHandler, hb1, hb2, hb3, hb4 };
