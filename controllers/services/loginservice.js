import  jwt  from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { professorTokenSave,professorLoginStatusUpdate,professorUserNameLoginQuery,professorEmailLoginQuery } from "../../models/professormodel.js"
import { studentTokenSave,studentLoginStatusUpdate,studentUserNameLoginQuery,studentEmailLoginQuery } from "../../models/studentmodel.js"
import * as dotenv from 'dotenv'
dotenv.config()
const professorCheckEmailOrUsername = async(data) => {
    try{
        if(data.hasOwnProperty('username')){
            const result = await professorUserNameLoginQuery(data)
            if(result.rowCount===1){
                const resultObject = result.rows[0]
                const token  = await verifyPassword(resultObject,data.password) 
                return token
            }
            else{
                return {"httpstatus":400,'error':"your data is wrong"} 
            }
        }
        else if(data.hasOwnProperty('email')){
            const result = await professorEmailLoginQuery(data)
            if(result.rowCount===1){
                const resultObject = result.rows[0]
                const token  = await verifyPassword(resultObject,data.password) 
                return token
    
            }
            else{
                return {"httpstatus":400,'error':"your data is wrong"}
            }
            
        }
        else{
            return {"httpstatus":400,"error":"it should be email or username"}
        }
    }
    catch(error){
        console.log(error)
    }
   
}   
const studentCheckEmailOrUsername = async(data) => {
    try{
        if(data.hasOwnProperty('username')){
            const result = await studentUserNameLoginQuery(data)
            if(result.rowCount ===1){
                const resultObject = result.rows[0]
                const token  = await verifyPassword(resultObject,data.password) 
                return token
            }
            else{
                return {"httpstatus":400,"error":"your data is wrong"}
            }
        }
        else if(data.hasOwnProperty('email')){
            const result = await studentEmailLoginQuery(data)
            if(result.rowCount ===1){
                const resultObject = result.rows[0]
                const token  = await verifyPassword(resultObject,data.password) 
                return token
            }
            else{
                return {"httpstatus":400,'error':"your data is wrong"}
            }
        }
        else{
            return {"httpstatus":400,"error":"it should be email or username"}
        }
    }
    catch(error){
        console.log(error)
    }
}
const verifyPassword = async(data,userpassword) => {
    try{
         
        if(userpassword==""){
            return {"httpstatus":400,'error':"enter the your password"}
        }   
        else{ 
            const result = await bcrypt.compare(userpassword,data.password)
            if(result==true){
                if(data.status=="professor"){
                    const professorUpdate = [true, data.id] 
                    const result = await professorLoginStatusUpdate(professorUpdate) 
                    const loginstatus = result.rows[0].loginstatus
                    return createToken(data,loginstatus) 
                    
                }
                else{
                    const studentUpdate = [true, data.id] 
                    const result = await studentLoginStatusUpdate (studentUpdate ) 
                    const loginstatus = result.rows[0].loginstatus
                    return createToken(data,loginstatus) 
                }
            }
            else{
                return {"httpstatus":400,'error':"your password is wrong"}
            }
        }
    }
    catch(error){
        console.log(error)
    }

} 
const createToken = async (data,loginstatus) =>{
    try{
        const userData = {
            id:data.id,
            firstname:data.firstname,
            lastname:data.lastname,
            loginstatus:loginstatus,
            status:data.status
        }
        const createToken = jwt.sign({userData},process.env.JWT_KEY)
        const tokenInfo = [createToken,userData.id]
        if(userData.status==="professor"){
            const result = await professorTokenSave(tokenInfo)
            const lastIndex = result.rows[0].professortoken.length -1
            const latestToken = result.rows[0].professortoken[lastIndex]
            return {"httpstatus":200,"message":latestToken}
        }
        else{
            const result = await studentTokenSave(tokenInfo)
            const lastIndex = result.rows[0].studenttoken.length -1
            const latestToken = result.rows[0].studenttoken[lastIndex]
            return {"httpstatus":200,"message":latestToken}
        }  
    }
    catch(error){
         console.log(error)
    }
}
export { professorCheckEmailOrUsername,studentCheckEmailOrUsername }
