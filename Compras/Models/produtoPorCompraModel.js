'produtoPorCompra strict'

//require
const mongoose = require('mongoose')
//schema
const Schema = mongoose.Schema;

const ProdutoPorCompraSchema = new Schema(
    {
        quantidade:{type: Number, required: true},
        precoUnidade:{type: Number, required: true},
        IdProduto:{type: Object, required: true},
        IdCompra:{type: Object, required: true}
    }, 
    {collection: 'ProdutosPorCompra'}
)

// model
const ProdutoPorCompra = mongoose.model('ProdutoPorCompra', ProdutoPorCompraSchema)

module.exports = ProdutoPorCompra
