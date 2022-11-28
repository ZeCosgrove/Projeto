const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    login_id:{type: Number, require:false, unique:true},
    username:{type:String, require:true, unique:true},
    password:{type:String, require:true}
})

const Auth = mongoose.model('Login', AuthSchema)

module.exports = Auth