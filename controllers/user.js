const User = require('../models/user');
const validation = require('../helpers/validations');
const multer = require('multer');
const path = require('path');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const session = require('express-session');
const { secret } = require('../config/config');

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

 const getAll = async (req, res, next) => {
  const AuthId = session.AuthId;          
  try {
    const users = await User.findAll(AuthId);    
    if(users!=null){
      res.json(users);
    }
    else{
  res.send({'Message':'Record not found'});
    }
  } catch (err) {


    next(err);
  }
};



  const deleteUser = async (req, res, next) => {
    
    try {
      const users = await User.deleteUser(req.params.id);
     if(users=='0'){
      res.status(400).json({"messages":'Record not found','status':400});
     }
      res.status(200).json({"messages":'Record deleted','status':200,users});
    } catch (err) {
      next(err);
    }
  };

  const fetchByID = async (req, res, next) => {

    
    try {
      const users = await User.fetchByID(req.params.id);
     if(users=='0'){
      res.status(400).json({"messages":'Record not found','status':400});
     }
      res.status(200).json({"messages":'Record found','status':200,users});
    } catch (err) {
      next(err);
    }
  };

  const UpdateByID = async (req, res, next) => {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    const users1 = await validation.validate(req.body);
   if(users1.status=='400'){
     res.send(users1);
   }    
    try {
      const users = await User.UpdateByID(req.params.id, req.body);
     if(users=='0'){
      res.status(400).json({"messages":'Record not found','status':400});
     }
      res.status(200).json({"messages":'Record Updated','status':200,users});
    } catch (err) {
      next(err);
    }
  };

  


   const InsertAddress = async (req, res, next) => {

    const AuthId = session.AuthId;  
   
    try {
      const { address_name } = req.body; 
      const user = await User.InsertAddress(address_name,AuthId);    
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
  // const upload1 = async (req, res) => {
    
    // try {
      // await uploadFile(req, res);
    // const users = await User.upload(req,res);


  
    //   if (req.file == undefined) {
    //     return res.status(400).send({ message: "Please upload a file!" });
    //   }
  
    //   res.status(200).send({
    //     message: "Uploaded the file successfully: " + req.file.originalname,
    //   });
    // } catch (err) {
    //   res.status(500).send({
    //     message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    //   });
    // }
  // };
  

  module.exports = { UpdateByID,getAll ,deleteUser ,fetchByID , InsertAddress}