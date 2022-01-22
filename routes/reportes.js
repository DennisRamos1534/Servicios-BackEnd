/**
 *     Path: api/reporte
 */

 const {Router} = require('express');
 const { check } = require('express-validator');
const { crearReporte, allReportes, filtrarReporte } = require('../controllers/reportes');
 const { validarCampos } = require('../middlewares/validar-campos');
 
 const router = Router();
 
 
 router.post('/new', [
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     check('numero', 'El numero es obligatorio y tiene que ser 10 digitos').not().isEmpty().isLength({min: 9, max: 11}),
     check('urlImagen', 'La url obligatoria').not().isEmpty(),
     check('direccion', 'La direccion es obligatoria').not().isEmpty(),
     check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
     validarCampos
 ],crearReporte);
 
 router.get('/', allReportes);
 
 router.get('/filtrado', [
    check('numero', 'El numero es obligatorio y tiene que ser 10 digitos').not().isEmpty().isLength({min: 9, max: 11}),
    validarCampos
 ], filtrarReporte);
 
 
 module.exports = router;