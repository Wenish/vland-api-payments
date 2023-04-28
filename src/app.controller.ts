import { Body, Controller, Get, Headers, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { BearerGuard } from './guards/bearer.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FirebaseUser, User } from './decorators/user.decorator';
import { ConfigService } from "@nestjs/config";
import * as admin from 'firebase-admin';
import { Payment } from './database/schemas/payment.schema';

@Controller()
export class AppController {

  constructor(
    private readonly configService: ConfigService,
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    return '<h1>vland api payments</h1><p>running...</p><p><a href="/api">Swagger Docs</a>';
  }

  @Get('/users/me/payments')
  @UseGuards(BearerGuard)
  @ApiBearerAuth('Bearer Authentication')
  async getUserByIdPayments(@User() user: FirebaseUser)
  {
    const payments = await this.appService.getPaymentsByUserId(user.uid)
    return payments as Payment[]
  }
}

