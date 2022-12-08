const jwt = require('jsonwebtoken');
const Ajuda = require('../model/ajudaModel')

const GetAllAjudas = async (req, res) => {

    const ajuda = await Ajuda.find()

    if(ajuda)
        res.status(200).json(ajuda)
    else
        res.status(404)
}

const GetOneAjuda = async (req, res) => {
    const id = req.params.id

    const ajuda = await Ajuda.findById(id)

    console.log(ajuda)

    if(ajuda)
        res.status(200).json(ajuda)
    else
        res.status(404).json()
}

const WriteAjuda = async (req, res) => {
    const {texto, last_ajuda_id} = req.body

    const ajuda = new Ajuda({
        texto: texto,
        last_ajuda_id: last_ajuda_id,
        user_id: await getIdFromToken(req),
        timestamp: Date.now()
    })

    try {
        await ajuda.save()

        res.status(200).json(ajuda)
    } catch (err) {
        res.status(500).json({msg: err})
    }
}


//private methods
async function getIdFromToken(req){
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const tokenData = jwt.verify(token[1], process.env.SECRET);
    return tokenData.id;
}

module.exports =  {
    GetAllAjudas,
    GetOneAjuda,
    WriteAjuda
};