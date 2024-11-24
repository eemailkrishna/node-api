const db = require('../config/database');

const post = async(body)=>{
    const [rows] = await db.query('INSERT INTO land_managements (owner_name,address,mobile,land_area,total_price,paid_amount,pending_amount) VALUES (? ,? ,?,?,?,?,?)', [body.ownerName,body.address,body.mobile,body.landArea,body.totalPrice,body.paidAmount,(body.totalPrice - body.paidAmount)]);
        return { id: rows.insertId, ...body };  
}

const fetch = async (order) => {   
    const [rows] = await db.query(`SELECT * FROM land_managements ORDER BY id ${order}`);
    return rows;
};



const UpdateByID = async(id,data)=>{
    const [rows1]= await db.query('SELECT * FROM land_managements WHERE id = ?', [id]);
    if(rows1.length > 0){
        const [data1] = await db.query('UPDATE land_managements SET owner_name = ?, mobile = ?,land_area = ?,total_price = ?,paid_amount = ?, address = ?,pending_amount = ? WHERE id = ?', [data.ownerName, data.mobile,data.landArea,data.totalPrice,data.paidAmount,data.address,(data.totalPrice-data.paidAmount),id]);
        return {data};         
    }
    else{
        return '0';
    }
   
}

module.exports = {post,fetch,UpdateByID}