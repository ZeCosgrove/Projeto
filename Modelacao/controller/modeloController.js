const jwt = require('jsonwebtoken');
const Modelo = require('../model/modeloModel')

const GetModelo = async (req, res) => {

    const modelo = await Modelo.find()

    if(modelo)
        res.status(200).json(modelo)
    else
        res.status(404)
}

const AddModelo = async (req, res) => {

    const {nome, object} = req.body

    const modelo = new Modelo({
        nome: nome,
        object: object
    })

    try {
        await modelo.save()

        res.status(200).json(modelo)
    } catch (err) {
        res.status(500).json({msg: err})
    }
}

const ChangeModelo = async (req, res) => {
    const id = req.params.id
    const {nome} = req.body

    const oldModelo = await Modelo.findById(id)

    console.log(req.params.id)

    const modelo = new Modelo({
        _id: oldModelo._id,
        nome: nome,
        object: oldModelo.object
    })

    const newModelo = await Modelo.findByIdAndUpdate(id, modelo)

    if (newModelo)
        res.status(200).json(newModelo)
    else
        res.status(500).json()
}

const DeleteModelo = async (req, res) => {
    const id = req.params.id

    const modelo = await Modelo.findByIdAndDelete(id)

    if (modelo)
        res.status(200).json(modelo)
    else
        res.status(404).json()
}

module.exports =  {
    GetModelo, 
    AddModelo, 
    ChangeModelo, 
    DeleteModelo
};