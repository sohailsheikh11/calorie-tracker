import User from "../model/authModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config()

export async function signup(req,res){

   try {

     const {name, email, password} = req.body;

     if (!email.includes("@")) {

  return res.status(400).json({
    message: "Invalid email"
  });

}

     if (!name || !email || !password) {

      return res.status(400).json({
        message: "All fields are required"
      });
    }

      if (password.length < 6) {

      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });

    }

    const existingUser = await User.findOne({email});

    if(existingUser){
        console.log("user already exists")
        res.json({
            message: "user already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

   const newUser = await User.create({

  name: name,

  email: email,

  password: hashedPassword

});

res.json({
    message: "user successfully created"
})
    
   } catch (error) {

    console.log(error.message)

    res.json({
        message: error.message
    })
    
   }





}

export async function login(req, res){


    try {

        
    const {email, password} = req.body;

    if(!email || !password){
        res.json({
            message: "username and password can not be empty"
        })
    }

    const user = await User.findOne({email});

    if(!user){
        res.json({
            message: "user not found"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch ){

        res.json({
            message: "wrong password"
        })
        
    }

    const token = jwt.sign({
        id: user._id,

    },
    process.env.SECRET_KEY,
    {
        expiresIn: "2d"
    }
)

res.json({
    token: token
})
        
    } catch (error) {

        console.log("this is the error" + error);

        res.json({
            message: error.message
        })
        
    }



}

export async function deleteUser(req,res){

    try {

        const {email} = req.body;

    const existingUser = await User.findOneAndDelete({email});

    res.json({
        message: "user successfully deleted" + existingUser.email
    })
        
    } catch (error) {

        res.json({
            message: error.message
        })
        
    }

    



}