//requires
const Compras = require('../Models/compraModel')
const jwt = require('jsonwebtoken')

// Helpers
const EstadosEnum = {
    NovaCompra: 'Nova Compra', 
    CompraAtual: 'Compra a Decorrer', 
    CompraFinalizada: 'Compra Finalizada'
}
async function getIdFromToken(req){
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const tokenData = jwt.verify(token[1], process.env.SECRET);
    return tokenData.id;
}
// *************************************** Registar *****************************************
exports.NovaCompra = async(req, res) => {

    const response = await Compras.create({
        IdUtilizador: await getIdFromToken(req),
        Estado: "NovaCompra"
    })

    res.json({status: response})
}
// *************************************** Atualizar *****************************************
exports.AtualizarCompra = async(req, res) => {
    const {NovoEstado} = req.body

    if (!NovoEstado) {
        res.json({status: 'Erro', error: 'Nenhum Estado foi selecionado'})
    }

    const indiceEstado = Object.values(EstadosEnum).indexOf(NovoEstado);
    const Estado = Object.keys(EstadosEnum)[indiceEstado];
    if (!Estado) {
        res.json({status: 'Erro', error: 'Esse Estado não existe'})
    }

    const compra = await Compras.findOne({IdUtilizador: await getIdFromToken(req)})
    const response = await Compras.updateOne(compra, {Estado: Estado})
    res.json({Atualizacao: "Atualizado", status: response})
}
// *************************************** Ver *****************************************
exports.VerCompra = async(req, res) => {
    const {EstadoAtual} = req.body


    if (!EstadoAtual) {
        res.json({status: 'Erro', error: 'Nenhum Estado Atual foi selecionado'})
    }

    const indiceEstado = Object.values(EstadosEnum).indexOf(EstadoAtual);
    const Estado = Object.keys(EstadosEnum)[indiceEstado];
    if (!Estado) {
        res.json({status: 'Erro', error: 'Esse Estado não existe'})
    }

    const response = await Compras.findOne({IdUtilizador: await getIdFromToken(req), Estado: Estado})
    res.json({Compra: response})
}

exports.VerCompras = async(req, res) => {
    const todasAsCompras = await Compras.find({IdUtilizador: await getIdFromToken(req)})
    res.json({compras : todasAsCompras})
}

// *************************************** Remover *****************************************
exports.RemoverCompra = async(req, res) => {
    const { EstadoAtual} = req.body

    if (!EstadoAtual) {
        res.json({status: 'Erro', error: 'Nenhum Estado Atual foi selecionado'})
    }

    const indiceEstado = Object.values(EstadosEnum).indexOf(EstadoAtual);
    const Estado = Object.keys(EstadosEnum)[indiceEstado];
    if (!Estado) {
        res.json({status: 'Erro', error: 'Esse Estado não existe'})
    }

    const compra = await Compras.findOne({IdUtilizador: await getIdFromToken(req), Estado: Estado})
    const response = await Compras.deleteOne(compra)
    res.json({status: response})
}