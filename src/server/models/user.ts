import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto';

export interface UserDocument extends Document {
    email: string,
    password: string,
}

const UserSchema = new Schema({
    id: {
        type: String,
        default: () => randomUUID()
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
    }
});

export const UserModel = model<UserDocument>('User', UserSchema, 'User');