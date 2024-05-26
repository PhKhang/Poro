import { UserModel } from "~/server/models/user"

export default defineEventHandler(async (event) => {
  const newUser = new UserModel({
    email: "tnpkhang22@clc.fitus.edu.vn",
    password: "1234"
  })
  
  try {
    await newUser.save()
    console.log('Saving successfully')
  }
  catch (err) {
    console.error(err)
  }
})
