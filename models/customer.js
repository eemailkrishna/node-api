const db = require('../config/database');

const post = async(body)=>{
    const total_amount = ((body.rate/2000)*body.totalBrick)-body.discount*body.totalTrolly

    const [rows] = await db.query('INSERT INTO customers (customer_name,address,mobile,total_brick_amount,total_paid_amount,pending_amount,advance_amount,total_trolly,total_brick,total_order_trolly,pending_trolly,discount,customer_type,rate) VALUES (? ,? ,?,?,?,?,?,?,?,?,?,?,?,?)', [body.customerName,body.address,body.mobile,body.totalBrickAmount,total_amount,(total_amount - body.totalPaidAmount),body.advanceAmount,body.totalTrolly,body.totalBrick,body.total_order_trolly,body.total_order_trolly-body.totalTrolly,body.discount,body.customer_type,body.rate]);
        return { id: rows.insertId, ...body };  
}

const fetch = async (order) => {   
    const [rows] = await db.query(`SELECT * FROM customers  GROUP BY mobile  ORDER BY id ${order}`);
    return rows;
};

const fetchDataById = async (id, sortOrder = 'ASC') => {
    if (sortOrder !== 'ASC' && sortOrder !== 'DESC') {
        throw new Error('Invalid sort order. It must be "ASC" or "DESC".');
    }

    try {
        const [rows1] = await db.query(
            `SELECT * FROM customers WHERE mobile = ? ORDER BY id ${sortOrder}`,
            [id]
        );
        const totalPendingAmount = rows1.reduce((sum, row) => sum + parseFloat(row.pending_amount), 0);
        const totalAdvancedAmount = rows1.reduce((sum, row) => sum + parseFloat(row.advance_amount), 0);
        const payableAmount = totalPendingAmount ??0 - totalAdvancedAmount??0;
        
        const alloverView = {
            TotalPendingAmount: totalPendingAmount,
            TotalAdvancedAmount: totalAdvancedAmount,
            PayableAmount: payableAmount

        };
        return {
            data: rows1,
            alloverView
        };

    } catch (error) {
        console.error('Database query error:', error);
        throw new Error('Unable to fetch data.');
    }
};


const UpdateByID = async(id,body)=>{
    const [rows1]= await db.query('SELECT * FROM customers WHERE id = ?', [id]);
    if(rows1.length > 0){
        const [data1] = await db.query('UPDATE customers SET customer_name = ?, address = ?,mobile = ?,total_brick_amount = ?,total_paid_amount = ?, pending_amount = ?,advance_amount = ?,total_trolly = ?,total_brick = ?,pending_trolly = ? WHERE id = ?', [body.customerName,body.address,body.mobile,body.totalBrickAmount,body.totalPaidAmount+body.pay_pending_amount,body.totalBrickAmount - body.totalPaidAmount-body.pay_pending_amount,body.advanceAmount,body.totalTrolly+body.send_pending_trolly,body.totalBrick,body.pending_trolly-body.send_pending_trolly,id]);
        return {body};         
    }
    else{
        return '0';
    }
   
}
module.exports = {post,fetch,UpdateByID,fetchDataById}