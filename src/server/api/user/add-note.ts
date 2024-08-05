import { UserDocument, UserModel } from "~/server/models/note"
import bcrypt from "bcrypt"


export default defineEventHandler(async (event) => {
  const body = await readBody(event);

})
