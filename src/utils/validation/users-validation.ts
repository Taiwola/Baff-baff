import { IUser } from '@models/user.model'
import Joi from 'joi'

export const updateUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).optional().messages({
    'string.empty': 'first name is required',
    'string.min': 'first name must be at least 2 characters long',
    'string.max': 'first name cannot exceed 50 characters',
    'any.required': 'first name is required'
  }),
  lastName: Joi.string().min(2).max(50).optional().messages({
    'string.empty': 'last name is required',
    'string.min': 'last name must be at least 2 characters long',
    'string.max': 'last name cannot exceed 50 characters',
    'any.required': 'last name is required'
  }),

  email: Joi.string().email().optional().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address',
    'any.required': 'Email is required'
  }),

  role: Joi.string().valid('user', 'admin').optional().messages({
    'any.only': 'Role must be either user or admin',
    'any.required': 'Role is required'
  }),

  password: Joi.string()
    .min(6)
    .optional()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
      'any.required': 'Password is required'
    }),

  confirmPassword: Joi.string().valid(Joi.ref('password')).optional().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Please confirm your password'
  })
})

export const validateUpdateUser = (data: Partial<IUser>) => {
  return updateUserSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  })
}
