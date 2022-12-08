const Produtos = require('../Models/produtoModel')
const Stocks = require('../Models/stockModel')


// *************************************** Adicionar *****************************************
exports.CriarProduto = async(req, res) => {
    const {nome, preco} = req.body

    if (!nome || !preco) {
        res.json({status: 'Error', error: 'Nome ou Preço do produto não foi submetido'})
    }

    const response = await Produtos.create(
        {
            nome, 
            preco
        })

    const stock = await Stocks.create({
        quantidade: 0,
        IdProduto: response._id
    })
    res.json({status: 'Produto Criado', Produto: response, Stock: stock})
}

// *************************************** Editar *****************************************
exports.EditarNomeProduto = async(req, res) => {
    const {nomeAntigo, novoNome} = req.body

    if (!novoNome || !nomeAntigo) {
        res.json({status: 'Error', error: 'Nome do produto não foi submetido'})
    }

    const produtoDesatualizado = await Produtos.findOne({nome: nomeAntigo})
    if (!produtoDesatualizado) {
        res.json({status: 'error', error: 'Nome do produto escolhido não existe'})
    }
    const response = await Produtos.updateOne(produtoDesatualizado, {nome: novoNome})

    res.json({status: 'Nome do Produto Atualizado', Produto: response})
}

exports.EditarPrecoProduto = async(req, res) => {
    const {nome, novoPreco} = req.body

    if (!nome || !novoPreco) {
        res.json({status: 'Error', error: 'Nome ou Preço do produto não foi submetido'})
    }

    const produtoDesatualizado = await Produtos.findOne({nome: nome})
    if (!produtoDesatualizado) {
        res.json({status: 'error', error: 'Nome do produto escolhido não existe'})
    }
    const response = await Produtos.updateOne(produtoDesatualizado, {preco: novoPreco})

    res.json({status: 'Preço do Produto Atualizado', Produto: response})
}

// *************************************** Remover *****************************************
exports.RemoverProduto = async(req, res) => {
    const {nome} = req.body

    if (!nome) {
        res.json({status: 'error', error: 'Nome do produto não foi submetido'})
    }

    const produtoParaRemover = await Produtos.findOne({nome: nome})
    if (!produtoParaRemover) {
        res.json({status: 'error', error: 'Nome do produto escolhido não existe'})
    }

    const stock = await Stocks.findOneAndDelete({IdProduto: produtoParaRemover._id})

    const response = await Produtos.deleteOne(produtoParaRemover)
    res.json({status: 'Produto Removido', Produto: response, Stock: stock})
}

// *************************************** Ler *****************************************
exports.LerProduto = async(req, res) => {
    const {nome} = req.body

    if (!nome) {
        res.json({status: 'error', error: 'Nome do produto não foi submetido'})
    }

    const produto = await Produtos.findOne({nome: nome})
    if (!produto) {
        res.json({status: 'error', error: 'Nome do produto escolhido não existe'})
    }

    const stockProduto = await Stocks.findOne({IdProduto: produto._id})

    var stock = "Tem Stock"
    if (stockProduto.quantidade <= 0) {
        stock = "Não tem Stock"
    }

    res.json({Produto: produto, stock: stock})
}

exports.LerProdutos = async(req, res) => {
    const produtos = await Produtos.find()
    res.json({Produtos: produtos})
}