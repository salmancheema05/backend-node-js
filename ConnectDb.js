import pkg from 'pg'
import * as dotenv from 'dotenv'
dotenv.config()
const {Pool} = pkg
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
});
const connectdb = () =>{
    pool.connect().then(()=>{
        console.log("database is connect")
    }).catch((error) => console.log("database is not  connect "+error))
}

export { connectdb, pool}