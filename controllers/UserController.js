import { useregistered, Usercollection } from "../models/User.js";
import { verifypassword} from "./services/loginservice.js";
const usersignup = async (req,res)=>{
    const userdata = req.body
    try{
      await  useregistered(userdata) 
      res.send('your have registerd on myapp')
    }
    catch(error){
        console.log(error)
    }
    
}
const userlogin = async (req,res) =>{
  if(req.body.email){
    try{
      let receivedinfo = await Usercollection.findOne({email:req.body.email})
      if(receivedinfo == null){
        res.json({"error":"your email or username is incollect"})
      }
      else{
        res.send(await verifypassword(receivedinfo,req.body.password))
      }
    }
    catch(error){
      console.log(error)
    }
  }
  else{
    try{
      let receivedinfo = await Usercollection.findOne({username:req.body.username})
      if(receivedinfo == null){
        res.json({"error":"your email or username is incollect"})
      }
      else{
        res.send(await verifypassword(receivedinfo,req.body.password))
      }
    }
    catch(error){
      console.log(error)
    }
  }
}
export { usersignup, userlogin }