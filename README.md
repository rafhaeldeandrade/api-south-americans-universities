# South Americans Universities API

![GitHub repo size](https://img.shields.io/github/repo-size/rafhaeldeandrade/api-south-americans-universities?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/rafhaeldeandrade/api-south-americans-universities?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/rafhaeldeandrade/api-south-americans-universities?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/rafhaeldeandrade/api-south-americans-universities?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/rafhaeldeandrade/api-south-americans-universities?style=for-the-badge)

> API com node.js e express

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você já tem o Node.js LTS instalado na máquina - [veja como instalar aqui](https://www.vultr.com/docs/installing-node-js-and-express-on-ubuntu-20-04/#:~:text=js-,To%20install%20Node.,manage%20multiple%20versions%20of%20Node.)
- Você já instalou e garantiu que o MongoDB 4.4 está rodando na máquina - [veja como instalar e rodar aqui](https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-ubuntu/)
- Você já preencheu o arquivo `.env` na raiz do projeto, conforme o `.enx.example`, exemplo:

  ```
  MONGO_URL=mongodb://localhost:27017
  PORT=4000
  ```

## 🚀 Instalando

Para instalar o projeto, siga estas etapas:

- Clone o repositório

```bash
git clone git@github.com:rafhaeldeandrade/api-south-americans-universities.git
```

- Instale as dependências

```
cd api-south-americans-universities.git && yarn
```

ou

```
cd api-south-americans-universities.git && npm install
```

## ☕ Usando

Para iniciar o servidor: siga essas etapas:

1. Rode o script para transpilar o `typescript` em `javascript` com `yarn build` ou `npm run build`
2. Em seguida, rode o script para buscar as informações das universidades e popular o banco de dados com `yarn populate:db` ou `npm run populate:db`
3. Para iniciar o servidor, garanta que uma instância do MongoDB esteja de pé e que o arquivo `.env` na raiz esteja preenchido
4. Rode o script de início do servidor com `yarn start` ou `npm start`
5. Acesse `localhost:{PORT}` sendo PORT a porta especificada no `.env` ou 4000 por padrão.

## **REST API**

Essa API utiliza métodos HTTP comuns para a requisição e códigos de respostas HTTP para identificar status e erros. Todas as respostas vêm no formato JSON.

### Códigos de resposta

_Casos de sucesso:_

```
200: Success
201: Created
```

_Casos de falha:_

```http
400: Bad request
404: Resource not found
409: Conflict
500: Internal server error
```

Tirando o erro 404, que retorna um objeto vazio no corpo da resposta, todos os outros erros possuem um object contendo uma breve definição

_Exemplos de retorno quando houver erro:_

```http
http code 400
{
  "error": true,
  "MissingParamError": "Missing param: name"
}
```

## ROTAS

### GET /api/universities

Carrega todas as universidades cadastradas. 20 elementos por página, podendo receber `country` e `page` nas queries

**Requisição**

```http
GET /api/universities
```

**Queries opcionais**

```http
GET /api/universities?country=
GET /api/universities?page
```

**Resposta**

```http
{
  "totalPages": 15
  "universities": [{
      "id": "6348a2fc29a95be5a66ee311",
      "name": "Universidad Atlantida Argentina",
      "country": "Argentina",
      "stateProvince": "Buenos Aires"
    }]
}
```

### GET /api/universities/:id

Carrega uma universidade pelo seu id.

**Requisição**

```http
GET /api/universities/6348a93ce2331b3ac341aee3
```

**Resposta**

```http
{
  "id": "6348a93ce2331b3ac341aee3",
  "name": "Unifil",
  "country": "Brazil",
  "stateProvince": "Paraná",
  "domains": [
    "unifil.br"
  ],
  "webPages": [
    "https://unifil.br"
  ],
  "alphaTwoCode": "BR"
}
```

### POST /api/universities

Cria uma universidade

**Requisição**

```http
POST /api/universities
{
  "name": "Unifil",
  "country": "Brazil",
  "stateProvince": "Paraná",
  "domains": ["unifil.br"],
  "webPages": ["https://unifil.br"],
  "alphaTwoCode": "BR"
}
```

**Resposta**

```http
{
  "id": "6348a93ce2331b3ac341aee3",
  "name": "Unifil",
  "country": "Brazil",
  "stateProvince": "Paraná",
  "domains": [
    "unifil.br"
  ],
  "webPages": [
    "https://unifil.br"
  ],
  "alphaTwoCode": "BR"
}
```

### PUT /api/universities/:id

Delete uma universidade previamente cadastrada

**Requisição**

```http
DELETE /api/universities/6348a93ce2331b3ac341aee3
```

**Resposta**

```http
{
  "id": "6348a93ce2331b3ac341aee3"
}
```
