

const Payment = require('../../models/purchase')
const {ResponseSchema} = require('./schema');


const post = async(req,res,next)=>{
    try {
        const reqData = await Payment.post(req.body);  
        res.status(200).json(
           {
           success: true,
           status:200,
           message: "Created successfully",
           data: reqData,
           }
        )
      
        
    } catch (error) {
        console.log(error)
    }
}


const fetch = async(req,res,next)=>{
   try {
      const order = req.query.order === 'desc' ? 'DESC' : 'ASC';
      const data = await Payment.fetch(order);
      const transformedData = data.map(ResponseSchema);
      res.status(200).json(
         {
         success: true,
         status:200,
         message: "Record fetch successfully",
         data: transformedData,
         }
      )
      
   } catch (error) {
      console.error(error);
   }

 
}


module.exports = {post,fetch}