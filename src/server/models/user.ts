import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto';

export interface UserDocument extends Document {
    email: string,
    password: string,
}

const UserSchema = new Schema(
    {
        id: {
            type: String,
            default: () => randomUUID().toString()
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        image: {
            type: String
        },
        name: {
            type: String
        },
        role: {
            type: String,
            default: 'User'
        }
    },
    { timestamps: true }
);

export const UserModel = model<UserDocument>('User', UserSchema, 'User');