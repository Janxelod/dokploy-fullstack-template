import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { json } from 'express';
import { ConfigService } from '@nestjs/config';
import { GeneralConfig } from './config/general.config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/message/:name')
  async getMessage(@Param('name') name: string): Promise<string | null> {
    const prefix =
      this.configService.get<GeneralConfig>('general')?.messagePrefix;

    return `${prefix} ${name}`;
  }
}
