const Joi = require('joi');
const moment = require('moment');

const RequestSchema = Joi.object({
    labourId: Joi.string().required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is a required field',
    }),
    workDate: Joi.date().required().messages({
        'date.base': 'Work date must be a valid date',
        'any.required': 'Work date is a required field',
    }),
   
    paymentAmount: Joi.number().positive().required().messages({
        'number.base': 'Payment amount must be a number',
        'number.positive': 'Payment amount must be a positive value',
        'any.required': 'Payment amount is a required field',
    }),
    status: Joi.string().required().messages({
        'string.empty': 'Address is required',
        'any.required': 'Address is a required field',
    }),
    advancedAmount: Joi.string().optional(),
    numberOfBrick: Joi.string().optional(),
    paymentDate: Joi.string().optional(),

});






const ResponseSchema = (res) => {
    if (!res || !res.created_at) {
        throw new Error('Invalid  data or missing created_at');
      }
    return {
      paymentId:res.id,
      labourId:res.labour_id,
      name:res.name,
      mobile:res.mobile,
      type:res.type, 
      address:res.address,
      workDate: res.work_date,
      rate: res.rate,
      numberOfBrick: res.number_of_brick,
      paymentAmount: res.payment_amount,
      advancedAmount: res.advanced_amount,
      paymentDate: res.payment_date,
      
      paymentStatus: res.status,
      createdAt: moment(res.created_at).format('YYYY-MM-DD h:mm:ss A')


    };
  };


  const ResponseSchemaAdditional = (res) => {
    if (!res || !res.created_at) {
        throw new Error('Invalid  data or missing created_at');
      }
    return {
      cost_id:res.cost_id,
      description:res.description,
      costAmount:res.cost_amount,
      createdAt: moment(res.created_at).format('YYYY-MM-DD h:mm:ss A')
    };
  };


  const ResponseSchemaExpense = (res) => {
    if (!res || !res.created_at) {
        throw new Error('Invalid  data or missing created_at');
      }
    return {
      id:res.id,
      expenseName:res.expense_name,
      amount:res.amount,
      date:res.date,
      note:res.note,
      createdAt: moment(res.created_at).format('YYYY-MM-DD h:mm:ss A')
    };
  };


  const ResponseSchemaDiesel = (res) => {
    if (!res || !res.created_at) {
        throw new Error('Invalid  data or missing created_at');
      }
    return {
      id:res.id,
      dieselQty:res.diesel_qty,
      pricePerLtr:res.price_per_ltr,
      addedBy:res.added_by,
      expenseDate:res.expense_date,
      createdAt: moment(res.created_at).format('YYYY-MM-DD h:mm:ss A')
    };
  };

module.exports = {RequestSchema,ResponseSchema,ResponseSchemaAdditional,ResponseSchemaExpense,ResponseSchemaDiesel};
