const jwt = require('../lib/jsonWebToken');
const config = require('../config');

exports.authentication = async (req, res, next) =>{

    const token = req.cookies['auth'];

    if(token){

        try {
            const decodedToken = await jwt.verify(token, config.SECRET)
            req.user = decodedToken;
            req.isAuthenticated = true;
            res.locals.isAuthenticated = true;
            res.locals.email = decodedToken.email;
            res.locals.username = decodedToken.username;
            }
            catch(err){
                res.clearCookie('auth');
                res.redirect('/404')
            }
    }
    next();
}

exports.isAuthenticated = (req, res, next) =>{

    if(!req.isAuthenticated){

        res.redirect('/login');
        res.clearCookie();
    }
    next();
}