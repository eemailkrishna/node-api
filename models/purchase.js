const db = require('../config/database');


const post = async(body)=>{
    const [rows] = await db.query('INSERT INTO material_purchases (material_name,quantity,supplier_name,purchase_cost,total_cost) VALUES (? ,? ,?,?,?)', [body.materialName,body.quantity,body.supplierName,body.purchaseCost,body.totalCost]);
        return { id: rows.insertId, ...body };  
}

const fetch = async (order) => {   
    const [rows] = await db.query(`SELECT * FROM material_purchases ORDER BY purchase_id ${order}`);
    return rows;
};

module.exports = {post,fetch}