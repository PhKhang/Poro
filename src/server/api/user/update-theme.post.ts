import { NoteModel } from "~/server/models/notes"
import { UserModel } from "~/server/models/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log(body)
  
  const result = await NoteModel.create({
    noteBody: body.content,
    accountID: body.id
  })

  console.log(result)

  return {
    result
  }
})
