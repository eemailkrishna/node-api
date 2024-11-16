

const Transport = require('../../models/transport')
const pickFields = require('../../helpers/helper');
const {ResponseSchema} = require('../transport/schema');


const post = async(req,res,next)=>{
 const transport = await Transport.post(req.body);  
 res.status(200).json(
    {
    success: true,
    status:200,
    message: "Transport created successfully",
    data: transport,
    }
 )
}

const fetch = async(req,res,next)=>{
   try {
      const data = await Transport.fetch();
      const transformedData = data.map(ResponseSchema);
      res.status(200).json(
         {
         success: true,
         status:200,
         message: "Transport fetch successfully",
         data: transformedData,
         }
      )
      
   } catch (error) {
      console.error(error);
   }

 
}


module.exports = {post,fetch}