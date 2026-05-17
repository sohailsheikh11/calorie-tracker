import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

async function authMiddleware(req,res, next){

    try {

        const authHeader = req.headers.authorization;

    if(!authHeader){

        res.json({
            message: "no token provided"
        })
    }

   const token = authHeader.split(" ")[1];



  const decoded = await  jwt.verify(token, process.env.SECRET_KEY);

  console.log("this is decoded token", decoded);

  req.user = decoded;

    next();
        
    } catch (error) {

        res.status(401).json({
      message: "Invalid token"
    });
        
    }






}

export default authMiddleware;