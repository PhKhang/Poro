import {Schema, model} from 'mongoose'
import { randomUUID } from 'crypto';

export interface ThemeDocument extends Document {
    icon: string,
    name: string,
    video: Array<string>
}

const ThemeSchema = new Schema({
    id: {
        type: String, 
        default: () => randomUUID().toString()
    },
    icon: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    videos: {
        type: [String]
    }
});

export const ThemeModel = model<ThemeDocument>('Theme', ThemeSchema);