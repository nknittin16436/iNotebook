const jwt = require('jsonwebtoken');
const JWT_SECRET = "HiIamNkNittin";

const fetchUser=(req,res,next)=>{

    // GET THE USER FROM jwt TOKEN AND ADD ID TO REQUEST BODY

    const token=req.header('auth-token');

    if(!token){
      return  res.status(401).send({error:"Please authenticate using a valid token"})
    }
  try {
      
      const data=jwt.verify(token,JWT_SECRET);
      req.user=data.user;
      // console.log(data);
      next();
  } catch (error) {
    res.status(401).send({error:"Please authenticate using a valid token"})
  }
}

module.exports=fetchUser