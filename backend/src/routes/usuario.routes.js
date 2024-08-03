const express = require('../../../frontend/node_modules/@types/express');
const usuarioController = require('../controllers/usuario.controller');

const router = express.Router();

router.post('/', usuarioController.criarUsuario);
router.get('/', usuarioController.getUsuarios);

module.exports = router;
