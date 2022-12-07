'stock strict'

//require
const mongoose = require('mongoose')
//schema
const Schema = mongoose.Schema;

const StockSchema = new Schema(
    {
        quantidade:{type: Number, required: true},
        IdProduto:{type: Object, required: true}
    }, 
    {collection: 'Stock'}
)

// model
const Stock = mongoose.model('ProdutoPorCompra', StockSchema)

module.exports = Stock
