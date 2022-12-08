const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ModeloSchema = new Schema({
    nome:{type: String, require:true},
    object:{type: Object, require:true}
})

const Modelo = mongoose.model('Modelo', ModeloSchema)

module.exports = Modelo