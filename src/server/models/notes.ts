import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto';

export interface NoteDocument extends Document {
    noteBody: string,
    accountID: string,
}

const NoteSchema = new Schema(
    {
        noteId: {
            type: 'UUID', 
            default: () => randomUUID()
        },
        accountID: {
            type: String,
            // require: true,
        },
        noteBody: {
            type: String,
        },
    },
    // https://mongoosejs.com/docs/timestamps.html
    // Automatically add createdAt and updatedAt
    { timestamps: true }
);

export const NoteModel = model<NoteDocument>('Note', NoteSchema);