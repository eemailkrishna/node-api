const db = require('../config/database');


const post = async(body)=>{
    const [rows] = await db.query('INSERT INTO transports (name,phone,address,transport_detail,payment_amount,pending_amount) VALUES (? ,? ,?,?,?,?)', [body.name,body.phone,body.address,body.transport_detail,body.payment_amount,body.pending_amount]);
        return { id: rows.insertId, ...body };  
}

const fetch = async (order) => {   
    const [rows] = await db.query(`SELECT * FROM transports ORDER BY transport_id ${order}`);

    return rows;
};

module.exports = {post,fetch}