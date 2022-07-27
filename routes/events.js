/* 
    Rutas de Usuarios /events
    host + /api/events
 */

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

//importar controller de events
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');


// Todas tienen que pasar por la validacion del JWT 
router.use(validarJWT);  //esto para no poner en todas las peticiones router.get('/', validarJWT, getEventos); si queremos que 
//una peticion no pase por validar jwt solo se sube arriba antes de esta instruccion

// Obtener eventos 
router.get('/', getEventos);

// Crear un nuevo evento 
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
);

// Actualizar evento 
router.put('/:id', actualizarEvento);

// Borrar evento 
router.delete('/:id', eliminarEvento);


module.exports = router;