import { SessionModel } from "../models/session";
import { UserModel } from "../models/user";

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
            const users = await UserModel.aggregate([
                {
                    $lookup: {
                        from: 'sessions',
                        localField: '_id',
                        foreignField: 'userId',
                        as: 'sessions'
                    }
                },
                {
                    $project: {
                        id: 1,
                        name: 1,
                        sessionCount: { $size: "$sessions" },
                        totalHours: { $sum: "$sessions.totalTime" }
                    }
                }
            ]);
            return { users };
        } catch (error) {
            console.error('Error in getUserStats:', error);
            return { error: 'Failed to get user stats' };
        }
    }
};