import { PipelineStage } from "mongoose";
import { SessionModel } from "../models/session";

const pipeline: PipelineStage[] = [
  {
    $group: {
      _id: '$accountID',
      totalWorkingTime: { $sum: '$totalTime' },
      createdAt: { $first: '$createdAt' } // Keep the createdAt for sorting
    }
  },
  // Filter documents to only include those within the past month
  // {
  //   $match: {
  //     createdAt: { $gte: new Date().setMonth(new Date().getMonth() - 1) }
  //   }
  // },
  // Sort by totalWorkingTime in descending order
  { $sort: { totalWorkingTime: -1 } }
];

let allRankings: ([] | null) = null

export default {

  async getLeaderBoard(req: any) {
    allRankings = await SessionModel.aggregate(pipeline) as ([] | null)
    return allRankings
  },

  async getCurrentStanding(accountID: any) {
    if (accountID == null) {
      return null
    }
    console.log('ahoihgiohwhoiwhoigoi')
    allRankings = await SessionModel.aggregate(pipeline) as ([] | null)
    const index = allRankings?.findIndex((obj: any) => obj._id === accountID)
    const totalTimeSoFar = allRankings && index ? allRankings[index]?.totalWorkingTime : null
    return {index, totalTimeSoFar}
  },


};