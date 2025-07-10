# ExpTs - Express com TypeScript + Prisma + Handlebars

Este é um projeto de aplicação web usando **Express**, **TypeScript**, **Prisma** e **Handlebars** para gerenciamento de usuários e cursos (majors).

---

## Pré-requisitos

- Node.js 18+
- Docker + Docker Compose
- Beekeeper Studio ou outro cliente MySQL (opcional)

---

## Rodando o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Pratamartin/ProgWeb.git
cd EXPTS
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Suba o banco de dados MySQL com Docker

```bash
sudo docker-compose up -d
```

### 4. Gere o cliente Prisma e rode as migrações

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Rode a aplicação

```bash
npm start
```

Acesse: [http://localhost:3000](http://localhost:3000)

---


## Variáveis de Ambiente

Crie um arquivo `.env` com base em `.env.example`:

```env
DATABASE_URL="mysql://user:userpass@localhost:3306/expts_db"
PORT=3000
LOGS_PATH=logs/access.log
```

---

## Rotas Disponíveis

### Usuários (`User`)
| Método | Rota               | Descrição                      |
|--------|--------------------|-------------------------------|
| GET    | `/user`            | Lista todos os usuários       |
| GET    | `/user/create`     | Formulário para novo usuário  |
| POST   | `/user/create`     | Cria um novo usuário          |
| GET    | `/user/edit/:id`   | Edita um usuário              |
| POST   | `/user/edit/:id`   | Atualiza o usuário            |
| GET    | `/user/delete/:id` | Exclui um usuário             |

---

### Cursos (`Major`)
| Método | Rota                | Descrição                    |
|--------|---------------------|------------------------------|
| GET    | `/major`            | Lista todos os cursos       |
| GET    | `/major/create`     | Formulário de novo curso    |
| POST   | `/major/create`     | Cria um novo curso          |
| GET    | `/major/edit/:id`   | Edita um curso              |
| POST   | `/major/edit/:id`   | Atualiza o curso            |
| GET    | `/major/delete/:id` | Exclui um curso             |

---

## Observações

- Logs de acesso são salvos no arquivo definido em `LOGS_PATH`
- Usa `Handlebars` como engine de visualização (`views/`)
- Usa `Joi` para validação de formulário no backend

---

