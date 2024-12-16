const db = require('../config/database');


const post = async(body)=>{

    let calculate_amount = (body.rate/1000)*body.numberOfBrick
    if (body.status == 'deduct_from_advance') {
        const [checkAdvance] = await db.query(
            `SELECT COALESCE(SUM(advanced_amount), 0) AS total_advance 
             FROM payments 
             WHERE labour_id = ? AND advanced_amount > 0`,
            [body.labourId]
        );
    
        if(checkAdvance[0].total_advance < calculate_amount){
            return 0
        }
        const [rows] = await db.query(
            `SELECT * FROM payments WHERE labour_id = ? AND advanced_amount > 0 ORDER BY id ASC`,
            [body.labourId]
        );
    
        let remainingAmount = parseFloat(calculate_amount); // Amount to deduct
    
        if (!rows.length) {
            throw new Error('No advance amount found to deduct from');
        }
    
        for (let row of rows) {
            if (remainingAmount <= 0) break; // Stop when deduction is complete
    
            const currentAdvance = parseFloat(row.advanced_amount);
            if (currentAdvance > 0) {
                const deduction = Math.min(currentAdvance, remainingAmount); // Deduct only what is available
                const updatedAdvance = currentAdvance - deduction;
    
                // Update the current row with the new advanced_amount
                await db.query(
                    'UPDATE payments SET advanced_amount = ? WHERE id = ?',
                    [updatedAdvance, row.id]
                );
    
                remainingAmount -= deduction; // Reduce the remaining amount to deduct
            }
        }
    
        // Throw an error if the deduction couldn't be completed
        if (remainingAmount > 0) {
            throw new Error('Insufficient total advance amount to deduct');
        }
    
        // Insert the payment record
        const [insertResult] = await db.query(
            'INSERT INTO payments (labour_id, work_date, payment_amount, status, advanced_amount, number_of_brick, payment_date, rate) VALUES (?,?,?,?,?,?,?,?)',
            [
                body.labourId,
                body.workDate,
                calculate_amount,
                body.status,
                0, // New row starts with 0 advanced_amount
                body.numberOfBrick,
                body.paymentDate,
                body.rate
            ]
        );
    
        return { id: insertResult.insertId, ...body };
    }
    
    const [rows] = await db.query(
        'INSERT INTO payments (labour_id, work_date, payment_amount, status, advanced_amount, number_of_brick, payment_date, rate) VALUES (?,?,?,?,?,?,?,?)',
        [body.labourId, body.workDate, calculate_amount, body.status, body.advancedAmount, body.numberOfBrick, body.paymentDate, body.rate]
    );
    
    return { id: rows.insertId, ...body };
   
    // if(body.status=='deduct_from_advance'){

    // }

    // return body
    // const [rows] = await db.query('INSERT INTO payments (labour_id,work_date,payment_amount,status,advanced_amount,number_of_brick,payment_date,rate) VALUES (?,?,?,?,?,?,?,?)', [body.labourId,body.workDate,calculate_amount,body.status,body.advancedAmount,body.numberOfBrick,body.paymentDate,body.rate]);
    //     return { id: rows.insertId, ...body };  
}

const fetch = async (order) => {
    const [rows] = await db.query(`
        SELECT payments.*, labours.*
        FROM payments
        INNER JOIN labours ON payments.labour_id = labours.labour_id ORDER BY id ${order}
    `);
    return rows;
};

const additionalCost = async(body)=>{
    const [rows] = await db.query('INSERT INTO additional_costs (description,cost_amount) VALUES (?,?)', [body.description,body.cost_amount]);
    return { id: rows.insertId, ...body };  
}


const additionalCostFetch = async (order) => {   
    const [rows] = await db.query(`SELECT * FROM additional_costs ORDER BY cost_id ${order}`);
    return rows;
};

const addtionalExpense = async(body)=>{
    const [rows] = await db.query('INSERT INTO additional_expenses (expense_name,amount,date,note) VALUES (?,?,?,?)', [body.expenseName,body.amount,body.date,body.note]);
    return { id: rows.insertId, ...body };  
}

const addtionalExpenseFetch = async (order) => {   
    const [rows] = await db.query(`SELECT * FROM additional_expenses ORDER BY id ${order}`);
    return rows;
};

const dieselPost = async(body)=>{
    const [rows] = await db.query('INSERT INTO diesel_expenses (diesel_qty,price_per_ltr,added_by,expense_date) VALUES (?,?,?,?)', [body.dieselQty,body.pricePerLtr,body.addedBy,body.expenseDate]);
    return { id: rows.insertId, ...body };  
}

const dieselFetch = async (order) => {   
    const [rows] = await db.query(`SELECT * FROM diesel_expenses ORDER BY id ${order}`);
    return rows;
};


module.exports = {post,fetch,additionalCost,additionalCostFetch,addtionalExpense,addtionalExpenseFetch,dieselPost,dieselFetch}