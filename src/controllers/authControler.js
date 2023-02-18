const authService = require('../services/authService');

exports.getLogin = (req, res) =>{

    res.render('login');
}

exports.postLogin = async (req, res) =>{

    const {email, password} = req.body;

    const user = await authService.findByUsername(username);

    if(!user){

        return res.render('login', {error: "User or password don`t match!"});
    }

    const isValid = await user.validatePassword(password);

    if(!isValid){

        return res.render('login', {error: "User or password don`t match!"});
    }

    try {
     const token = await authService.login(email, password);
     res.cookie('auth', token);
    }
    catch(err) {
        const errors = Object.keys(err.errors).map(key => err.errors[key].message)
        return res.render('login', {error: errors[0]})
    }
    res.redirect('/');
}

exports.getRegister = (req, res) =>{

    res.render('register')
}

exports.postRegister = async (req, res) =>{
   
   const {username, email, password, repass} = req.body;

   const existingUser = await authService.findByUsername(username);

   if(existingUser){

     return res.render('register', {error: "This user exists!"})

    }

    if(password !== repass){

       return res.render('register', {error: "Password missmatch!"}) 
    }

    try {
        const token = await authService.register(username, email, password, repass);
        res.cookie('auth', token);
    }
    catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message)

        return res.render('register', {error: errors[0]})
    }

    res.redirect('/');
}

exports.getLogout = (req, res) =>{

    res.clearCookie('auth');
    res.redirect('/');
}