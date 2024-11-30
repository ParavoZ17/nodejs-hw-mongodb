import Joi from 'joi';
import { contactType } from '../constants/constants.js';

export const contactsAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(13).max(14).required(),
  email: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({ 'any.required': 'Вкажіть електронну пошту' }),
  contactType: Joi.string().valid(...contactType),
  isFavourite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(13).max(14),
  email: Joi.string().min(3).max(20),
  contactType: Joi.string().valid(...contactType),
  isFavourite: Joi.boolean(),
});
