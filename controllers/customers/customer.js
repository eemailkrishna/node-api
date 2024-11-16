

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
        if (cache.data) {
            return res.status(200).json({
                success: true,
                status: 200,
                message: "Record fetched successfully",
                data: cache.data,
            });
        }
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
        cache.data = transformedData;
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



module.exports = {post,fetch}