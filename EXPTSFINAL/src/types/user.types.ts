import Joi from 'joi';

export interface CreateUserInput {
  fullname: string;
  email: string;
  major_id: string;
}

export const userSchema = Joi.object<CreateUserInput>({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  major_id: Joi.string().required()
});
