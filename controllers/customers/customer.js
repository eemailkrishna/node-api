

const Customer = require('../../models/customer')
const {ResponseSchema} = require('./schema');
let cache = {
    data: null,
    timestamp: null,
};

const post = async(req,res,next)=>{
    cache = {
        data: null,
        timestamp: null,
    };
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


const fetch = async (req, res, next) => {
    try {
        const order = req.query.order === 'desc' ? 'DESC' : 'ASC';
        const data = await Customer.fetch(order);
        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "No records found",
            });
        }
        const transformedData = data.map(ResponseSchema);
        res.status(200).json({
            success: true,
            status: 200,
            message: "Record fetched successfully",
            data: transformedData,
        });
    } catch (error) {
        console.error("Error fetching records:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const fetchByMobile = async (req, res, next) => {
    try {
        const order = req.query.order === 'desc' ? 'DESC' : 'ASC';
        const mobile = req.params.mobile;
        if (!mobile) {
            return res.status(400).json({ error: 'Mobile number is required' });
        }
        const data = await Customer.fetchDataById(mobile,order);

        if (data.length === 0) {
            return res.status(404).json({ error: 'No records found for the provided mobile number' });
        }
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



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


module.exports = {post,fetch,UpdateByID,fetchByMobile}