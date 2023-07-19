import mongoose from "mongoose";

const UserSchema =  mongoose.Schema({
  firstName:{
    type: String,
    requried: true, 
    min: 2,
    max: 50,
  },
  lastName:{
    type: String,
    requried: true, 
    min: 2,
    max: 50,
  },
  email:{
    type: String,
    requried: true, 
    max: 100,
    unique: 50,
  },
  password:{
    type: String,
    requried: true, 
    min: 2,
    unique: 50,
  },
  picturePath:{
    type:String,
    default:"",
  },
  followers:{
    type: Array,
    default: []
  },
  location: String,
  occupation: String,
  viewedProfile: Number,
  impression: Number,
}, 
{timestamps: true}
);

const User = mongoose.model("User", UserSchema);
export default User;