// file: ~/server/api/ran.get.ts
import { getToken } from '#auth'
import {SessionModel} from "~/server/models/session"

export default eventHandler(async (event) => {
    const token = await getToken({ event })
    // const name = getRouterParam(event, 'pick')
    const query = getQuery(event)
    
    if (token == null){
        console.log('Not logged in, saving time failed')
        return
    }
    
    console.log("Saving time", token?.id, query.totalTime)
    const new_session = SessionModel.create({
        accountID: token?.id,
        totalTime: Number(query.totalTime)
    })
    
    console.log("Write successfully", token?.id)
    return 'write succ'
    return token || 'no token present'
})