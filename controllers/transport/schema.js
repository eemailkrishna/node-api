const Joi = require('joi');
const moment = require('moment');

const transportRequestSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is a required field',
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Phone number must be 10 digits',
        'any.required': 'Phone is a required field',
    }),
    address: Joi.string().required().messages({
        'string.empty': 'Address is required',
        'any.required': 'Address is a required field',
    }),
    transport_detail: Joi.string().optional(),
    payment_amount: Joi.number().positive().required().messages({
        'number.base': 'Payment amount must be a number',
        'number.positive': 'Payment amount must be a positive value',
        'any.required': 'Payment amount is a required field',
    }),
    pending_amount: Joi.number().positive().required().messages({
        'number.base': 'Pending amount must be a number',
        'number.positive': 'Pending amount must be a positive value',
        'any.required': 'Pending amount is a required field',
    }),
});


const ResponseSchema = (transport) => {
    if (!transport || !transport.created_at) {
        throw new Error('Invalid transport data or missing created_at');
      }
    return {
      transport_id:transport.transport_id,
      name: transport.name,
      phone: transport.phone,
      address: transport.address,
      transportDetail:transport.transport_detail,
      paymentAmount:transport.payment_amount,
      pendingAmount:transport.pending_amount,
      createdAt: moment(transport.created_at).format('YYYY-MM-DD :HH:mm:ss')

    };
  };


module.exports = {transportRequestSchema,ResponseSchema};
