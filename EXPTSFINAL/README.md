# ExpTsFinal - Express com TypeScript + Prisma + Handlebars + Game


Projeto da disciplina de Programação Web que integra recursos de gerenciamento acadêmico com um jogo *Space Shooter Soccer* na página inicial. A aplicação é construída com **Node.js**, **Express**, **TypeScript**, **Prisma**, **Handlebars** e **MySQL**, e inclui autenticação, sessão, ranking e edição de usuários.

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
cd EXPTSFINAL
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
PORT=3000
LOGS_PATH=logs/access.log
DATABASE_URL="mysql://root:root@localhost:3306/expts_db"
SESSION_SECRET=Hi9Cf#mK98

```

---

## Rotas Disponíveis

### Usuários (`User`)
| Método | Rota               | Descrição                      |
|--------|--------------------|-------------------------------|
| GET    | `/user`            | Lista todos os usuários       |
| GET    | `/user/create`     | Formulário para novo usuário  |
| POST   | `/user/create`     | Cria um novo usuário          |
| GET    | `/user/edit-profile`   | Edita um usuário              |
| POST   | `/user/edit-profile`   | Atualiza o usuário            |
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

---

