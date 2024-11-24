const Joi = require('joi');
const moment = require('moment');

const RequestSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is a required field',
    }),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.empty': 'mobile number is required',
        'string.pattern.base': 'Phone number must be 10 digits',
        'any.required': 'Phone is a required field',
    }),
    address: Joi.string().required().messages({
        'string.empty': 'Address is required',
        'any.required': 'Address is a required field',
    }),
    user_type: Joi.string().optional(),
});


const ResponseSchema = (res) => {
    if (!res || !res.created_at) {
        throw new Error('Invalid  data or missing created_at');
      }
    return {
      labour_id:res.labour_id,
      name: res.name,
      mobile: res.mobile,
      address: res.address,
      type:res.type,
      createdAt: moment(res.created_at).format('YYYY-MM-DD h:mm:ss A')

    };
  };

  const ProfileResponseSchema = (res) => {
    if (!res || !res.created_at) {
      throw new Error('Invalid data or missing created_at');
    }
    return {
      labour_id: res.labour_id,
      name: res.name,
      mobile: res.mobile,
      address: res.address,
      type: res.type,
      payment_amount: res.payment_amount || null,
      status: res.status || null,
      work_date: moment(res.work_date).format('YYYY-MM-DD'),
      payment_date: res.payment_date || null, 
      number_of_brick: res.number_of_brick || null,
      advanced_amount: res.advanced_amount || null, 
      createdAt: moment(res.created_at).format('YYYY-MM-DD h:mm:ss A'),
      updatedAt: res.updated_at ? moment(res.updated_at).format('YYYY-MM-DD h:mm:ss A') : null,
    };
  };
  



module.exports = {RequestSchema,ResponseSchema,ProfileResponseSchema};
