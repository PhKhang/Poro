import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});

export const UserModel = model<any>('User', UserSchema);