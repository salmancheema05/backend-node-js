import { pool } from "../connectdb.js";
const studentUserNameLoginQuery = async (data) =>{
    try{
        const getUserName = [data.username]
        const fetchQuery =`SELECT * FROM students WHERE "username" =  $1`
        return await pool.query(fetchQuery,getUserName)
    }
    catch(error){
        console.log(error)
    }
}
const studentEmailLoginQuery = async (data) =>{
    try{
        const getUserName = [data.email]
        const fetchQuery =`SELECT * FROM students WHERE "email" =  $1`
        return await pool.query(fetchQuery,getUserName)
    }
    catch(error){
        console.log(error)
    }
}

const studentLoginStatusUpdate = async(data) =>{
    try{
        const LoginStatusQuery = `UPDATE students SET loginstatus = $1 WHERE id = $2  RETURNING loginstatus`
        return await pool.query(LoginStatusQuery,data)
    }
    catch(error){
        console.log(error)
    }
}
const studentTokenSave = async(data) =>{
    try{
       const tokenSaveQuery = `UPDATE students SET studenttoken = ARRAY_APPEND(studenttoken, $1 ) WHERE "id" = $2  RETURNING studenttoken`
       return await pool.query(tokenSaveQuery,data)
    }
    catch(error){
        console.log(error)
    }
}
const studentTokenRemove = async(data) =>{
    try{
       const tokenSaveQuery = `UPDATE students SET studenttoken = array_remove(studenttoken , $1 ) WHERE "id" = $2`
       return await pool.query(tokenSaveQuery,data)
    }
    catch(error){
        console.log(error)
    }
}
const studentEmailIsExistsOrNot  = async(data) =>{
    try{
        const emailExistsOrNot = `SELECT COUNT(*) FROM  students WHERE email =$1 `
        return await pool.query(emailExistsOrNot,data)
    }
    catch(error){
        console.log(error)
    }
}
const studentsUserNameIsExistsOrNot  = async(data) =>{
    try{
        const emailExistsOrNot = `SELECT COUNT(*) FROM  students WHERE username =$1 `
        return await pool.query(emailExistsOrNot,data)
    }
    catch(error){
        console.log(error)
    }
}

const newStudent  = async(data) =>{
    try{
        const   register = `INSERT INTO students
        (id,firstname,lastname,email,username,password,loginstatus,status,gender,created_at) VALUES(
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
        )`
        return await pool.query(register,data)
    }
    catch(error){
        console.log(error)
    }
}
export{
    studentUserNameLoginQuery,
    studentEmailLoginQuery,
    studentLoginStatusUpdate,
    studentTokenSave,
    studentTokenRemove,
    newStudent,
    studentEmailIsExistsOrNot,
    studentsUserNameIsExistsOrNot
}