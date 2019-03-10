const jwt =require('jsonwebtoken')


module.exports = function(req,res, next){
    let token = req.headers['authorization']
    if (token) {
        jwt.verify(token, process.env.SECRET_WORD, function (err,decoded)  {
            if (err) {
                res.json({
                    success: false,
                    message:'failed  authorization'
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        res.status(401).json({
            success: false,
            message:'no token provided'
        })
    }

}