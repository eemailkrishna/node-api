const Joi = require('joi');
const moment = require('moment');

const RequestSchema = Joi.object({
    ownerName: Joi.string().required().messages({
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
   
    landArea: Joi.number().positive().required().messages({
        'number.base': 'land area must be a number',
        'number.positive': 'land area  must be a positive value',
        'any.required': 'land area  is a required field',
    }),
    
    totalPrice: Joi.number().optional(),
    paidAmount: Joi.number().optional(),
    pendingAmount: Joi.number().optional(),

});

const ResponseSchema = (res) => {
    if (!res || !res.created_at) {
        throw new Error('Invalid  data or missing created_at');
      }
    return {
      id:res.id,
      ownerName:res.owner_name,
      address:res.address,
      mobile:res.mobile,
      landArea:res.land_area, 
      totalPrice:res.total_price,
      paidAmount: res.paid_amount,
      pendingAmount: res.pending_amount,
      createdAt: moment(res.created_at).format('YYYY-MM-DD h:mm:ss A')

    };
  };


module.exports = {RequestSchema,ResponseSchema};
