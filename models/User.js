import mongoose from "mongoose";
import { UserSchema } from "../Schema/UserSchema.js"
const Usercollection = mongoose.model('users',UserSchema)
const useregistered = (body) =>{
  return Usercollection(body).save()
}

export { useregistered, Usercollection }