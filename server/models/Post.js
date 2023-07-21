import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  userId:{
    type: String,
    required: true,
  },
  firstName:{
    type:String,
    required: true,
  },
  lastName:{
    type:String,
    required: true,
  },
  location: String,
  description: String,
  picturePath: String,
  userPicturePath: String,
  likes:{
    type: Map,
    of: Boolean,
  },
  // looking forward future update
  // comments:{
  //   type:Map,
  //   of:[],
  // }
  comments:{
    type: Array,
    default:[]
  }

}, 
{timestamps: true}
)

const Post = mongoose.model("post", PostSchema);
export default  Post;