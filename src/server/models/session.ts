import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto';

export interface SessionDocument extends Document {
    accountID: string,
    totalTime: number,
}

const SessionSchema = new Schema(
    {
        sessionId: {
            type: String, 
            default: () => randomUUID().toString()
        },
        accountID: {
            type: String,
            // require: true,
        },
        totalTime: {
            type: Number,
        },
    },
    // https://mongoosejs.com/docs/timestamps.html
    // Automatically add createdAt and updatedAt
    { timestamps: true }
);

export const SessionModel = model<SessionDocument>('Session', SessionSchema);