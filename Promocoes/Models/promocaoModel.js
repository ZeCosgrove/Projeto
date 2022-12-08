'promocao strict'

//require
const mongoose = require('mongoose')
//schema
const Schema = mongoose.Schema;

const PromocaoSchema = new Schema(
    {
        IdProduto:{type: Object, required: true},
        Preco:{type: Number, required: true},
        Data_Final:{type: Date, required: true},
        IdUtilizador:{type: Object, required: true}
    }, 
    {collection: 'Promocoes'}
)

// model
const Promocao = mongoose.model('Promocao', PromocaoSchema)

module.exports = Promocao
