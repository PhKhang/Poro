import { SessionModel } from "../models/session";
import { UserModel } from "../models/user";

import bcrypt from "bcrypt"

export default {
    async getNoteList(id: any) {
        try {
            const list = await UserModel.find({ accountID: id });
            return list;
        } catch (error) {
            console.error('Cannot find notes:', error);
            return { error: 'Failed to fetch notes' };
        }
    },
    
    async createNote(id: any, noteBody: any) {
        try {
            const newNote = await UserModel.create({ accountID: id, noteBody: noteBody });
            return newNote;
        } catch (error) {
            console.error('Cannot create note:', error);
            return { error: 'Failed to create note' };
        }
    },    
    async editNote(userId: any, noteId: any, noteBody: any) {
        try {
            UserModel.findOneAndUpdate({ accountID: userId, noteId: noteId }, { noteBody: noteBody });
            return { success: true };
        } catch (error) {
            console.error('Cannot update note:', error);
            return { error: 'Failed to update note' };
        }
    },
    
    async deleteNode(userId: any, noteId: any) {
        try {
            UserModel.findOneAndDelete({ accountID: userId, noteId: noteId });
            return { success: true };
        } catch (error) {
            console.error('Cannot delete note:', error);
            return { error: 'Failed to delete note' };
        }
    },
};