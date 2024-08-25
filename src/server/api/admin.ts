import adminController from "../controllers/adminController";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('Request body:', body); // Log the body to see what is being received

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
      const totalTime = await adminController.getTotalHour();
      console.log('Total time', totalTime);
      return totalTime;
      
    case 'getUserStats':
      return adminController.getUserStats();
      
    default:
      return { error: 'Unknown action' };
  }
});