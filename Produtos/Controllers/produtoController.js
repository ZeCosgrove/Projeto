const Produtos = require('../Models/produtoModel')
const ProdutosPorCompra = require('../../Compras/Models/produtoPorCompraModel')
const Compras = require('../../Compras/Models/compraModel')

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

    res.json({status: 'Produto Criado', Produto: response})
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

    const response = await Produtos.deleteOne(produtoParaRemover)
    res.json({status: 'Produto Removido', Produto: response})
}