// require
const ProdutosPorCompra = require('../Models/produtoPorCompraModel')
const Compras = require('../Models/compraModel')
const jwt = require('jsonwebtoken')

// Helpers
async function getIdFromToken(req){
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const tokenData = jwt.verify(token[1], process.env.SECRET);
    return tokenData.id;
}

exports.AdicionarProduto = async(req, res) => {
    const {idProduto, quantidade} = req.body

    if (!idProduto) {
        res.json({status: 'error', error: 'Nenhum produto selecionado'})
    }
    if (!quantidade) {
        res.json({status: 'error', error: 'Escolha uma quantidade do produto'})
    }

    const IdCompra = await Compras.findOne({IdUtilizador: await getIdFromToken(req), Estado: "CompraAtual"})
    if (!IdCompra) {
        res.json({status: 'error', error: 'Esse utilizador não tem nenhuma compra atual'})
    }

    const response = await ProdutosPorCompra.create({
        quantidade,
        IdProduto: idProduto,
        IdCompra: IdCompra._id
    })

    res.json({status: response})
}

exports.RemoverProduto = async(req, res) => {
    const {idProduto} = req.body

    if (!idProduto) {
        res.json({status: 'error', error: 'Nenhum produto selecionado'})
    }

    const IdCompra = await Compras.findOne({IdUtilizador: await getIdFromToken(req), Estado: "CompraAtual"})
    if (!IdCompra) {
        res.json({status: 'error', error: 'Esse utilizador não tem nenhuma compra atual'})
    }

    const response = await ProdutosPorCompra.deleteOne({IdProduto: idProduto, IdCompra: IdCompra._id})

    res.json({status: response})
}
