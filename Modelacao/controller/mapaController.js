const jwt = require('jsonwebtoken');
const Mapa = require('../model/mapaModel')

const GetMapa = async (req, res) => {

    const mapa = await Mapa.find()

    if(mapa)
        res.status(200).json(mapa)
    else
        res.status(404)
}

const AddToMapa = async (req, res) => {
    const {coordenada_x, coordenada_y, produto_id, modelo_id} = req.body

    const mapa = new Mapa({
        coordenada_x: coordenada_x,
        coordenada_y: coordenada_y,
        produto_id: produto_id,
        modelo_id: modelo_id
    })

    try {
        await mapa.save()

        res.status(200).json(mapa)
    } catch (err) {
        res.status(500).json({msg: err})
    }
}

const ChangeInMapa = async (req, res) => {
    const id = req.params.id
    const {coordenada_x, coordenada_y, produto_id, modelo_id} = req.body

    const oldMapa = await Mapa.findById(id)

    const mapa = new Mapa({
        _id: oldMapa._id,
        coordenada_x: coordenada_x,
        coordenada_y: coordenada_y,
        produto_id: produto_id,
        modelo_id: modelo_id
    })

    const newMapa = await Mapa.findByIdAndUpdate(id, mapa)

    if (newMapa)
        res.status(200).json(newMapa)
    else
        res.status(500).json()
}

const DeleteInMapa = async (req, res) => {
    const id = req.params.id

    const mapa = await Mapa.findByIdAndDelete(id)

    if (mapa)
        res.status(200).json(mapa)
    else
        res.status(404).json()
}

module.exports =  {
    GetMapa,
    AddToMapa,
    ChangeInMapa,
    DeleteInMapa
};