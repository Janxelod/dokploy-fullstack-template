import { registerAs } from '@nestjs/config';

export interface GeneralConfig {
  messagePrefix: string;
  frontendUrl: string;
  port: number;
}

export const generalConfig = registerAs(
  'general',
  (): GeneralConfig => ({
    messagePrefix: process.env.MESSAGE_PREFIX as string,
    frontendUrl: process.env.FRONTEND_URL as string,
    port: parseInt(process.env.PORT ?? '3000'),
  }),
);
