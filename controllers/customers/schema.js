const Joi = require('joi');
const moment = require('moment');

const RequestSchema = Joi.object({
    customerName: Joi.string().required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is a required field',
    }),
    address: Joi.string().required().messages({
        'string.empty': 'Address is required',
        'any.required': 'Address is a required field',
    }),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.empty': 'Mobile number is required',
        'string.pattern.base': 'Mobile number must be 10 digits',
        'any.required': 'Mobile is a required field',
    }),
   
    totalBrickAmount: Joi.number().positive().required().messages({
        'number.base': 'Total brick amount must be a number',
        'number.positive': 'Total brick amount must be a positive value',
        'any.required': 'Total brick amount is a required field',
    }),
    
    totalPaidAmount: Joi.number().optional(),
    advanceAmount: Joi.number().optional(),

    totalTrolly: Joi.number().positive().required().messages({
        'number.base': 'Total brick amount must be a number',
        'number.positive': 'Total brick amount must be a positive value',
        'any.required': 'Total brick amount is a required field',
    }),
    totalBrick: Joi.number().positive().required().messages({
        'number.base': 'Total brick amount must be a number',
        'number.positive': 'Total brick amount must be a positive value',
        'any.required': 'Total brick amount is a required field',
    }),

});

const ResponseSchema = (res) => {
    if (!res || !res.created_at) {
        throw new Error('Invalid  data or missing created_at');
      }
    return {
      customer_id:res.id,
      customerName:res.customer_name,
      address:res.address,
      mobile:res.mobile,
      totalBrickAmount:res.total_brick_amount, 
      totalPaidAmount:res.total_paid_amount,
      pendingAmount: -(res.pending_amount <0 ? res.pending_amount :0),
      totalOrderTrolly: res.total_order_trolly,
      totalTrolly: res.total_trolly,
      totalPendingTrolly: res.pending_trolly,
      advanceAmount:res.pending_amount >0 ? res.pending_amount :0,
      totalBrick: res.total_brick,
      totalBrickOrder: res.total_brick_order,
      createdAt: moment(res.created_at).format('YYYY-MM-DD h:mm:ss A')

    };
  };


  const ResponseSchema1 = (res) => {
    if (!res || !res.created_at) {
        throw new Error('Invalid  data or missing created_at');
      }
    return {
      customer_id:res.id,
      customerName:res.customer_name,
      address:res.address,
      mobile:res.mobile,
      totalBrickAmount:res.total_brick_amount, 
      totalPaidAmount:res.total_paid_amount,
      pendingAmount: -(res.pending_amount <0 ? res.pending_amount :0),
      totalOrderTrolly: res.total_order_trolly,
      totalTrolly: res.total_trolly,
      totalPendingTrolly: res.pending_trolly,
      advanceAmount:res.pending_amount >0 ? res.pending_amount :0,
      totalBrick: res.total_brick,
      totalBrickOrder: res.total_brick_order,
      createdAt: moment(res.created_at).format('YYYY-MM-DD h:mm:ss A')

    };
  };


module.exports = {RequestSchema,ResponseSchema};
