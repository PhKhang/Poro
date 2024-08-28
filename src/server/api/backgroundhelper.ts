import adminController from "../controllers/adminController";
import backgroundController from "../controllers/backgroundController";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('Request body:', body);

  if (!body) {
    return { error: 'Request body is missing' };
  }

  const { action, ...data } = body;

  if (!action) {
    return { error: 'Action is missing in the request body' };
  }

  switch (action) {
    case 'getThemeList':
      return backgroundController.getThemeList();

    case 'getTotalTime':
      try {
        const totalTime = await adminController.getTotalHour();
        console.log('Total time', totalTime);
        return totalTime;
      } catch (error) {
        console.error('Error getting total time:', error);
        return { error: 'Failed to get total time' };
      }

    case 'getUserStats':
      return adminController.getUserStats();

    

    default:
      return { error: `Unknown action: ${action}` };
  }
});
