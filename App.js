import  express  from "express";
import user from "./routes/UserRoute.js"
import cors from 'cors'
import { connectdb } from "./connectdb.js";
import createProfessorTable from "./createtable/CreateProfessorTable.js";
import createStudentTable from "./createtable/CreateStudentTable.js";
import * as dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = process.env.Port || "5000"
//const dburl = process.env.DB_URL || db_url
app.use(cors())
app.use(express.json())
app.use(user)
connectdb()
createProfessorTable()
createStudentTable()
app.listen(port, (error) =>{
    if(error){
        console.log(err)
    }
    console.log('Server is running on http://localhost:'+port)
})