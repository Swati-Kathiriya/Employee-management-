const jwt = require('jsonwebtoken');
const secretkey = `sw$36dyt`;

const authMiddleware = async(req, res, next) => {
  let token;
  
  // Get token from header
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {  
    token = req.headers.authorization.split(' ')[1];
  } else {
    token = req.body.token; 
  }

  if(!token) {
    return res.status(401).json({msg: 'No token, auth denied'});
  }

  try {
    // Verify token  
    const decoded = jwt.verify(token, secretkey);

    // Get user from database or other data source
    const user = await User.findById(decoded.userId);

    // Attach user to request  
    req.user = user;  
  } catch(err) {
    console.log(err);
    res.status(401).json({msg: 'Invalid token'});
  }

  next();
}

module.exports = authMiddleware;