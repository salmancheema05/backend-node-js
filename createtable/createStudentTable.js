import {pool} from "../connectdb.js";
import existsTable from "./existsTable.js";
const createStudentTable = async () =>{
    try{
        const createSubjectTable =`
            CREATE TABLE  students(
                id SERIAL PRIMARY KEY,
                firstname TEXT NOT NULL,
                lastname TEXT NOT NULL,
                email TEXT NOT NULL,
                username TEXT NOT NULL,
                password TEXT  NOT NULL,
                loginstatus BOOLEAN NOT NULL,
                status  TEXT  NOT NULL,
                gender Text NOT NULL,
                studenttoken TEXt[],
                created_at TIMESTAMP DEFAULT NOW()
            ) 
        `
        const result = await existsTable('students')
        if(result.rows[0].exists){
            console.log('students Table already exists')
        }
        else{
            await pool.query(createSubjectTable)
            console.log('students table has been created')
        }       
    }
    catch(error){
        console.log(error)
    }


}
export default createStudentTable