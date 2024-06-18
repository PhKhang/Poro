import { UserDocument, UserModel } from "~/server/models/user"
import bcrypt from "bcrypt"


export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (body.email === "" || body.username === "") {
    console.log("There's nothing", body)
    // throw createError({message: "Missing required fields"});
  }

  console.log("thing")
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  let user
  try {
    user = await UserModel.create({ ...body, password: hashedPassword });
    console.log("Register new user successfully!")
    return { ...user.toObject(), password: undefined };
  }
  catch (err: any) {
    if (err.code === 11000) {
      console.log('Not unique!')
    }
    // console.log(err);
  }
})
