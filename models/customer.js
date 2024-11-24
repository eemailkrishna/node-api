const db = require('../config/database');

const post = async(body)=>{
    const [rows] = await db.query('INSERT INTO customers (customer_name,address,mobile,total_brick_amount,total_paid_amount,pending_amount,advance_amount,total_trolly,total_brick) VALUES (? ,? ,?,?,?,?,?,?,?)', [body.customerName,body.address,body.mobile,body.totalBrickAmount,body.totalPaidAmount,(body.totalBrickAmount - body.totalPaidAmount),body.advanceAmount,body.totalTrolly,body.totalBrick]);
        return { id: rows.insertId, ...body };  
}

const fetch = async (order) => {   
    const [rows] = await db.query(`SELECT * FROM customers ORDER BY id ${order}`);
    return rows;
};


const UpdateByID = async(id,body)=>{
    const [rows1]= await db.query('SELECT * FROM customers WHERE id = ?', [id]);
    if(rows1.length > 0){
        const [data1] = await db.query('UPDATE customers SET customer_name = ?, address = ?,mobile = ?,total_brick_amount = ?,total_paid_amount = ?, pending_amount = ?,advance_amount = ?,total_trolly = ?,total_brick = ? WHERE id = ?', [body.customerName,body.address,body.mobile,body.totalBrickAmount,body.totalPaidAmount,(body.totalBrickAmount - body.totalPaidAmount),body.advanceAmount,body.totalTrolly,body.totalBrick,id]);
        return {body};         
    }
    else{
        return '0';
    }
   
}
module.exports = {post,fetch,UpdateByID}