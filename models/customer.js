const db = require('../config/database');

const post = async(body)=>{
    

    const total_amount = ((body.rate/2000)*body.total_brick_order)-body.discount*body.total_order_trolly
    const advanceAmount = ((body.rate/2000)*body.totalBrick)-body.discount*body.totalTrolly

   const  advanceAmount1 = parseFloat(body.totalPaidAmount) - parseFloat(advanceAmount)
   let advanceAmount2=0
   let pending_amount=0
   if(advanceAmount1==0){
    pending_amount=advanceAmount1
    advanceAmount2=advanceAmount1
   }
   if(advanceAmount1 >0){
    advanceAmount2=advanceAmount1

   }
   if(advanceAmount1<0){
    pending_amount= -(advanceAmount1)
   }

    
    const [rows] = await db.query('INSERT INTO customers (customer_name,address,mobile,total_brick_amount,total_paid_amount,pending_amount,advance_amount,total_trolly,total_brick,total_order_trolly,pending_trolly,discount,customer_type,rate,total_brick_order) VALUES (? ,? ,?,?,?,?,?,?,?,?,?,?,?,?,?)', [body.customerName,body.address,body.mobile,total_amount,body.totalPaidAmount,pending_amount,advanceAmount2,body.totalTrolly,body.totalBrick,body.total_order_trolly,body.total_order_trolly-body.totalTrolly,body.discount,body.customer_type,body.rate,body.total_brick_order]);
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
        const totalPendingAmount = rows1.reduce((sum, row) => sum + (parseFloat(row.pending_amount) || 0), 0);

        // Calculate Total Advanced Amount
        const totalAdvancedAmount = rows1.reduce((sum, row) => sum + (parseFloat(row.advance_amount) || 0), 0);
        
        // Calculate Payable Amount
        const payableAmount = totalPendingAmount - totalAdvancedAmount;
        
        // Construct Allover View Object
        const alloverView = {
            TotalPendingAmount: (totalPendingAmount-totalAdvancedAmount) >0 ?totalPendingAmount-totalAdvancedAmount:0 ,
            TotalAdvancedAmount: (totalAdvancedAmount-totalPendingAmount)>0 ?totalAdvancedAmount-totalPendingAmount:0,
            // PayableAmount: payableAmount
        };
        
        // Return Result
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
    if (rows1.length === 0) {
        return 0
    }
        let pending_amount=0
        let pending_trolly1=0
        let total_trolly1=0
        let total_paid_amount=0
        let advance_amount=0
        let totalBrick = parseFloat(body.totalBrick)+ parseFloat(rows1[0].total_brick)
         const advanceAmount = ((rows1[0].rate/2000)*totalBrick)- (rows1[0].discount * (rows1[0].total_trolly + body.send_pending_trolly))
        if(body.pay_pending_amount +rows1[0].total_paid_amount <= rows1[0].total_brick_amount){
            // pending_amount=rows1[0].pending_amount - body.pay_pending_amount
            total_paid_amount=parseFloat(rows1[0].total_paid_amount) + parseFloat(body.pay_pending_amount)
            pending_amount=parseFloat(advanceAmount) - (parseFloat(body.pay_pending_amount)+ parseFloat(rows1[0].total_paid_amount)) 
        }
        else{
            return 3
        }
        if(body.send_pending_trolly <= rows1[0].pending_trolly){
            pending_trolly1= parseFloat(rows1[0].pending_trolly) - parseFloat(body.send_pending_trolly);
            total_trolly1=parseFloat(rows1[0].total_trolly) + parseFloat(body.send_pending_trolly);

        }
        else{
            return 4
        }

        const total_amount = ((rows1[0].rate/2000)*body.totalBrick)-rows1[0].discount*body.send_pending_trolly
        if(body.pay_pending_amount ==0 && rows1[0].advance_amount>=total_amount ){
            advance_amount = parseFloat (rows1[0].advance_amount) - parseFloat( total_amount)
 

        }
        else{
            advance_amount = 0
            // pending_amount = -(parseFloat (rows1[0].advance_amount) - parseFloat( total_amount))
        }
    if(rows1.length > 0){
        const [data1] = await db.query('UPDATE customers SET customer_name = ?, address = ?,mobile = ?,total_paid_amount = ?, pending_amount = ?,advance_amount = ?,total_trolly = ?,total_brick = ?,pending_trolly = ? WHERE id = ?',
             [body.customerName,body.address,body.mobile,total_paid_amount,pending_amount,advance_amount,total_trolly1,totalBrick,pending_trolly1,id]);
        return {body};         
    }
    else{
        return '0';
    }
   
}
module.exports = {post,fetch,UpdateByID,fetchDataById}