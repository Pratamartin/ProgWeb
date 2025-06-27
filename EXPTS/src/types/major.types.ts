import Joi from 'joi';

export interface CreateMajorInput {
  name: string;
  code: string;
  description: string;
}

export const majorSchema = Joi.object<CreateMajorInput>({
  name: Joi.string().min(2).required(),
  code: Joi.string().length(4).required(),
  description: Joi.string().min(5).required(),

});
