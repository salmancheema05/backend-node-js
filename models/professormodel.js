import { pool } from "../connectdb.js";
const professorUserNameLoginQuery = async (data) =>{
    try{
        const getUserName = [data.username]
        const fetchQuery =`SELECT * FROM professors WHERE "username" =  $1`
        return await pool.query(fetchQuery,getUserName)
    }
    catch(error){
        console.log(error)
    }
}
const professorEmailLoginQuery = async (data) =>{
    try{
        const getUserName = [data.email]
        const fetchQuery =`SELECT * FROM professors WHERE "email" =  $1`
        return await pool.query(fetchQuery,getUserName)
    }
    catch(error){
        console.log(error)
    }
}
const professorTokenSave = async(data) =>{
    try{
       const tokenSaveQuery = `UPDATE professors SET professortoken = ARRAY_APPEND(professortoken, $1 ) WHERE "id" = $2  RETURNING professortoken`
       return await pool.query(tokenSaveQuery,data)
    }
    catch(error){
        console.log(error)
    }
}
const professorTokenRemove = async(data) =>{
    try{
       const tokenSaveQuery = `UPDATE professors SET professortoken = array_remove(professortoken, $1 ) WHERE "id" = $2  RETURNING professortoken`
       return await pool.query(tokenSaveQuery,data)
    }
    catch(error){
        console.log(error)
    }
}
const professorLoginStatusUpdate = async(data) =>{
    try{
        const LoginStatusQuery = `UPDATE professors SET loginstatus = $1 WHERE id = $2  RETURNING loginstatus`
        return await pool.query(LoginStatusQuery,data)
    }
    catch(error){
        console.log(error)
    }
}
const professorEmailIsExistsOrNot  = async(data) =>{
    try{
        const emailExistsOrNot = `SELECT COUNT(*) FROM  professors WHERE email =$1 `
        return await pool.query(emailExistsOrNot,data)
    }
    catch(error){
        console.log(error)
    }
}
const professorUserNameIsExistsOrNot  = async(data) =>{
    try{
        const emailExistsOrNot = `SELECT COUNT(*) FROM  professors WHERE username =$1 `
        return await pool.query(emailExistsOrNot,data)
    }
    catch(error){
        console.log(error)
    }
}
const newProfessor  = async(data) =>{
    try{
        const   register = `INSERT INTO professors 
        (id,firstname,lastname,email,username,password,loginstatus,status,gender,created_at) VALUES(
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
        )`
        return await pool.query(register,data)
    }
    catch(error){
        console.log(error)
    }
}
export { 
    professorUserNameLoginQuery, 
    professorTokenRemove  , 
    professorLoginStatusUpdate,
    professorTokenSave,
    professorEmailLoginQuery,
    professorEmailIsExistsOrNot,
    professorUserNameIsExistsOrNot,
    newProfessor,
}