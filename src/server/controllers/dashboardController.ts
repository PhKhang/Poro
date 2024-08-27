import { PipelineStage } from "mongoose";
import { SessionModel } from "../models/session";
import { h } from "vue";

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
      name: { $first: '$username.name' }
    }
  },
  { $sort: { totalWorkingTime: -1 } }
];

let allRankings: ([] | null) = null

export default {

  async getJoin() {
    const join = await SessionModel.aggregate([
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
        $project: {
          "username.password": 0,
          "username._id": 0,
          "username.id": 0,
          "username.email": 0,
          "username.image": 0,
          "username.__v": 0,
          "username.createdAt:": 0,
          "username.updatedAt:": 0,
        }
      },
    ])
    return join
  },
  async getLeaderBoard(req: any) {
    allRankings = await SessionModel.aggregate(pipeline) as ([] | null)
    return allRankings
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
    return {top, totalTimeSoFar}
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
        if (hours === 0) return 'no-study';
        if (hours <= 1) return 'low-activity';
        if (hours <= 2) return 'medium-activity';
        if (hours <= 3) return 'medium-high-activity';
        if (hours > 3)  return 'high-activity';
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
      
      return dailyActivities
  },
};