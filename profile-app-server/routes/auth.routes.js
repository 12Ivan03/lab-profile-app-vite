const router = require("express").Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User.model');
const { isAuthenticated } = require('../middleware/jwt.middleware')

router.post("/signup", async (req, res, next) => {

    const { username, password, campus, course } = req.body;

        if(username === '' || password === ''){
            return res.json({message: 'Fill in the required spaces'})
        }

        try{
            const foundUser = await User.findOne({ username });

            if(foundUser){
                return res.json({ message: "Username already exists. You need unique Username" });
            }

            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);

            const createUser = await User.create({ username, password: hash, campus, course });

            const newUser = { username: createUser.username, campus: createUser.campus, course: createUser.course, _id: createUser._id }

            return res.json({ user: newUser})

        } catch(err) {
                console.log(err)
                return res.json({message: 'error from the catch 500'})
        }
         
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if(username === ''|| password === ''){
        res.json({message: "Provide username and password"});
        return;
    }

    try{

        const findUser = await User.findOne({ username });

        if(!findUser){
            return res.json({message: 'User not found'})
        }
        
        const checkPassword = await bcrypt.compare(password, findUser.password);

        if(checkPassword){

            const payload = { username: findUser.username, _id: findUser._id, campus: findUser.campus, course: findUser.course, image: findUser.image }
            
            const userToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                {
                    algorithm: 'HS256',
                    expiresIn: '1h'
                }
            );

            return res.json({ token: userToken })
        } else {
            return res.json({ message: 'Unable to authenticate the user'})
        }

    }catch(err){
        console.log(err)
        return res.json({ message: ' Internal Server Error. err from the catch 0_0'})
    }

});

router.get('/verify', isAuthenticated, (req, res, next) => {
    
    res.json(req.payload);
});

module.exports = router;
