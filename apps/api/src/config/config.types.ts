import * as Joi from 'joi';
import { GeneralConfig } from './general.config';

export interface ConfigType {
  general: GeneralConfig;
}

export const appConfigSchema = Joi.object({
  MESSAGE_PREFIX: Joi.string().required(),
  FRONTEND_URL: Joi.string().required(),
  PORT: Joi.number().required(),
});
