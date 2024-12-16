

const Payment = require('../../models/payment')
const {ResponseSchema,ResponseSchemaAdditional,ResponseSchemaExpense,ResponseSchemaDiesel} = require('./schema');


const post = async(req,res,next)=>{
    try {  
        const reqData = await Payment.post(req.body);  
        if(reqData==0){
         res.status(200).json(
            {
            success: true,
            status:200,
            message: "Amount is greater then advanced amount",
            }
         )
        }
        else{
         res.status(200).json(
            {
            success: true,
            status:200,
            message: "Created successfully",
            data: reqData,
            }
         )
        }
        
     
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

const additionalCost = async(req,res,next)=>{
    const postData = await Payment.additionalCost(req.body);
    res.status(200).json(
        {
        success: true,
        status:200,
        message: "Created successfully",
        data: postData,
        }
     )
}

const additionalCostFetch = async(req,res,next)=>{
    try {
       const order = req.query.order === 'desc' ? 'DESC' : 'ASC';
       const data = await Payment.additionalCostFetch(order);
       const transformedData = data.map(ResponseSchemaAdditional);
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

 const addtionalExpense = async(req,res,next)=>{
    const postData = await Payment.addtionalExpense(req.body);
    res.status(200).json(
        {
        success: true,
        status:200,
        message: "Created successfully",
        data: postData,
        }
     )
 }

 const addtionalExpenseFetch = async(req,res,next)=>{
    try {
        const order = req.query.order === 'desc' ? 'DESC' : 'ASC';
        const data = await Payment.addtionalExpenseFetch(order);
        const transformedData = data.map(ResponseSchemaExpense);
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

 const dieselPost = async(req,res,next)=>{
    const postData = await Payment.dieselPost(req.body);
    res.status(200).json(
        {
        success: true,
        status:200,
        message: "Created successfully",
        data: postData,
        }
     )
 }

 const dieselFetch = async(req,res,next)=>{
    try {
        const order = req.query.order === 'desc' ? 'DESC' : 'ASC';
        const data = await Payment.dieselFetch(order);
        const transformedData = data.map(ResponseSchemaDiesel);
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

module.exports = {post,fetch,additionalCost,additionalCostFetch,addtionalExpense,addtionalExpenseFetch,dieselPost,dieselFetch}