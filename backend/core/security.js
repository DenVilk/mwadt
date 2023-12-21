const { secretKey } = require("./config.js");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role) => {
  try {
    const token = jwt.sign({ id, email, role }, secretKey, { expiresIn: '24h' });
    console.log('Сгенерированный токен:', token);
    return token;
  } catch (error) {
    console.error('Ошибка генерации токена:', error.message);
    return null;
  }
}

module.exports = generateJwt;