import Post from "../models/Post.js"
import User from "../models/User.js"

const createPost = async(req, res)=>{
  try {
    const {userId,description, picturePath } = req.body;
    const user = await User.findById(userId)
    const {firstName, lastName, location, userPicturePath} = user;
    const newPost = new Post({
      userId,
      firstName,
      lastName,
      location,
      description,
      userPicturePath,
      picturePath,
      likes:{},
      comments:[],
    })
    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({message:error.message})
  }
}

const getFeedPosts = async(req, res)=>{
  try {
    const post = await Post.find()
    // .sort({'createdAt': 'desc'});
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

const getUserPosts = async(req, res)=>{
  try {
    const {userId} = req.params;
    const post = await Post.find({userId});
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

const likePost = async(req, res)=>{
  try {
    const {id} =req.params;
    const { userId }  = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if(isLiked){
      post.likes.delete(userId);
    }else{
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(id, {likes: post.likes}, {new: true});

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log("er", error, {error: message})
    res.status(404).json({message: error.message});
  }
}
const addComment = async(req, res)=>{
  try {
    const { id } = req.params;
    const {userId, comment} = req.body;
    const post = await Post.findById(id);
    const iscommented = post.comments.has(userId);
    if(iscommented){
      post.comments.get(userId).push(comment);
    }else{
      post.comments.set(userId, comment);
    }
    const getComment = await Post.findByIdAndUpdate(id, {comment: post.comments}, {new: true});
    const allComments = [];
    for(let arr of getComment.comments){
      allComments.push(arr);
    }
    allComments = allComments.flat(Infinity);
    res.status(200).json(allComments);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}


const deleteComment = async(req, res)=>{
  try {
    const { id } = req.params;
    const {userId, comment} = req.body;
    const post = await Post.findById(id);
    const iscommented = post.comments.get(userId);
    if(iscommented.length == 1){
      post.comments.remove(userId)
    }else{
      post.comments.set(userId, iscommented.filter((cmt)=> cmt!==comment));
    }
    const getComment = await Post.findByIdAndUpdate(id, {comment: post.comments}, {new: true});
    const allComments = [];
    for(let arr of getComment.comments){
      allComments.push(arr);
    }
    allComments = allComments.flat(Infinity);
    res.status(200).json(allComments);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export {
  likePost,getUserPosts,getFeedPosts,createPost,addComment,deleteComment
}