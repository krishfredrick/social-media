import User from '../models/User.js';

const getUsers = async (req,res)=>{
  try {
    const {id} = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}


const getUserFollower = async()=>{
  try {
    const {id} = req.params;
    const user = await User.findById(id);
    const followers = await Promise.all(
      user.followes.map((id)=>User.findById(id))
    );
    console.log(followers);
    
    const collection_of_followers = followers.map((follower)=>({...follower}))
    res.status(200).json(collection_of_followers);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}


const addRemoveFollower = async(req, res)=>{
  try {
    const {id, followerId} = req.params;
    const user = await User.findById(id);
    const follower = await User.findById(followerId);

    if(user.follower.includes(followerId)){
      user.follower = user.followers.filter((id)=> id !== followerId);
      follower.follower = user.followers.filter (id=> id!==id);
    }else{
      user.followers.push(followerId)
      follower.followers.push(id);
    }
    await user.save();
    await follower.save();
    const followers = await Promise.all(
      user.followers.map((id)=>User.findById(id))
    );
    const collection_of_followers = followers.map((follower)=>({...follower}))
    res.status(200).json(collection_of_followers);

  } catch (error) {
      res.status(404).json({message: error.message});
  }
}



export  {
  getUsers,
  getUserFollower,
  addRemoveFollower,
};