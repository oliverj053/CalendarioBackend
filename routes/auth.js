/* 
    Rutas de Usuarios /Auth
    host + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

//importar controller de auth
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
    '/new',
    [ //MIDLEWARE validaciones
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de tener mínimo 6 caraceres').isLength({ min: 6 }),
        validarCampos,
    ],
    crearUsuario
);

router.post(
    '/',
    [ //MIDLEWARE validaciones
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de tener mínimo 6 caraceres').isLength({ min: 6 }),
        validarCampos,
    ],
    loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;