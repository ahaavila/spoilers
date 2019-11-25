//importando o express
const express = require('express');
//importando o controller que é onde minha rota vai ligar
const controller = require('../controller/spoiler');

//Criando um objeto do tipo Router para configurar minhas rotas
const router = express.Router();

router.get('/spoilers/:id', controller.buscarUm);

router.get('/spoilers', controller.buscaTodos);

router.post('/spoilers', controller.criar);

router.put('/spoilers/:id', controller.atualizar);

router.delete('/spoilers/:id', controller.excluir);


module.exports = router;