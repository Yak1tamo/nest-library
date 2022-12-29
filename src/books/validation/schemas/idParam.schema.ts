import * as Joi from 'joi';

export const idSchema = Joi.object().keys({
  id: Joi.string().length(24).required(),
});
