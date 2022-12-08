const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MapaSchema = new Schema({
    coordenada_x:{type: Number, require:true},
    coordenada_y:{type: Number, require:true},
    produto_id:{type: Object, require:true},
    modelo_id:{type: Object, require:true}
})

const Mapa = mongoose.model('Mapa', MapaSchema)

module.exports = Mapa