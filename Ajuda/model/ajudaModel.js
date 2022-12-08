const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AjudaSchema = new Schema({
    texto:{type: String, require:true},
    last_ajuda_id:{type: Object, require:false},
    user_id:{type: Object, require:true},
    timestamp:{type: Date, require:false}
})

const Ajuda = mongoose.model('Ajuda', AjudaSchema)

module.exports = Ajuda