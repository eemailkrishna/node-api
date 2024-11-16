const db = require('../config/database');

const post = async(body)=>{
    const [rows] = await db.query('INSERT INTO land_managements (owner_name,address,mobile,land_area,total_price,paid_amount,pending_amount) VALUES (? ,? ,?,?,?,?,?)', [body.ownerName,body.address,body.mobile,body.landArea,body.totalPrice,body.paidAmount,(body.totalPrice - body.paidAmount)]);
        return { id: rows.insertId, ...body };  
}

const fetch = async (order) => {   
    const [rows] = await db.query(`SELECT * FROM land_managements ORDER BY id ${order}`);
    return rows;
};

module.exports = {post,fetch}