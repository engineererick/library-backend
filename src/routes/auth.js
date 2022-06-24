const router = require('express').Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const authToken = require('./auth');
const jwt = require('jsonwebtoken');

router.post('/signin', async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email not found');
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid password');

        const token = jwt.sign({ _id: user._id, role: user.role, fullName: user.fullName}, process.env.SECRET_TOKEN);
        res.header('session-token', token).json(token);
        res.json()
    } catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;