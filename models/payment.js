const db = require('../config/database');


const post = async(body)=>{

    let calculate_amount = (body.rate/1000)*body.numberOfBrick
   
    const [rows] = await db.query('INSERT INTO payments (labour_id,work_date,payment_amount,status,advanced_amount,number_of_brick,payment_date,rate) VALUES (?,?,?,?,?,?,?,?)', [body.labourId,body.workDate,calculate_amount,body.status,body.advancedAmount,body.numberOfBrick,body.paymentDate,body.rate]);
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