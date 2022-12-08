const Stocks = require('../Models/stockModel')
const Produtos = require('../Models/produtoModel')

// *************************************** Adicionar *****************************************
exports.AdicionarStock = async(req, res) =>{
    const {quantidade, produto} = req.body

    if (!quantidade) {
        res.json({status: 'error', error: 'Quantidade não inserida'})
    }
    if (!produto) {
        res.json({status: 'error', error: 'Produto não selecionado'})
    }

    const IdProduto = await Produtos.findOne({_id: produto})
    if (!IdProduto) {
        res.json({status: 'error', error: 'Produto selecionado não existe'})
    }

    const stockExiste = await Stocks.findOne({IdProduto: IdProduto._id})
    if (stockExiste) {
        res.json({status: 'error', error: 'O stock desse produto já existe'})
    }else{
        const response = await Stocks.create({
            quantidade,
            IdProduto: IdProduto._id
        })
    
        res.json({status: response})
    }

    
}
// *************************************** Editar *****************************************
exports.EditarStock = async(req, res) =>{
    const {novaQuantidade, produto} = req.body

    if (!novaQuantidade) {
        res.json({status: 'error', error: 'Nova Quantidade não inserida'})
    }
    if (!produto) {
        res.json({status: 'error', error: 'Produto não selecionado'})
    }

    const IdProduto = await Produtos.findOne({_id: produto})
    if (!IdProduto) {
        res.json({status: 'error', error: 'Produto selecionado não existe'})
    }

    const Stock = await Stocks.findOne({IdProduto: IdProduto._id})
    if (!Stock) {
        res.json({status: 'error', error: 'O stock desse produto não existe'})
    }

    const response = await Stocks.updateOne(Stock, {quantidade: novaQuantidade})
    res.json({status: response})
}

// *************************************** Remover *****************************************
exports.RemoverStock = async(req, res) =>{
    const {produto} = req.body

    if (!produto) {
        res.json({status: 'error', error: 'Produto não selecionado'})
    }

    const IdProduto = await Produtos.findOne({_id: produto})
    if (!IdProduto) {
        res.json({status: 'error', error: 'Produto selecionado não existe'})
    }

    const Stock = await Stocks.findOne({IdProduto: IdProduto._id})
    if (!Stock) {
        res.json({status: 'error', error: 'O stock desse produto não existe'})
    }

    const response = await Stocks.deleteOne(Stock)

    res.json({status: response})
}

// *************************************** Ler *****************************************
exports.LerStock = async(req, res) => {
    const {produto} = req.body

    if (!produto) {
        res.json({status: 'error', error: 'Produto não selecionado'})
    }

    const IdProduto = await Produtos.findOne({_id: produto})
    if (!IdProduto) {
        res.json({status: 'error', error: 'Produto selecionado não existe'})
    }

    const Stock = await Stocks.findOne({IdProduto: IdProduto._id})
    if (!Stock) {
        res.json({status: 'error', error: 'O stock desse produto não existe'})
    }

    res.json({stock: Stock.quantidade})
}