const User = require('../models/User');
const jwt = require('../lib/jsonwebtoken');
const config = require('../config')


exports.register = async (username, email, password) => {
    
    await User.create({username, email, password})
    
    return this.login(email, password);
};

exports.findByUsername = (username) => User.findOne({username});

exports.findByEmail = (email) => User.findOne({email});

exports.login = async (email, password) => {

    const user = await this.findByEmail(email);

    const payload = {_id: user._id, user: user.username, email: user.email}
    const token = await jwt.sign(payload, config.SECRET, {expiresIn: '2h'})
    return token;
}
