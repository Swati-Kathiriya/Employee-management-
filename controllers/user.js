const User = require('../models/user')

exports.getAllUsers = async (req, res) => {
  try{
  const user = await User.find({});
  res.status(201).json({
    success:true,
    data:user,
    message:'Fetch users successfully'
  });
  } catch(err) {
    console.error(err),
    console.log(err),
    res.status(500)
    .json({
     success:true,
     data:"Internal server error",
     message:err.message
    })
  }
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  console.log({id})
  const user = await User.findById(id);
  res.json(user);
};

exports.replaceUser = async (req, res) => {
  const id = req.params.id;
  try{
  const user = await User.findOneAndReplace({_id:id},req.body,{new:true})
  res.status(201).json(user);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try{
  const user = await User.findOneAndUpdate({_id:id},req.body,{new:true})
  res.status(201).json(user);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try{
  const user = await User.findOneAndDelete({_id:id})
  res.status(201).json(user);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};

