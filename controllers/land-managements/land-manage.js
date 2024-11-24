

const Customer = require('../../models/land-manage')
const {ResponseSchema} = require('./schema');


const post = async(req,res,next)=>{
    try {
        const reqData = await Customer.post(req.body);  
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
      const data = await Customer.fetch(order);
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

const UpdateByID = async (req, res, next) => { 
    try {
      const users = await Customer.UpdateByID(req.params.id, req.body);
     if(users=='0'){
      res.status(400).json({"messages":'Record not found','status':400});
     }
      res.status(200).json({"messages":'Record Updated','status':200,...users});
    } catch (err) {
      next(err);
    }
  };

  



module.exports = {post,fetch,UpdateByID}