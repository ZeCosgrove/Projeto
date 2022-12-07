'produto strict'

//require
const mongoose = require('mongoose')
//schema
const Schema = mongoose.Schema;

const ProdutoSchema = new Schema(
    {
        nome:{type: String, required: true},
        preco:{type: Number, required: true}
    }, 
    {collection: 'Produtos'}
)

// model
const Produto = mongoose.model('Produto', ProdutoSchema)

module.exports = Produto
