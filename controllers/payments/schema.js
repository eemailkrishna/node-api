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
      paymentAmount: res.payment_amount,
      paymentStatus: res.status,
      createdAt: moment(res.created_at).format('YYYY-MM-DD :HH:mm:ss')

    };
  };


module.exports = {RequestSchema,ResponseSchema};
