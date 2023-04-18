import {pool} from "../connectdb.js";
import existsTable from "./existsTable.js";
const createProfessorTable = async () =>{
    try{
        const createSubjectTable =`
            CREATE TABLE professors(
                id SERIAL PRIMARY KEY,
                firstname TEXT NOT NULL,
                lastname TEXT NOT NULL,
                email TEXT NOT NULL,
                username TEXT NOT NULL,
                password TEXT  NOT NULL,
                loginstatus BOOLEAN NOT NULL,
                status  TEXT  NOT NULL,
                gender Text NOT NULL,
                professortoken TEXT[],
                created_at TIMESTAMP DEFAULT NOW()
            ) 
        `
        const result = await existsTable('professors')
        if(result.rows[0].exists){
            console.log('Professors Table already exists')
        }
        else{
            await pool.query(createSubjectTable)
            console.log('Professors table has been created')
        }       
    }
    catch(error){
        console.log(error)
    }


}
export default createProfessorTable