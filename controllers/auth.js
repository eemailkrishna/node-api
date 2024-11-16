const bcrypt = require('bcrypt');
const { sign } = require('../config/jwt');
const User = require('../models/user');
const session = require('express-session');
const express = require('express');
const app = express();
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if(user){
        const token = sign({ id: user.user });
       var AuthId = user.id;        
        session.AuthId = AuthId.toString();
        const kkk = session.AuthId;
    }
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid email or password' });
    const token = sign({ id: user.id });
    const responseData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return res.status(200).json({
      success: true,
      status:200,
      message: "Login successful",
      data: responseData,
      token,
    });
  } catch (err) {
    next(err);
  }
};


const register = async (req, res, next) => {

    try {
      const { name ,email, password ,phone ,address ,user_type } = req.body; 

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create(name ,email, hashedPassword ,phone ,address ,user_type);    
      if(user==0){
        
      res.status(400).json({ 'message':'Email Already Exists','status':400});
      }       
    
      if(user){
      res.status(201).json({ 'message':'Recored created','status':201,data:user});
      }
      if (!user) return res.status(401).json({ error: 'Invalid email or password' });
      const match = await bcrypt.compare(password, user.password);
     
      if (!match) return res.status(401).json({ error: 'Invalid email or password' });
      const token = sign({ id: user.id });
      res.json({ token });
    } catch (err) {
      next(err);
    }
  };

  module.exports ={login,register}