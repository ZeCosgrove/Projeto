// requires
const Promocoes = require('../Models/promocaoModel')
const Produtos = require('../../Produtos/Models/produtoModel')
const Utilizadores = require('../../Auth/model/user')

// *************************************** Adicionar *****************************************
exports.CriarPromocao = async(req, res) => {
    const {Produto, Preco, Data, EmailUtilizador} = req.body

    if (!Produto) {
        res.json({status: 'Erro ao Registar Promoções', error: 'Nenhum Produto Selecionado'})
    }
    if (!Preco) {
        res.json({status: 'Erro ao Registar Promoções', error: 'Nenhum Valor de Desconto Escolhido'})
    }
    if (!Data) {
        res.json({status: 'Erro ao Registar Promoções', error: 'A promoção tem de ter Data de término'})
    }
    if (!EmailUtilizador) {
        res.json({status: 'Erro ao Registar Promoções', error: 'Nenhum Utilizador Selecionado'})
    }

    // verificar se o produto existe
    const IdProduto = await Produtos.findOne({nome: Produto})
    if (!IdProduto) {
        res.json({status: 'Erro', error: 'Esse Produto não existe'})
    }

    // verificar se o utilizador existe
    const IdUtilizador = await Utilizadores.findOne({email: EmailUtilizador})
    if (!IdUtilizador) {
        res.json({status: 'Erro', error: 'Esse Utilizador não existe'})
    }

    // Criar a data com o formato correto
    const Data_Final = new Date(Data)

    const response = await Promocoes.create({
        IdProduto, 
        Preco,
        Data_Final,
        IdUtilizador
    })

    res.json({status: response})
}

// *************************************** Atualizar *****************************************
exports.EditarPreco = async(req, res) => {
    const {Produto, NovoPreco, EmailUtilizador} = req.body

    if (!Produto) {
        res.json({status: 'error', error: 'Selecione um produto para atualizar a promoção'})
    } 
    if (!NovoPreco) {
        res.json({status: 'error', error: 'Escolha um novo valor de promoção'})
    }
    if (!EmailUtilizador) {
        res.json({status: 'error', error: 'Escolha um Utilizador para atualizar a promoção'})
    }

    const IdProduto = await Produtos.findOne({nome: Produto})
    if (!IdProduto) {
        res.json({status: 'Erro', error: 'Esse Produto não existe'})
    }

    // verificar se o utilizador existe
    const IdUtilizador = await Utilizadores.findOne({email: EmailUtilizador})
    if (!IdUtilizador) {
        res.json({status: 'Erro', error: 'Esse Utilizador não existe'})
    }

    const promocao = await Promocoes.findOne({IdProduto: IdProduto, IdUtilizador: IdUtilizador})
    if (!promocao) {
        res.json({status: 'error', error: 'A promocao que pretende não existe'})
    }

    const response = await Promocoes.updateOne(promocao, {Preco: NovoPreco})
    res.json({status: response})
}

exports.EditarData = async(req, res) => {
    const {Produto, NovaData, EmailUtilizador} = req.body

    if (!Produto) {
        res.json({status: 'error', error: 'Selecione um produto para atualizar a promoção'})
    }
    if (!NovaData) {
        res.json({status: 'error', error: 'Escolha uma nova data de término da promoção'})
    }
    if (!EmailUtilizador) {
        res.json({status: 'error', error: 'Escolha um Utilizador para atualizar a promoção'})
    }

    const IdProduto = await Produtos.findOne({nome: Produto})
    if (!IdProduto) {
        res.json({status: 'Erro', error: 'Esse Produto não existe'})
    }

    // verificar se o utilizador existe
    const IdUtilizador = await Utilizadores.findOne({email: EmailUtilizador})
    if (!IdUtilizador) {
        res.json({status: 'Erro', error: 'Esse Utilizador não existe'})
    }

    const promocao = await Promocoes.findOne({IdProduto: IdProduto, IdUtilizador: IdUtilizador})
    if (!promocao) {
        res.json({status: 'error', error: 'A promocao que pretende não existe'})
    }

    const Nova_Data = new Date(NovaData)

    const response = await Promocoes.updateOne(promocao, {Preco: Nova_Data})
    res.json({status: response})
}

// *************************************** Ver *****************************************
exports.VerPromocao = async(req, res) => {
    const {Produto, EmailUtilizador} = req.body

    if (!Produto) {
        res.json({status: 'error', error: 'Selecione um produto para ver a promoção'})
    }
    if (!EmailUtilizador) {
        res.json({status: 'error', error: 'Escolha um Utilizador para atualizar a promoção'})
    }
    const IdProduto = await Produtos.findOne({nome: Produto})
    if (!IdProduto) {
        res.json({status: 'Erro', error: 'Esse Produto não existe'})
    }
    // verificar se o utilizador existe
    const IdUtilizador = await Utilizadores.findOne({email: EmailUtilizador})
    if (!IdUtilizador) {
        res.json({status: 'Erro', error: 'Esse Utilizador não existe'})
    }

    const promocao = await Promocoes.findOne({IdProduto: IdProduto, IdUtilizador: IdUtilizador})
    if (!promocao) {
        res.json({status: 'error', error: 'A promocao que pretende não existe'})
    }

    res.json({Promocao: promocao})
    
}

exports.VerPromocoes = async(req, res) => {
    const {EmailUtilizador} = req.body

    if (!EmailUtilizador) {
        res.json({status: 'error', error: 'Escolha um Utilizador para atualizar a promoção'})
    }

    // verificar se o utilizador existe
    const IdUtilizador = await Utilizadores.findOne({email: EmailUtilizador})
    if (!IdUtilizador) {
        res.json({status: 'Erro', error: 'Esse Utilizador não existe'})
    }
    const todasAsPromocoes = await Promocoes.fidn({IdUtilizador: IdUtilizador})
    res.json({TodasAsPromocoes: todasAsPromocoes})
}

// *************************************** Remover *****************************************

exports.RemoverPromocao = async(req, res) => {
    const {Produto, EmailUtilizador} = req.body

    if (!Produto) {
        res.json({status: 'error', error: 'Selecione um produto para ver a promoção'})
    }
    if (!EmailUtilizador) {
        res.json({status: 'error', error: 'Escolha um Utilizador para atualizar a promoção'})
    }

    const IdProduto = await Produtos.findOne({nome: Produto})
    if (!IdProduto) {
        res.json({status: 'Erro', error: 'Esse Produto não existe'})
    }
    // verificar se o utilizador existe
    const IdUtilizador = await Utilizadores.findOne({email: EmailUtilizador})
    if (!IdUtilizador) {
        res.json({status: 'Erro', error: 'Esse Utilizador não existe'})
    }

    const promocao = await Promocoes.findOne({IdProduto: IdProduto, IdUtilizador: IdUtilizador})
    if (!promocao) {
        res.json({status: 'error', error: 'A promocao que pretende não existe'})
    }

    const removido = await Promocoes.deleteOne(promocao)
    res.json({Status: removido})
}