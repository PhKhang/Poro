import adminController from "../controllers/adminController";

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
    case 'getTotalUser':
      return adminController.getTotalUser();

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

    case 'getThemeData':
      return adminController.getThemeData();

    case 'deleteUser':
      if (!data.userId) {
        return { error: 'userId is required for deleteUser action' };
      }
      return adminController.deleteUser(data.userId);

    case 'updateTheme': {
      const { themeId, themeData } = data;
      if (!themeId || !themeData) {
        return { error: 'themeId and themeData are required for updateTheme action' };
      }
      return adminController.updateTheme(themeId, themeData);
    }

    case 'addTheme': {
      const { themeData } = data;
      if (!themeData) { 
        return { error: 'themeData is required for addTheme action' };
      } 
      return adminController.addTheme(themeData);
    }

    default:
      return { error: `Unknown action: ${action}` };
  }
});
