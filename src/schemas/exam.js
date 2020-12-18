const Joi = require('joi');

const exam = Joi.object({
    year: Joi.string().pattern(new RegExp('/[0-9]{4}/')).required(),
    periodId: Joi.number().required(),
    subjectId: Joi.number().required(),
    professorId: Joi.number().required(),
    URL: Joi.string().uri().required(),
})

module.exports = {exam}