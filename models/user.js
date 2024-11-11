const db = require('../config/database');
// const uploadFile = require("../middleware/upload");
const express = require('express');
const app = express();
const session = require('express-session');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));



const findAll = async () => {   
    const [rows] = await db.query('SELECT * FROM labours');

    return rows;
};

const findByEmail = async (email) => {
const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
return rows[0];
};

const create = async (name , email,password,phone ,address ,user_type,) =>{
    const [rows1]= await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if(rows1.length > 0){
       return '0';
    }
    else{
        const [rows] = await db.query('INSERT INTO users (name ,email, password ,phone ,address ,user_type) VALUES (?, ?, ? ,? ,?,?)', [name ,email, password ,phone ,address ,user_type]);
        return { id: rows.insertId, name, email };  
    }

}

const labour = async (name ,mobile ,address ,type,) =>{

    const [rows] = await db.query('INSERT INTO labours (name  ,mobile ,address ,type) VALUES (? ,? ,?,?)', [name ,mobile ,address ,type]);
        return { id: rows.insertId, name };  

}

const InsertAddress = async(address_name,AuthId)=>{
   return AuthId;
    const [rows] = await db.query('INSERT INTO address (address_name,user_id) VALUES (?,?)', [address_name, AuthId]);
    return { id: rows.insertId, address_name };  
}

const deleteUser = async (id)=> {
    
    const [rows1]= await db.query('SELECT * FROM users WHERE id = ?', [id]);
      
        if(rows1.length > 0){
            const [rows] = await db.query('DELETE FROM users WHERE id = ?', [id]);           
        }
        else{
            return '0';
        }
  }

  const fetchByID = async (id)=> {
    
    const [rows1]= await db.query('SELECT * FROM users WHERE id = ?', [id]);     
        if(rows1.length > 0){
            return rows1;           
        }
        else{
            return '0';
        }
  }

    const UpdateByID = async(id,data)=>{
        const { name, email, password } = data;
        const [rows1]= await db.query('SELECT * FROM users WHERE id = ?', [id]);    
        if(rows1.length > 0){
            const [data1] = await db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id]);
            return {name ,email,password};         
        }
        else{
            return '0';
        }
       
    }
    

    // const upload = async(req)=>{
    //     consl
    //     try {
    //         await uploadFile(req, res);
            
    //       } catch (err) {
    //         if (err.code == "LIMIT_FILE_SIZE") {
    //           return res.status(500).send({
    //             message: "File size cannot be larger than 2MB!",
    //           });
    //         }
    // }
// }


  

module.exports = {labour,findAll ,findByEmail,create,deleteUser ,fetchByID ,UpdateByID,InsertAddress}