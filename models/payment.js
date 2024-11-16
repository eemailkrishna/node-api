const db = require('../config/database');


const post = async(body)=>{
    const [rows] = await db.query('INSERT INTO payments (labour_id,work_date,payment_amount,status) VALUES (?,?,?,?)', [body.labourId,body.workDate,body.paymentAmount,body.status]);
        return { id: rows.insertId, ...body };  
}

const fetch = async (order) => {
    const [rows] = await db.query(`
        SELECT payments.*, labours.*
        FROM payments
        INNER JOIN labours ON payments.labour_id = labours.labour_id ORDER BY id ${order}
    `);
    return rows;
};

module.exports = {post,fetch}