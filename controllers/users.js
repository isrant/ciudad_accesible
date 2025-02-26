const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');
const { createUser, getUserById, getUserByEmail } = require('../db/users');

const newUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // DEBERIA SER SUSTITUIDO POR JOI -----
    if (!email || !password) {
      throw generateError('Debes introducir email y password', 400);
    }

    const id = await createUser(email, password);
    console.log(id);

    res.send({
      status: 'ok',
      message: `User created with id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

const getUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    res.send({
      status: 'ok',
      message: user,
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError('Debes introducir un email y una password', 400);
    }

    // Recojo los datos de la base de datos del usuario con ese email
    const user = await getUserByEmail(email);
    console.log(user);

    // Compruebo que las contraseñas coinciden
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateError('La contraseña no es correcta', 401);
    }

    // Creo el payload del token
    const payload = { id: user.id };

    //Firmo el token
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '60d' });

    //Envío el token

    res.send({
      status: 'ok',
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newUserController,
  getUserController,
  loginController,
};
