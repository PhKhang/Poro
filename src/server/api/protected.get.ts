// file: ~/server/api/protected.get.ts
import { getServerSession } from '#auth'

export default eventHandler(async (event) => {
    const session = await getServerSession(event)
    console.log('Session check:', session)
    if (!session) {
        return { status: 'unauthenticated!' }
    }
    console.log('Logged in')
    console.log(session)
    return { content: 'authenticated!' }
})