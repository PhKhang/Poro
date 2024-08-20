// file: ~/server/api/ran.get.ts
import { getToken } from '#auth'
import {SessionModel, SessionDocument} from "~/server/models/session"

export default eventHandler(async (event) => {
    const token = await getToken({ event })
    // const name = getRouterParam(event, 'pick')
    const query = getQuery(event)
    
    if (token == null){
        console.log('Not login')
        return
    }
    
    const all_info: SessionDocument[] = await SessionModel.find({
        accountID: token?.id
    })
    
    // all_info
    
    // ;(await all_info).toString
    
    let total = 0
    for (let i = 0; i < all_info.length; i++) {
        total += all_info[i].totalTime
    }
    
    console.log("Dashboard test:", all_info, total)
    return all_info
    return token || 'no token present'
})