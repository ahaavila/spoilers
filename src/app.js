//importo o http e o express
const http = require('http');
const express = require('express');
const status = require('http-status');
//importando o arquivo de rotas
const spoilersRoute = require('./routes/spoilers');
const sequelize = require('./database/database');

//instanciando o express
const app = express();

///MIDDLEWARES START///

//passo para o express que meus dados vão ser retornados em formato json para o usuário
app.use(express.json());

//Passo para o express o caminho padrão para começar as rotas
app.use("/api", spoilersRoute);

//middleware que retorna erro 404 caso não encontre a url
app.use((request, response, next) => {
    response.status(status.NOT_FOUND).send("Página não encontrada");
});

//Tratamento de erro global
app.use((error, request, response, next) => {
    response.status(status.INTERNAL_SERVER_ERROR).json({ error });
});

///MIDDLEWARES END///

//crio a conexão com o servidor e o BD
//Se a conexão do banco for um sucesso eu subo o servidor.
//force: true pega meu servidor e cria a tabela que eu modelei no model, mas não cria o banco.
sequelize.sync({  }).then(() => {
    //Pego a porta que está configurada como ambiente no meu servidor ou pego a porta 3000
    const port = process.env.PORT || 3000;

    //Configuro a porta no express
    app.set("port", port);

    //crio meu servidor
    const server = http.createServer(app);

    //Faço o servidor ouvir a porta configurada
    server.listen(port);
});