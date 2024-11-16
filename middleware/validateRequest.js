const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorDetails = error.details.map((err) => err.message);
        return res.status(400).json({
            success: false,
            status: 400,
            message: 'Invalid request data',
            errors: errorDetails,
        });
    }
    next();
};

module.exports= validateRequest