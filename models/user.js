const db = require('../config/database');
// const uploadFile = require("../middleware/upload");
const express = require('express');
const app = express();
const session = require('express-session');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));



const findAll = async (order) => {   
    const [rows] = await db.query(`SELECT * FROM labours ORDER BY labour_id ${order}`);

    return rows;
};

const findByEmail = async (email) => {
const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
return rows[0];
};

const create = async (name , email,password,phone ,address ,user_type,) =>{
    const [rows1]= await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if(rows1.length > 0){
       return '0';
    }
    else{
        const [rows] = await db.query('INSERT INTO users (name ,email, password ,phone ,address ,user_type) VALUES (?, ?, ? ,? ,?,?)', [name ,email, password ,phone ,address ,user_type]);
        return { id: rows.insertId, name, email };  
    }

}

const labour = async (name ,mobile ,address ,type,) =>{

    const [rows] = await db.query('INSERT INTO labours (name  ,mobile ,address ,type) VALUES (? ,? ,?,?)', [name ,mobile ,address ,type]);
        return { id: rows.insertId, name };  

}

const InsertAddress = async(address_name,AuthId)=>{
   return AuthId;
    const [rows] = await db.query('INSERT INTO address (address_name,user_id) VALUES (?,?)', [address_name, AuthId]);
    return { id: rows.insertId, address_name };  
}

const deleteUser = async (id)=> {
    
    const [rows1]= await db.query('SELECT * FROM users WHERE id = ?', [id]);
      
        if(rows1.length > 0){
            const [rows] = await db.query('DELETE FROM users WHERE id = ?', [id]);           
        }
        else{
            return '0';
        }
  }

  const fetchByID = async (id, fromDate, toDate) => {
    try {
        let query = `
            SELECT l.labour_id,l.name,l.mobile,l.type,COALESCE(SUM(CASE 
            WHEN p.status IN ('success', 'deduct_from_advance') THEN p.payment_amount 
            ELSE 0 
                        END
                    ), 
                    0
                ) AS total_paid_amount,
                COALESCE(SUM(CASE WHEN p.status = 'pending' THEN p.payment_amount ELSE 0 END), 0) as total_pending_amount,
                COALESCE(SUM(p.advanced_amount), 0) as total_advanced_amount,
                COALESCE(COUNT(DISTINCT p.id), 0) as total_payments,
                COALESCE(SUM(p.payment_amount), 0) as total_amount,
                COALESCE(SUM(p.number_of_brick), 0) as total_bricks
            FROM 
                labours l
            LEFT JOIN 
                payments p ON l.labour_id = p.labour_id
            WHERE 
                l.labour_id = ?
        `;

        const params = [id];

        // Add date range filter if provided
        if (fromDate && toDate) {
            query += ` AND p.work_date BETWEEN ? AND ?`;
            params.push(fromDate, toDate);
        }
        query += ` GROUP BY l.labour_id, l.name, l.mobile, l.type`;
        const [rows] = await db.query(query, params);
        if (rows.length === 0) {
            return [{
                labour_id: id,
                name: null,
                mobile: null,
                type: null,
                total_paid_amount: 0,
                total_pending_amount: 0,
                total_advanced_amount: 0,
                total_payments: 0,
                total_amount: 0,
                total_bricks: 0
            }];
        }

        return rows;
    } catch (error) {
        console.error('Error fetching payment summary by ID:', error);
        throw error;
    }
};

    const UpdateByID = async(id,data)=>{
        const { name, email, password } = data;
        const [rows1]= await db.query('SELECT * FROM users WHERE id = ?', [id]);    
        if(rows1.length > 0){
            const [data1] = await db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id]);
            return {name ,email,password};         
        }
        else{
            return '0';
        }
       
    }
    

    // const upload = async(req)=>{
    //     consl
    //     try {
    //         await uploadFile(req, res);
            
    //       } catch (err) {
    //         if (err.code == "LIMIT_FILE_SIZE") {
    //           return res.status(500).send({
    //             message: "File size cannot be larger than 2MB!",
    //           });
    //         }
    // }
// }

const Summary = async (startDate, endDate) => {
    // Get current month's start and end date if no dates provided
    const today = new Date();
    const defaultStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const defaultEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Format dates to YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split('T')[0];
    
    // Use provided dates or defaults
    const start = startDate || formatDate(defaultStartDate);
    const end = endDate || formatDate(defaultEndDate);

    // Add date range to each query
    const [rows] = await db.query(`
        SELECT COUNT(*) AS total_labours 
        FROM labours 
        WHERE DATE(created_at) BETWEEN ? AND ?`, 
        [start, end]
    );

    const [transport] = await db.query(`
        SELECT 
            SUM(payment_amount) AS total_paid_amount, 
            SUM(pending_amount) AS total_pending_amount,
            (SUM(payment_amount) + SUM(pending_amount)) AS total_amount
        FROM transports
        WHERE DATE(created_at) BETWEEN ? AND ?`, 
        [start, end]
    );

    const [customer] = await db.query(`
        SELECT COUNT(*) AS total_customer 
        FROM customers
        WHERE DATE(created_at) BETWEEN ? AND ?`, 
        [start, end]
    );

    const [customers] = await db.query(`
        SELECT 
            SUM(total_paid_amount) AS total_paid_amount, 
            SUM(pending_amount) AS total_pending_amount,
            (SUM(total_paid_amount) + SUM(pending_amount)) AS total_amount
        FROM customers
        WHERE DATE(created_at) BETWEEN ? AND ?`, 
        [start, end]
    );

    const [expesense] = await db.query(`
        SELECT 
            SUM(diesel_qty * price_per_ltr) AS total_expense
        FROM diesel_expenses
        WHERE DATE(created_at) BETWEEN ? AND ?`, 
        [start, end]
    );

    const [additional_expense] = await db.query(`
        SELECT 
            SUM(amount) AS total_expense
        FROM additional_expenses
        WHERE DATE(created_at) BETWEEN ? AND ?`, 
        [start, end]
    );

    const [material] = await db.query(`
        SELECT 
            SUM(total_cost) AS total_paid_amount, 
            SUM(pending_amount) AS total_pending_amount,
            (SUM(total_cost) + SUM(pending_amount)) AS total_amount
        FROM material_purchases
        WHERE DATE(created_at) BETWEEN ? AND ?`, 
        [start, end]
    );

    const [land] = await db.query(`
        SELECT 
            SUM(paid_amount) AS total_paid_amount, 
            SUM(pending_amount) AS total_pending_amount,
            (SUM(paid_amount) + SUM(pending_amount)) AS total_amount
        FROM land_managements
        WHERE DATE(created_at) BETWEEN ? AND ?`, 
        [start, end]
    );

    const totalLabour = rows[0]?.total_labours || 0;

    const [paymentRows] = await db.query(`
        SELECT 
            SUM(CASE WHEN status = 'success' THEN payment_amount ELSE 0 END) AS paid_amount,
            SUM(CASE WHEN status = 'pending' THEN payment_amount ELSE 0 END) AS pending_amount,
            SUM(CASE WHEN status IN ('pending', 'success') THEN payment_amount ELSE 0 END) AS total_amount
        FROM payments
        WHERE DATE(created_at) BETWEEN ? AND ?`, 
        [start, end]
    );

    const paymentData = paymentRows[0] || { paid_amount: 0, pending_amount: 0, total_amount: 0 };

    return {
        labour: {
            total_amount: paymentData.total_amount || 0,
            paid_amount: paymentData.paid_amount || 0,
            pending_amount: paymentData.pending_amount || 0,
            total_labour: totalLabour
        },
        transport: {
            ...transport[0]
        },
        landing: {
            ...land[0]
        },
        costomer: {
            ...customer[0],
            ...customers[0]
        },
        material: {
            ...material[0]
        },
        expesense: {
            ...expesense[0]
        },
        addtionalExpense: {
            ...additional_expense[0]
        }
    };
};


  

module.exports = {labour,findAll ,findByEmail,create,deleteUser ,fetchByID ,UpdateByID,InsertAddress,Summary}