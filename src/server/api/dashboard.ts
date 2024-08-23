import { getToken } from '#auth'
import dashboardController from "~/server/controllers/dashboardController";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = await getToken({ event })
  const { action, ...data } = body;

  switch (action) {
    case 'getRanks':
      return dashboardController.getLeaderBoard(event);
    case 'getCurrentStanding':
        // if (token == null) {
        //     return 'Not logged in'
        // }
        console.log('Account ID:', token?.id)
        return dashboardController.getCurrentStanding("57e51cf5-5d8b-4789-aafc-72584b3564d8"); 
    // case 'createUser':
    //   return userController.createUser(event, data);
    // case 'getUser':
    //   return userController.getUser(event, data.id);
    // case 'updateUser':
    //   return userController.updateUser(event, data.id, data);
    // case 'deleteUser':
    //   return userController.deleteUser(event, data.id);
    default:
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid action. Please choose another action'
      });
  }
})
