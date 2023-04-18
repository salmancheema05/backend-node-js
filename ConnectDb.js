import pkg from 'pg'
const {Pool} = pkg
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mernproject',
    password: 'techtownpk1234',
    port: 5432, // default PostgreSQL port
});
const connectdb = () =>{
    pool.connect().then(()=>{
        console.log("database is connect")
    }).catch((error) => console.log("database is not  connect "+error))
}

export { connectdb, pool}