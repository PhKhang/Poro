// file: ~/server/api/ran.get.ts
import { getToken } from '#auth'
import {SessionModel} from "~/server/models/session"

export default eventHandler(async (event) => {
    const token = await getToken({ event })
    // const name = getRouterParam(event, 'pick')
    const query = getQuery(event)
    
    const new_session = SessionModel.create({
        accountID: token?.id,
        totalTime: query.totalTime
    })
    
    console.log("aaaaaaaaaaaaaaaaaa", token?.id)
    return 'write succ'
    return token || 'no token present'
})