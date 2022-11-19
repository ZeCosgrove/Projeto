const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getUser = async (req,res) => {

    User.find({})
    .then(function(users){
        if(users) {
            res.status(200).json(users)
        }
        else {
            res.status(404).end()
        }
    })
}

exports.getUser = async (req,res) => {
    const {id}=req.params.id

    User.findOne({
        user_id: id
    })
    .then(function(user){
        if(user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).end()
        }
    })
}