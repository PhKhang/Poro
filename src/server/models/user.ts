import { Schema, model } from 'mongoose'

export interface UserDocument extends Document {
    email: string,
    password: string,
}

const UserSchema = new Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        }
    },
    { id: true });

export const UserModel = model<UserDocument>('User', UserSchema, 'User');