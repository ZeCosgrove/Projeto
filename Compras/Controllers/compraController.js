//requires
const Utilizadores = require('../../Auth/model/user')
const Compras = require('../Models/compraModel')

const EstadosEnum = {
    NovaCompra: 'Nova Compra', 
    CompraAtual: 'Compra a Decorrer', 
    CompraFinalizada: 'Compra Finalizada'
}

// *************************************** Registar *****************************************
exports.NovaCompra = async(req, res) => {
    const {Utilizador, EstadoCompra} = req.body

    if (!Utilizador) {
        res.json({status: 'Erro', error: 'Nenhum produto foi selecionado'})
    }
    if (!EstadoCompra) {
        res.json({status: 'Erro', error: 'Nenhum Estado foi selecionado'})
    }

    const IdUtilizador = await Utilizadores.findOne({email: Utilizador})
    if (!IdUtilizador) {
        res.json({status: 'Erro', error: 'Esse Utilizador não existe'})
    }

    const indiceEstado = Object.values(EstadosEnum).indexOf(EstadoCompra);
    const Estado = Object.keys(EstadosEnum)[indiceEstado];

    if (!Estado) {
        res.json({status: 'Erro', error: 'Esse Estado não existe'})
    }

    const response = await Compras.create({
        IdUtilizador,
        Estado
    })

    res.json({status: 'Compra criada', compra: response})
}
// *************************************** Atualizar *****************************************
exports.AtualizarCompra = async(req, res) => {
    const {Utilizador, NovoEstado} = req.body

    if (!Utilizador) {
        res.json({status: 'Erro', error: 'Nenhum produto foi selecionado'})
    }
    if (!NovoEstado) {
        res.json({status: 'Erro', error: 'Nenhum Estado foi selecionado'})
    }

    const IdUtilizador = await Utilizadores.findOne({email: Utilizador})
    if (!IdUtilizador) {
        res.json({status: 'Erro', error: 'Esse Utilizador não existe'})
    }

    const indiceEstado = Object.values(EstadosEnum).indexOf(NovoEstado);
    const Estado = Object.keys(EstadosEnum)[indiceEstado];
    if (!Estado) {
        res.json({status: 'Erro', error: 'Esse Estado não existe'})
    }

    const response = await Compras.updateOne(Compras.findOne({IdUtilizador: IdUtilizador}), {Estado: Estado})
    res.json({status: 'ok', Atualizacao: response})
}
// *************************************** Ver *****************************************
exports.VerCompra = async(req, res) => {
    const {Utilizador, EstadoAtual} = req.body

    if (!Utilizador) {
        res.json({status: 'Erro', error: 'Nenhum produto foi selecionado'})
    }

    if (!EstadoAtual) {
        res.json({status: 'Erro', error: 'Nenhum Estado Atual foi selecionado'})
    }
    const IdUtilizador = await Utilizadores.findOne({email: Utilizador})
    if (!IdUtilizador) {
        res.json({status: 'Erro', error: 'Esse Utilizador não existe'})
    }

    const indiceEstado = Object.values(EstadosEnum).indexOf(EstadoAtual);
    const Estado = Object.keys(EstadosEnum)[indiceEstado];
    if (!Estado) {
        res.json({status: 'Erro', error: 'Esse Estado não existe'})
    }

    const response = await Compras.findOne({IdUtilizador: IdUtilizador, Estado: Estado})
    res.json({Compra: response})
}

exports.VerCompras = async(req, res) => {
    const {Utilizador} = req.body

    if (!Utilizador) {
        res.json({status: 'Erro', error: 'Nenhum produto foi selecionado'})
    }

    const IdUtilizador = await Utilizadores.findOne({email: Utilizador})
    if (!IdUtilizador) {
        res.json({status: 'Erro', error: 'Esse Utilizador não existe'})
    }
    const todasAsCompras = await Compras.find({IdUtilizador: IdUtilizador})
    res.json({compras : todasAsCompras})
}

// *************************************** Remover *****************************************
exports.RemoverCompra = async(req, res) => {
    const {Utilizador, EstadoAtual} = req.body

    if (!Utilizador) {
        res.json({status: 'Erro', error: 'Nenhum produto foi selecionado'})
    }

    if (!EstadoAtual) {
        res.json({status: 'Erro', error: 'Nenhum Estado Atual foi selecionado'})
    }
    const IdUtilizador = await Utilizadores.findOne({email: Utilizador})
    if (!IdUtilizador) {
        res.json({status: 'Erro', error: 'Esse Utilizador não existe'})
    }

    const indiceEstado = Object.values(EstadosEnum).indexOf(EstadoAtual);
    const Estado = Object.keys(EstadosEnum)[indiceEstado];
    if (!Estado) {
        res.json({status: 'Erro', error: 'Esse Estado não existe'})
    }

    const compra = await Compras.findOne({IdUtilizador: IdUtilizador, Estado: Estado})
    const response = await Compras.deleteOne(compra)
    res.json({status: response})
}