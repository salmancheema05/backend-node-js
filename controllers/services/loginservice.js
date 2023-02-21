import {  Usercollection } from "../../models/User.js";
import jwt from "jsonwebtoken"
import { jwt_token_key } from "../../dev.js";
const tokenkey = process.env.JWT_TOKEN_KEY || jwt_token_key
const verifypassword= async (record,password) =>{
    const getuserpassword = record.password
    try {
        if(getuserpassword==password){
            let updateddata = await Usercollection.findByIdAndUpdate({_id:record._id},{$set:{loginstatus:false}},{new:true})
            return await createtoken(updateddata)
        } 
        else{
          return {"error":"your infomation is incollect"}
        }
    }
    catch(error){
        console.log(error)
    }
    
}
const createtoken = async (userrecord) => {
    const userinfo ={
        id:userrecord._id,
        firstname:userrecord.firstname,
        lastname:userrecord.lastname,
        as:userrecord.as,
        loginstatus:userrecord.loginstatus,
    }
    const token = jwt.sign(userinfo,tokenkey)
    await Usercollection.findByIdAndUpdate({_id:userinfo.id},{$push:{usertoken:token}},{new:true})
    return await verifytoken(token)

}
const verifytoken = async(token)=>{
    try{
        const usertokenverify = await Usercollection.findOne( {usertoken:token} )
        if(usertokenverify){
            return {"message":"token has been verified",'token' :token}
        }
        else{
            return  {"error":"your infomation is incollect"}
        }
        
    }
    catch(error){
        console.log(error)
    }
}
export { verifypassword }