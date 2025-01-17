const db = require("../models");
const User = db.users;

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) =>{

    console.log('-----------------3');
    const{email,password} = req.body;
    if (!email || !password ) return res.status(400).json({ 'message': 'Email\
    and password are required'});

    console.log('-----------------4');
    const findUser = await User.findOne({
        where: {
            email: email
        },
    });

    console.log('-----------------5');
    if (!findUser) return res.sendStatus(401); //Unauthorized

    //Password
    const match = await bcrypt.compare(password, findUser.password);
    console.log('-----------------6');
    if (match){
        const roles = Object.values(findUser.roles);

        //JWT
        const accessToken = jwt.sign(
            {"UserInfo": {'username': findUser.email, "roles": roles}},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '60s'}
        );
        const refreshToken = jwt.sign(
            {'username': findUser.email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );

        User.update({'refreshToken': refreshToken}, {where: {id:findUser.id}}, {multi:true}).then(function(){
            console.log('refresh token updated successfully!');
        })

        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite:'None',secure:true, maxAge:24 * 60 * 60 * 1000})
        console.log('-----------------4');
        res.json({ accessToken });
    }else{
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };