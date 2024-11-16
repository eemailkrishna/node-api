const db = require('../config/database');

const post = async(body)=>{
    const [rows] = await db.query('INSERT INTO customers (customer_name,address,mobile,total_brick_amount,total_paid_amount,pending_amount,total_trolly,total_brick) VALUES (? ,? ,?,?,?,?,?,?)', [body.customerName,body.address,body.mobile,body.totalBrickAmount,body.totalPaidAmount,(body.totalBrickAmount - body.totalPaidAmount),body.totalTrolly,body.totalBrick]);
        return { id: rows.insertId, ...body };  
}

const fetch = async (order) => {   
    const [rows] = await db.query(`SELECT * FROM customers ORDER BY id ${order}`);
    return rows;
};

module.exports = {post,fetch}