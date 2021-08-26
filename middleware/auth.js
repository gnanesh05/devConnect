const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req,res,next)=>{
    const token = req.header('x-auth-token');

    if(!token)
    {
       return res.status(401).json({msg:'No token, failed authorization'});

    }

    try{
        const decoded = jwt.verify(token, config.get('JwtSecret'));
        req.user = decoded.user;
        next();
    }
    catch(err)
    {
        return res.status(401).json({msg:"Token not valid"});
    }
}