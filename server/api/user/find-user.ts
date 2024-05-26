import { UserModel } from "~/server/models/user";

export default defineEventHandler(async (event) => {
    const users = await UserModel.find();
    
    return {
        users
    }
})