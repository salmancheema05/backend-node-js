import {professorEmailIsExistsOrNot,professorUserNameIsExistsOrNot,newProfessor } from "../../models/professormodel.js"
import {studentEmailIsExistsOrNot,studentsUserNameIsExistsOrNot,newStudent } from "../../models/studentmodel.js"
import bcrypt from 'bcrypt'
import dateTime from '../dateTime.js'
import randomid from '../randomid.js'
const professorAlreadyEmailOrUsername = async(data) =>{
    const email = [data.email]
    const userName =[data.username]
    const emailResult = await professorEmailIsExistsOrNot(email)
    const userNmeResult = await professorUserNameIsExistsOrNot(userName)
    if(emailResult.rows[0].count==1){
        return {'httpstatus':400,"error":"This email already exists"}
    }
    else if(userNmeResult.rows[0].count==1){
        return {'httpstatus':400,"error":"This username already exists"}
    }
    else{
        return await professorRegister(data)
    }
}
const professorRegister = async (data) =>{
    try{
        const password = data.password
        const hashPassword = await bcrypt.hash(password,10)
        const id = await randomid()
        const date = await dateTime()
        const professorInfo = [
            id,
            data.firstname,
            data.lastname,
            data.email,
            data.username,
            hashPassword,
            false,
            data.status,
            data.gender,
            date
        ]
        const result = await newProfessor(professorInfo)
        if(result.rowCount==1){
            return {'httpstatus':200,"message":"Your account has been created"}
        }
    }
    catch(error){
        console.log(error)
    }
}
const studentAlreadyEmailOrUsername = async(data) =>{
    const email = [data.email]
    const userName =[data.username]
    const emailResult = await studentEmailIsExistsOrNot(email)
    const userNmeResult = await studentsUserNameIsExistsOrNot(userName)
    if(emailResult.rows[0].count==1){
        return {'httpstatus':400,"error":"This email already exists"}
    }
    else if(userNmeResult.rows[0].count==1){
        return {'httpstatus':400,"error":"This username already exists"}
    }
    else{
        return await studentRegister(data)
    }
}
const studentRegister = async (data) =>{
    try{
        const password = data.password
        const hashPassword = await bcrypt.hash(password,10)
        const id = await randomid()
        const date = await dateTime()
        const studentInfo = [
            id,
            data.firstname,
            data.lastname,
            data.email,
            data.username,
            hashPassword,
            false,
            data.status,
            data.gender,
            date
        ]
        const result = await newStudent(studentInfo)
        if(result.rowCount==1){
            return {'httpstatus':200,"message":"Your account has been created"}
        }
    }
    catch(error){
        console.log(error)
    }
}
export{ professorAlreadyEmailOrUsername,studentAlreadyEmailOrUsername }