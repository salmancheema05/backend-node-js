import { professorCheckEmailOrUsername,studentCheckEmailOrUsername} from "./services/loginservice.js";
import { professorAlreadyEmailOrUsername,studentAlreadyEmailOrUsername } from "./services/signupservice.js";
import {professorTokenRemove,professorLoginStatusUpdate } from '../models/professormodel.js'
import {studentTokenRemove,studentLoginStatusUpdate} from "../models/studentmodel.js"
const userLogin = async (req ,res) =>{
    try{
        const data = req.body
        if(data.status =='' ){
            res.status(400).send({"error":"require user status"})
        }
        else if(data.status ==='professor' ){
            if(data.email==''|| data.username==''){
                res.status(400).send({"error":"required email or username"})
            }
            else{
                const result = await professorCheckEmailOrUsername(data)
                res.status(result.httpstatus).send(result)
            }   
        }
        else if(data.status === "student" ){
            if(data.email=='' || data.username==''){
                res.status(400).send({"error":"required email or username"})
            }
            else{ 
                const result = await studentCheckEmailOrUsername(data)
                res.status(result.httpstatus).send(result)
                
            }
        }
        else{
            res.status(400).send({"error":"User Status should be professor or student "})
        }
       
    }
    catch(error){
        console.log(error)
    }
}
const userLogout = async (req,res) =>{
    const data = req.body
    const dataInArray =[data.token,data.id]
    const loginStatus =[false,data.id]
    if(data.status==="professor"){
        await professorTokenRemove(dataInArray)
        professorLoginStatusUpdate(loginStatus)
        res.status(200).send({"message":"user is  Logout"})
        
    }
    else if(data.status==='student'){
        const result= await studentTokenRemove(dataInArray)
        await studentLoginStatusUpdate(loginStatus)
         res.status(200).send({"message":"user is  Logout"})
    }
    else{
        res.status(400).send({"error":"User Status should be professor or student "})
    }
}
const userSignup = async (req,res) =>{
    try{
        const data = req.body
        if(data.status == 'professor'){
            const result = await professorAlreadyEmailOrUsername(data)
            res.status(result.httpstatus).send(result)
        }
        else if(data.status =="student"){
            const result = await studentAlreadyEmailOrUsername(data)
            res.status(result.httpstatus).send(result)
        }
        else{
            res.status(400).send({"error":"User Status should be professor or student "})
        }
    }
    catch(error){
        console.log(error)
    }
}
export { userLogin, userLogout , userSignup } 