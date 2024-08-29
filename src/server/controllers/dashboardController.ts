import { PipelineStage } from "mongoose";
import { SessionModel } from "../models/session";

const pipeline: PipelineStage[] = [
  {
    $lookup: {
      from: "User", // collection name in db
      localField: "accountID",
      foreignField: "id",
      as: "username",
    },
  },
  {
    $unwind: "$username"
  },
  {
    $group: {
      _id: '$accountID',
      totalWorkingTime: { $sum: '$totalTime' },
      createdAt: { $first: '$createdAt' },
      name: { $first: '$username.name' },
      accountID: { $first: '$username.id' },
    }
  },
  { $sort: { totalWorkingTime: -1 } }
];

let allRankings: ([] | null) = null

export default {

  async getLeaderBoard(req: any) {
    allRankings = await SessionModel.aggregate(pipeline) as ([] | null)
    const topRankings = allRankings ? allRankings.slice(0, 10) : null;
    return topRankings;
  },
  async getByTime(accountID: any) {
    const date = new Date()
    const result = await SessionModel.aggregate([
      {
        $match: {
          accountID: accountID,
          totalTime: { $gt: 0 },
          createdAt: { $gte: new Date(date.getFullYear(), date.getMonth(), 1) }
        }
      },
    ])

    let totalTimeOfToday = 0
    for (let i = 0; i < result.length; i++) {
      if (result[i].createdAt.getDate() === date.getDate()) {
        totalTimeOfToday += result[i].totalTime
      }
    }

    let totalTimeOfWeek = 0
    let today = new Date()
    today.setDate(today.getDate() - today.getDay() + 1)
    for (let i = 0; i < result.length; i++) {
      if (result[i].createdAt.getDate() >= today.getDate()) {
        totalTimeOfWeek += result[i].totalTime
      }
    }

    const totalTimeOfMonth = result.reduce((total, obj) => total + obj.totalTime, 0)

    console.log('Calc:', totalTimeOfToday)
    console.log('Calc:', totalTimeOfWeek)
    console.log('Calc:', totalTimeOfMonth)

    console.log('getByTime', result)
    return {
      totalTimeOfToday,
      totalTimeOfWeek,
      totalTimeOfMonth
    };
  },

  async getCurrentStanding(accountID: any) {
    if (accountID == null) {
      return null
    }
    // console.log('ahoihgiohwhoiwhoigoi')
    allRankings = await SessionModel.aggregate(pipeline) as ([] | null)
    const top = allRankings?.findIndex((obj: any) => obj._id === accountID)
    const totalTimeSoFar = allRankings && top != null ? allRankings[top]?.totalWorkingTime : null
    return top
  },
  async getTotalTime(accountID: any) {
    if (accountID == null) {
      return null
    }
    // console.log('ahoihgiohwhoiwhoigoi')
    allRankings = await SessionModel.aggregate(pipeline) as ([] | null)
    const top = allRankings?.findIndex((obj: any) => obj._id === accountID)
    const totalTimeSoFar = allRankings && top != null ? allRankings[top]?.totalWorkingTime : null
    return totalTimeSoFar
  },

  async getDailyActivities(accountID: any) {
    const date = new Date()
      const result = await SessionModel.aggregate([
        {
          $match: {
            accountID: accountID,
            totalTime: { $gt: 0 },
            createdAt: { $gte: new Date(date.getFullYear(), date.getMonth(), 1) }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            totalTime: { $sum: "$totalTime" }
          }
        },
      ])
      
      let dailyActivities = []
      function getActivityLevel(hours: any) {
        if ((hours/60) === 0) return 'no-study';
        if ((hours/60) <= 1) return 'low-activity';
        if ((hours/60) <= 2) return 'medium-activity';
        if ((hours/60) <= 3) return 'medium-high-activity';
        if ((hours/60) > 3)  return 'high-activity';
        return 'high-activity';
    }

      for (let i = 0; i < result.length; i++) {
        let day = {
          date: result[i]._id,
          hours_studied: result[i].totalTime,
          activity_level: result[i].totalTime ? getActivityLevel(result[i].totalTime) : 'no-study'
        }
        dailyActivities.push(day)
      }
      function generateDateRange(startDate : any, endDate : any) {
        let dates = [];
        let currentDate = new Date(startDate);
        endDate = new Date(endDate);
    
        while (currentDate <= endDate) {
            dates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    }
    // Hàm tạo danh sách tất cả các ngày trong một tháng bất kỳ
    function generateMonthDays(year : any, month : any) {
        let startDate = new Date(year, month - 1, 1);
        let endDate = new Date(year, month, 1); // Lấy ngày cuối cùng của tháng
        return generateDateRange(startDate, endDate);
    }
    
    // Hàm thêm các ngày với hours_studied = 0 vào danh sách hiện tại
    function fillMissingDays(daysActivity: any[], year: number, month: number) {
      let allDates = generateMonthDays(year, month);
      let daysMap: { [key: string]: any } = {};
  
      // Create a map of existing days
      daysActivity.forEach(item => {
          daysMap[item.date] = item;
      });
  
      // Create a new array to avoid mutating the original array while iterating
      let updatedDaysActivity = [...daysActivity];
  
      // Add missing days with default values
      allDates.forEach(date => {
          if (!daysMap[date]) {
              updatedDaysActivity.push({ "date": date, "hours_studied": 0, "activity_level": "no-study" });
          }
      });
  
      // Sort the array by date
      updatedDaysActivity.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
      return updatedDaysActivity;
  }
      return fillMissingDays(dailyActivities, date.getFullYear(), date.getMonth() + 1)
  },
};