const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const checkJwt = require('../middleware/check-jwt')


router.post('/new', (req,res, next)=>{
    const {userName,password,position} = req.body

    if (!userName || !password) {
        return res.status(400).json(
            {
                success:false,
                message:'Please enter All Fields'
            }
        )
    }

    let user = new User()
    user.userName = userName
    user.password = password
    user.position = position

    User.findOne({userName: userName}, (err, existingUser)=>{
        if (err) throw err
        if (existingUser) {
            res.json({
                success:false,
                message:'Account with that email is already Exist'
            })
        } else {
            user.save()
            var token = jwt.sign(
                {user: user},process.env.SECRET_WORD,
                {expiresIn:'7d'}
            );

            res.json({
                success: true,
                message: ' jwt token',
                token: token
            })
        }
    })
})

router.post('/login', (req,res, next)=>{
    User.findOne({userName: req.body.userName}, (err, user)=>{
        if (err) throw err
        if (!user) {
            res.json({
                success: false,
                message: 'User  Does  exists'
            })
        } else if (user) {
            var validPassword = user.comparePassword(req.body.password)
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'Incorrect Password'
                })
            } else{
                var token = jwt.sign(
                    {user: user},process.env.SECRET_WORD,
                    {expiresIn:'7d'}
                );
                res.json({
                    success:true,
                    message: 'Welcome',
                    token: token
                })
            }
        }
    })


    
})

///for Dev
router.get('/lookup', checkJwt, (req,res, next)=>{
    if (err) throw err
    let tokenInfo = req.decoded.user 
    res.json({
        token: tokenInfo
    })
})





module.exports = router