const { response } = require('express');
const Reporte = require('../models/reporte');

const crearReporte = async (req, res = response) => {

    // const {nombre, numero, url, direccion, descripcion} = req.body;

    try {

        const reporte = new Reporte(req.body);
        await reporte.save();
        res.json({
            ok: true,
            reporte,
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const allReportes = async (req, res = response) => {

    try {
        const reportes = await Reporte.find();
        reportes.reverse();

        res.json({
            ok: true,
            reportes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const filtrarReporte = async (req, res = response) => {
    
    const {numero} = req.body;

    try {
        const reporte = await Reporte.find({numero});
        reporte.reverse();

        res.json({
            ok: true,
            reporte
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    crearReporte,
    allReportes,
    filtrarReporte
}