import adminController from "../controllers/adminController";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { action, ...data } = body;
  
  switch (action) {
    case 'getTotalUser':
      return adminController.getTotalUser()
      
    case 'getTotalTime':
      const totalTime = await adminController.getTotalHour()
      console.log('Total time', totalTime)
      return totalTime
  }
  
  return 'Hello Nitro'
})
