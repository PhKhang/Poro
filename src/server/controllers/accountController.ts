import { SessionModel } from "../models/session";
import { UserModel } from "../models/user";

import bcrypt from "bcrypt"

export default {
    async changeUsername(id: any, newName: any) {
        try {
            UserModel.findByIdAndUpdate(id, { name: newName });
            return { success: true };
        } catch (error) {
            console.error('Cannot change username:', error);
            return { error: 'Failed to change username' };
        }
    },
    
    async changePassword(id: any, newPassword: any) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        try {
            UserModel.findByIdAndUpdate(id, { password: hashedPassword });
            return { success: true };
        } catch (error) {
            console.error('Cannot update password:', error);
            return { error: 'Failed to update password' };
        }
    },

    async deleteUser(userId: string) {
        try {
            // Delete the user
            const deletedUser = await UserModel.findByIdAndDelete(userId);
            
            if (!deletedUser) {
                return { success: false, error: 'User not found' };
            }

            // Delete all sessions associated with the user
            await SessionModel.deleteMany({ accountID: userId });

            return { success: true };
        } catch (error) {
            console.error('Error in deleteUser:', error);
            return { success: false, error: 'Failed to delete user' };
        }
    }
};