import { Schema, SchemaType, model } from 'mongoose'
import { randomUUID } from 'crypto';

export interface TagDocument extends Document {
    tagName: string,
    color: string,
}

const TagSchema = new Schema(
    {
        tagId: {
            type: 'UUID', 
            default: () => randomUUID().toString()
        },
        tagName: {
            type: String,
        },
        color: {
            type: Date
        }
    },
);

export const TagModel = model<TagDocument>('Tag', TagSchema);