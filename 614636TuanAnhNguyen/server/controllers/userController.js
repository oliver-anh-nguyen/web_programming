const User = require('../models/user')

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    res.json(User.login(username, password));
}