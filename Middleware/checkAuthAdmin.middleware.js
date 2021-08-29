const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.cookies.access_token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    if(req.user.role === 'admin') {
      next();
    }else{
      res.redirect('/map');
    }
};