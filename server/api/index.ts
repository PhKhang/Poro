export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  
  // console.log(config.MONGODB_PWD)
  
  return 'Nitro serve connected: Hi'
})
