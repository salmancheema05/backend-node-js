import  express  from "express";
import ConnectDb from "./ConnectDb.js";
import user from "./routes/UserRoute.js"
import { db_url,devport } from './dev.js';
const app = express()
const port = process.env.Port || devport
const dburl = process.env.DB_URL || db_url
ConnectDb(dburl)
app.use(express.json())
app.use(user)
app.listen(port, (error) =>{
    if(error){
        console.log(err)
    }
    console.log('Server is running on http://localhost:'+port)
})