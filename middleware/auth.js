const jwt = require('jsonwebtoken')
const User= require('../models/user')




const auth= async(req,res, next)=>{

    
    
    try{
        
        const authHeader= (req.headers.cookie).split('=')
        const token= authHeader[1]
        
        
        //const token = req.header('Authorization:').replace(' Bearer ','')
         const decoded =await jwt.verify(token, 'thisismynewcourse')
         
         const user = await User.findOne({ _id: decoded._id, 'tokens.token':token })
        



         if(!user){
             throw new Error()
         }
         req.user = user
         next()
    }catch(e){
        res.clearCookie('auth')
        res.redirect(`/posts/login?destination=${req.url}`)
    }
    
}

module.exports = auth