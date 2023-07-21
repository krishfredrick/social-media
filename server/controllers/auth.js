import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

/** REGISTER USER */
const register = async(req, res)=>{
  try {
    const {
      firstName, 
      lastName,
      email,
      picturePath,
      followers,
      location,
      occupation,
      password
    } = req.body;

    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName, 
      lastName,
      email,
      picturePath,
      followers,
      location,
      occupation,
      password: password_hash,
      viewedProfile: Math.floor(Math.random()*5000),
      impressions: Math.floor(Math.random()*1000),
    })
    
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const login = async (req, res)=>{
  try {
    const{ email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
      
      return res.status(400).json({msg: "user not exists"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if(!isMatch){
   
      return res.status(400).json({msg: "invalid validation"});
    } 
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({token, user});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



export  {
  register,
  login
}