import User from "../models/userSchema.js";
import Feedback from "../models/feedbackSchema.js";
import Course from "../models/courseSchema.js";
import bcryptjs from "bcryptjs";
const homePage = async (req, res) => {
  try {
    res.status(202).send("home page");
  } catch (error) {
    res.status(404).send({error});
  }
};
const regPage = async (req, res) => {
  try {
    const { email, password, phone, username } = req.body;
    
    // Check if email already exists
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }
    
    // Check if username already exists
    const usernameExist = await User.findOne({ username: username });
    if (usernameExist) {
      return res.status(400).json({ message: "Username already exists" });
    }
    
    const userCreated = await User.create({ email, password, phone, username });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: userCreated._id.toString(),
        email: userCreated.email,
        username: userCreated.username
      },
      token: await userCreated.generateToken(),
    });
  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: validationErrors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` 
      });
    }
    
    res.status(500).json({ 
      message: "Registration failed", 
      error: "Internal server error" 
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).send({ message: "invalid Credentions" });
    }
    // const isCorrectPassword =await bcryptjs.compare(password,userExist.password);
    const isCorrectPassword = await userExist.comparePassword(password);
    if (isCorrectPassword) {
      res.status(201).send({
        message: "logged In Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(400).send({ message: "invalid Credentions" });
    }
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};
const contact = async (req, res) => {
  try {
    const { email, message, username } = req.body;
    // const userExist = await User.findOne({ email: email });
    // if (!userExist) {
    //   return res.status(400).send({ message: "user not found Sign Up now" });
    // }
    const newMessage = await Feedback.create({ email, username, message });
    res.status(201).json({"hello ":"hello from contact , message sent",
    message: newMessage.message,
      userId: newMessage._id.toString(),
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
const user = async (req,res)=>{
  try {
    const user = req.user;
    return res.status(200).json({user});
  } catch (error) {
    res.status(400).json({ message:error });
  }
}
const courses = async(req,res)=>{
  try {
    const response = await Course.find({});
    if(!response){
      return res.status(400).send(`fetching courses error : ${error}`);
    }
    res.status(200).json( {data:response});
  } catch (error) {
    res.status(400).send(`fetching courses error :  ${error}`);
  }
}
const defcontroller = async(req,res)=>{
  try {
    res.status(200).send("hello from def controller");
  } catch (error) {
    res.status(400).send(`fetching courses error :  ${error}`);
  }
}

export { homePage, regPage, login, contact , user ,courses ,defcontroller };
