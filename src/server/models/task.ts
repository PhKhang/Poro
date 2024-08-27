import { Schema, SchemaType, model } from 'mongoose'
import { randomUUID } from 'crypto';

export interface TaskDocument extends Document {
    accountID: string,
    tagID: string,
    taskBody: string,
    expiredTime: Date
}

const TaskSchema = new Schema(
    {
        taskId: {
            type: String, 
            default: () => randomUUID().toString()
        },
        accountID: {
            type: String,
            // require: true,
        },
        tagID: {
            type: Schema.Types.ObjectId, ref: 'Tag'
        },
        taskBody: {
            type: String,
        },
        expiredTime: {
            type: Date
        }
    },
);

export const TaskModel = model<TaskDocument>('Task', TaskSchema);