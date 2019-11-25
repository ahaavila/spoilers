//importo o model Spoiler
const Spoiler = require('../model/spoiler');
const status = require('http-status');

//Metodo responsável por buscar um Spoiler
exports.buscarUm = (request, response, next) => {

    //pego o parametro(id) passado na URL
    const id = request.params.id;

    //agora que tenho o id do spoiler, vou buscar ele no banco
    //Spoiler.findById(id)
    Spoiler.findAll({ id })
        .then(spoiler => {
            if(spoiler) {
                response.status(status.OK).send(spoiler);
            } else {
                response.status(status.NOT_FOUND).send("Não foi possível encontrar o spoiler");
            }
        })
        .catch(error => next(error));
};

//Metodo responsavel por buscar todos os spoiler do banco, usando paginação
exports.buscaTodos = (request, response, next) => {
    //transformo o limite e a pagina passada pela URL em inteiro
    let limite = parseInt(request.query.limite || 0);
    let pagina = parseInt(request.query.pagina || 0);

    //checamos se o limite e pagina são realmente inteiros, se não for retorna status 404
    if(!Number.isInteger(limite) || !Number.isInteger(pagina)) {
        response.status(status.BAD_REQUEST).send();
    }


    const ITENS_POR_PAGINA = 10;

    //conta para determinar quantos itens por pagina.
    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;

    //atributos limit e offset será usados para criar a cláusula LIMIT ou uma outra utilizada pelo SGBD para paginar os dados
    Spoiler.findAll({ limit: limite, offset: pagina })
        .then(spoilers => {
            response.status(status.OK).send(spoilers);
        })
        .catch(error => next(error));
};

//Metodo responsavel por criar os spoilers
exports.criar = (request, response, next) => {

    //pego todos os meus dados que foram digitados pelo usuario
    const titulo = request.body.titulo;
    const espoliador = request.body.espoliador;
    const descricao = request.body.descricao;


    Spoiler.create({
        titulo: titulo,
        espoliador: espoliador,
        descricao: descricao
    }).then(() => {
        response.status(status.CREATED).send("Spoiler criado com sucesso!");
    }).catch((error) => next(error))
};

//Metodo responsavel por editar os spoilers
exports.atualizar = (request, response, next) => {

    //pego o id do spoiler para edição no banco
    const id = request.params.id;

    //pego todos os meus dados que foram digitados pelo usuario
    const titulo = request.body.titulo;
    const espoliador = request.body.espoliador;
    const descricao = request.body.descricao;

    Spoiler.findAll({ id })
        .then(spoiler => {
            if (spoiler) {
                Spoiler.update(
                    {
                        titulo: titulo,
                        espoliador: espoliador,
                        descricao: descricao
                    },
                    { where: { id: id } }
                )
                .then(() => {
                    response.status(status.OK).send("Spoiler editado com sucesso");
                })
                .catch(error => next(error));
            } else {
                response.status(status.NOT_FOUND).send("Não foi possível localizar o spoiler");
            }
        })
        .catch(error => next(error));
    };

    //Metodo responsavel por deletar os spoilers
    exports.excluir = (request, response, next) => {

        const id = request.params.id;

        Spoiler.findAll({ id })
            .then(spoiler => {
                if(spoiler) {
                    Spoiler.destroy({
                        where: { id: id }
                    })
                        .then(() => {
                            response.status(status.OK).send("Spoiler deletado com sucesso");
                        })
                        .catch(error => next(error));
                } else {
                    response.status(status.NOT_FOUND).send("Não foi possível deletar o spoiler");
                }
            })
            .catch(error => next(error));
    };