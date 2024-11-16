

const Customer = require('../../models/customer')
const {ResponseSchema} = require('./schema');
const redisClient = require("../../redis");
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
        const cacheKey = `customers:${order}`; // Unique key based on query parameters

        // Check Redis for cached data
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return res.status(200).json({
                success: true,
                status: 200,
                message: "Record fetched successfully (cached)",
                data: JSON.parse(cachedData),
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
        await redisClient.set(cacheKey, JSON.stringify(transformedData), {
            EX: 3600, // Cache expiry in seconds (1 hour)
        });
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