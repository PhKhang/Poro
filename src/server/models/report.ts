import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto';

export interface ReportDocument extends Document {
    reportBody: string,
    accountID: string,
    resolve: boolean
}

const ReportSchema = new Schema(
    {
        accountID: {
            type: String,
            // require: true,
        },
        reportId: {
            type: 'UUID', 
            default: () => randomUUID()
        },
        reportBody: {
            type: String,
        },
    },
    // https://mongoosejs.com/docs/timestamps.html
    // Automatically add createdAt and updatedAt
    { timestamps: true }
);

export const ReportModel = model<ReportDocument>('Report', ReportSchema);