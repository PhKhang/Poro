import { SessionModel } from "../models/session"
import { UserModel } from "../models/user"

export default {

    async getTotalUser() {
        const total = await UserModel.countDocuments()
        return total
    },
    async getTotalHour() {
        const totalTime = await SessionModel.aggregate([
            {
                $match: {
                    createdAt: { $lt: new Date(new Date().setHours(0, 0, 0, 0)) }
                }
            },
            { $group: { _id: null, total: { $sum: "$totalTime" } } }
        ])
        
        const totalTimeToday = await SessionModel.aggregate([
            { $group: { _id: null, total: { $sum: "$totalTime" } } }
        ])

        if (totalTime == null) {
            return 0
        }
        
        const time = totalTimeToday[0].total
        const distance = totalTimeToday[0].total - totalTime[0].total

        return {
            time,
            distance
        }
    },
}