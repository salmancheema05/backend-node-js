import mongoose from 'mongoose';
const ConnectDb = async (Dburl) =>{
    mongoose.set("strictQuery", false);
    try{
        await mongoose.connect(Dburl).then(()=>{
            console.log('Online DataBase has been connted')
        })
      
    }
    catch (error){
        console.log(error)
    }
}
export default ConnectDb