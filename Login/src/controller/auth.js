const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

exports.login = async (req,res) => {
    if (req.body.user == "" && req.body.password){
        const token = jwt.sign({userId: 1}, secret, {expiresIn: 600})
        return res.json({auth: true, token})
    }

    res.status(401).end 
}

exports.getUser = async (req,res) => {
    const {id}=req.params.id

    /*User.findOne({
        user_id: id
    })
    .then(function(user){
        if(user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).end()
        }
    })*/
}