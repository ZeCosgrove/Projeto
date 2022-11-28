const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{type: String, require:true, unique:true},
    nome:{type: String, require:false},
    nif:{type: String, require:true},
    role:{type: Number, require:false},
    login_id: {type: Number, require:false}
})

const User = mongoose.model('User', UserSchema)

module.exports = User