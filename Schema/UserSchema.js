import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstname : String,
    lastname : String,
    email : String,
    username :String,
    password  : String,
    gender : String,
    as  : String,
    loginstatus:{ type:Boolean, default:false},
    usertoken:Array
  })
  export { UserSchema  }