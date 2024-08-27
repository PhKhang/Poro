import { getToken } from '#auth'
import dashboardController from "~/server/controllers/dashboardController";
import { SessionDocument, SessionModel } from '../models/session';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = await getToken({ event })
  const { action, ...data } = body;

  switch (action) {
    case 'getRanks':
      const reult = await dashboardController.getLeaderBoard(event)
      console.log('Result:', reult)
      return reult;
      
    case 'getTotalTime':
      return dashboardController.getTotalTime(token?.id);

    case 'getCurrentStanding':
      // if (token == null) {
      //     return 'Not logged in'
      // }
      return dashboardController.getCurrentStanding(token?.id);

    case 'getByTime':
      return dashboardController.getByTime(token?.id)

    case 'getDailyActivities':
      if (!token) {
        return { error: 'Login is required for this action' };
      }
      const result = await dashboardController.getDailyActivities(token?.id)
      console.log('Daily activities:', result)
      return result

    default:
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid action. Please choose another action'
      });
  }
})
