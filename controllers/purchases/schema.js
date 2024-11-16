const Joi = require('joi');
const moment = require('moment');


const RequestSchema = Joi.object({
    materialName: Joi.string().required().messages({
        'string.empty': 'Material name is required',
        'any.required': 'Material name is a required field',
    }),
    supplierName: Joi.string().required().messages({
        'string.empty': 'Supplier name is required',
        'any.required': 'Supplier name is a required field',
    }),

    purchaseCost: Joi.number().positive().required().messages({
        'number.base': 'Purchase cost must be a number',
        'number.positive': 'Purchase cost must be a positive value',
        'any.required': 'Purchase cost is a required field',
    }),
    totalCost: Joi.number().positive().required().messages({
        'number.base': 'Total cost must be a number',
        'number.positive': 'Total cost must be a positive value',
        'any.required': 'Total cost is a required field',
    }),
    quantity: Joi.number().positive().required().messages({
        'number.base': 'Quantity  must be a number',
        'number.positive': 'Quantity  must be a positive value',
        'any.required': 'Quantity  is a required field',
    }),

});






const ResponseSchema = (res) => {
    if (!res || !res.created_at) {
        throw new Error('Invalid  data or missing created_at');
      }

    return {
      materialId:res.material_id,
      materialName:res.material_name,
      supplierName:res.supplier_name,
      quantity:res.quantity,
      purchaseCost:res.purchase_cost, 
      totalCost:res.total_cost,
      createdAt: moment(res.created_at).format('YYYY-MM-DD :HH:mm:ss')

    };
  };


module.exports = {RequestSchema,ResponseSchema};
