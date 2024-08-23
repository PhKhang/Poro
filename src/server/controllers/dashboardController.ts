import { PipelineStage } from "mongoose";
import { SessionModel } from "../models/session";

const pipeline: PipelineStage[] = [
  {
    $group: {
      _id: '$accountID',
      totalWorkingTime: { $sum: '$totalTime' },
      createdAt: { $first: '$createdAt' }
    }
  },
  { $sort: { totalWorkingTime: -1 } }
];

let allRankings: ([] | null) = null

export default {

  async getLeaderBoard(req: any) {
    allRankings = await SessionModel.aggregate(pipeline) as ([] | null)
    return allRankings
  },
  async getByTime(accountID: any) {
    const date = new Date()
      const result = await SessionModel.aggregate([
        {
          $match: {
            accountID: "5ec417e0-81d5-4700-97f6-402e19dc452a",
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
    const index = allRankings?.findIndex((obj: any) => obj._id === accountID)
    const totalTimeSoFar = allRankings && index != null ? allRankings[index]?.totalWorkingTime : null
    return {index, totalTimeSoFar}
  },

  
};