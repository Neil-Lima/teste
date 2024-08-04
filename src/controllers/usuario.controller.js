const Usuario = require('../models/usuario.models');

exports.criarUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).send(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.send(usuarios);
  } catch (error) {
    res.status(500).send(error);
  }
};
