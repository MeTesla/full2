const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');    
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;   
    next();
  } catch (error) {
    res.status(401).send({ error: 'Veuillez vous authentifier' });
  }
};

module.exports = authenticate;