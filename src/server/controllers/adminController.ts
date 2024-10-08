import { SessionModel } from "../models/session";
import { UserModel } from "../models/user";
import { ThemeModel } from "../models/theme";
import { ReportModel } from "../models/report";

export default {
    async getTotalUser() {
        try {
            const total = await UserModel.countDocuments();
            return { total };
        } catch (error) {
            console.error('Error in getTotalUser:', error);
            return { error: 'Failed to get total users' };
        }
    },

    async getTotalHour() {
        try {
            const totalTime = await SessionModel.aggregate([
                {
                    $match: {
                        createdAt: { $lt: new Date(new Date().setHours(0, 0, 0, 0)) }
                    }
                },
                { $group: { _id: null, total: { $sum: "$totalTime" } } }
            ]);

            const totalTimeToday = await SessionModel.aggregate([
                { $group: { _id: null, total: { $sum: "$totalTime" } } }
            ]);

            if (!totalTime || totalTime.length === 0 || !totalTimeToday || totalTimeToday.length === 0) {
                return { time: 0, distance: 0 };
            }

            const time = totalTimeToday[0].total;
            const distance = totalTimeToday[0].total - totalTime[0].total;

            return {
                time,
                distance
            };
        } catch (error) {
            console.error('Error in getTotalHour:', error);
            return { error: 'Failed to get total hours' };
        }
    },

    async getUserStats() {
        try {
            const userStats = await UserModel.aggregate([
                {
                    $lookup: {
                        from: 'sessions',
                        localField: 'id',
                        foreignField: 'accountID',
                        as: 'sessions'
                    }
                },
                {
                    $addFields: {
                        totalTime: { $sum: "$sessions.totalTime" },
                        sessionCount: { $size: "$sessions" }
                    }
                },
                {
                    $project: {
                        id: 1,
                        name: 1,
                        totalTime: 1,
                        sessionCount: 1,
                        role: 1
                    }
                }
            ]);
    
            return { users: userStats };
        } catch (error) {
            console.error('Error in getUserStats:', error);
            return { error: 'Failed to get user stats' };
        }
    },

    async getThemeData() {
        try {
            const themes = await ThemeModel.aggregate([
                {
                    $lookup: {
                        from: 'themes',
                        localField: '_id',
                        foreignField: 'themeId',
                        as: 'themes'
                    }
                },
                {
                    $project: {
                        id: 1,
                        icon: 1,
                        name: 1,
                        videos: 1
                    }
                }
            ]);
            return { themes };
        } catch (error) {
            console.error('Error in getThemeData:', error);
            return { error: 'Failed to get theme data' };
        }
    },
    
    async updateTheme(themeId: string, themeData: any) {
        try {
            const updatedTheme = await ThemeModel.findOneAndUpdate(
                { _id: themeId },
                { $set: themeData },
                { new: true } // Return the updated document
            );
            return { theme: updatedTheme };
        } catch (error) {
            console.error('Error in updateTheme:', error);
            return { error: 'Failed to update theme data' };
        }
    },    

    async addTheme(themeData: any) {
        try {
            // Get the current number of themes
            const themeCount = await ThemeModel.countDocuments();

            // Set the new theme ID to the current number of themes + 1
            themeData.id = themeCount + 1;
            const newTheme = new ThemeModel(themeData);
            const savedTheme = await newTheme.save();
            return { theme: savedTheme };
        } catch (error) {
            console.error('Error in addTheme:', error);
            return { error: 'Failed to add theme data' };
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
    },

    async deleteTheme(themeId: string) { 
        try {   
            const deletedTheme = await ThemeModel.findByIdAndDelete(themeId);
            return { theme: deletedTheme };
        } catch (error) {
            console.error('Error in deleteTheme:', error);
            return { error: 'Failed to delete theme' };
        }
    },

    async getReport() {
        try {
            const reports = await ReportModel.aggregate([
                {
                    $lookup: {
                        from: 'User',
                        localField: 'accountID',
                        foreignField: 'id',
                        as: 'userDetails'
                    }
                },
                {
                    $project: {
                        name: '$userDetails.name',
                        reportCategory: 1,
                        reportSubject: 1,
                        reportBody: 1,
                        reportId: 1,
                        reportTime: 1,
                        createAt: 1
                    }
                }
            ]);
            return { reports };
        } catch(error) {
            console.error('Error in getReport:', error);
            return { error: 'Failed to get report data' };
        }
    },

    async deleteReport(reportId: string) { 
        try {   
            const deletedReport = await ReportModel.findByIdAndDelete(reportId);
            return { Report: deletedReport };
        } catch (error) {
            console.error('Error in delete report:', error);
            return { error: 'Failed to delete report' };
        }
    },
};
