'compra strict'

//require
const mongoose = require('mongoose')
//schema
const Schema = mongoose.Schema;

const CompraSchema = new Schema(
    {
        IdUtilizador:{type: Object, required: true},
        Estado:{type: Object, required: true}
    }, 
    {collection: 'Compras'}
)

// model
const Compra = mongoose.model('Compra', CompraSchema)

module.exports = Compra
