import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as admin from 'firebase-admin';
import { Payment, PaymentDocument } from "./database/schemas/payment.schema";

Injectable()
export class AppService {
    constructor(
        @InjectModel(Payment.name)
        private readonly paymentModel: Model<PaymentDocument>
    ) {}

    async getPaymentsByUserId(uid: string) {
        const payments = await this.paymentModel.find({
            uid: uid
        })
        .sort({
            createdAt: 'desc'
        })
        .exec()
        return payments
    }
}