export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  
  console.log(id)
  
  return 'Hello Nitro'
})
