const db = require('../config/database');


const post = async(body)=>{
    const [rows] = await db.query('INSERT INTO material_purchases (material_name,quantity,supplier_name,purchase_cost,total_cost,pending_amount) VALUES (? ,? ,?,?,?,?)', [body.materialName,body.quantity,body.supplierName,body.purchaseCost,body.totalCost,body.totalCost - body.purchaseCost]);
        return { id: rows.insertId, ...body };  
}

const fetch = async (order) => {   
    const [rows] = await db.query(`SELECT * FROM material_purchases ORDER BY purchase_id ${order}`);
    return rows;
};


const UpdateByID = async(id,data)=>{
    const [rows1]= await db.query('SELECT * FROM material_purchases WHERE purchase_id = ?', [id]);
    if(rows1.length > 0){
        const [data1] = await db.query('UPDATE material_purchases SET material_name = ?,supplier_name = ?,purchase_cost = ?,total_cost = ?, quantity = ?, pending_amount = ? WHERE purchase_id = ?', [data.materialName, data.supplierName,data.purchaseCost+data.pay_pending_amount,data.totalCost,data.quantity,(data.totalCost-data.purchaseCost-data.pay_pending_amount),id]);
        return {data};         
    }
    else{
        return '0';
    }
   
}

module.exports = {post,fetch,UpdateByID}