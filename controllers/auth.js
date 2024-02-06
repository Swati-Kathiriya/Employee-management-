const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretkey = `sw$36dyt`;

// Register a new user  
exports.signUp = async (req, res) => {

  try {
    // Get user input    
    const { name, email, password } = req.body;

    // Validate 
    if(!name || !email || !password) {
      return res.status(400).json({msg: 'All fields are required'});
    }
    
    if(!name) {  
      return res.status(400).json({msg: 'Invalid name'});
    }

    if(!email) {
      return res.status(400).json({msg: 'Invalid email'});   
    }

    if(!password) {
      return res.status(400).json({msg: 'Invalid Password'});
    }

    // Check existing user
    const userExists = await User.findOne({email});

    if(userExists) {
      return res.status(400).json({
        success:false,
        msg: 'Email already in use'});
    }

    // Hash password 
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error in hashing password",
        })
    }

    // Create User
    let user = await User.create({
      name,email,password:hashedPassword
    });
    await user.save();
    console.log("saved user", user);

    return res.status(200).json({
      success : true,
      message : "User Created Successfully",
      data : user
    });
  // const User = token.save();
  } 
  catch(err) {
    console.log(err);
    return res.status(500).json({
      success:false,
      error: 'Server error'
    });
  }
} 

// Login
exports.login = async (req,res) => {
  try
  {
      const {email,password} = req.body;
      if(!email || !password)
      {
          return res.status(400).json({
              success:false,
              message : "Please fill all the details carefully",
          })
      }

      // check for register user 
      let user = await User.findOne({email} ,{ projection: { _id: 0 } })
      if(!user)
      {
          return res.status(401).json({
              success : false,
              message : "User does not exist",
          });
      }

      // Verify password & generate a JWT token

      const payload = {
          email : user.email,
          id : user._id,
          role : user.role,
      };
      console.log(user)
      if(await bcrypt.compare(password,user.password)){
        // password match
        let token = jwt.sign(payload,secretkey);
        
        console.log(token)
          user = user.toObject();
          user.token = token;
          user.password = undefined;

          res.cookie("token",token).status(200).json({
              success : true,
              token,
              user,
              message:"User logged in successfully"
          });
        }
      else {
          // password not match
          return res.status(403).json({
              success : false,
              message : "Password does not match",
          })
      }
  }
  catch(err){
      console.error(err)
      return res.status(500).json({
          success : false,
          message : "Login false" 
      })
  }
}