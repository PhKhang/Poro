export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  // const vid = await fetch('https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=4Y4YSpF6d6w&key=AIzaSyAq98m57L7e7jFwHpFP1dlgzC_L6TgT9vs')


  console.log(id)

  return 'Hello Nitro'
})
