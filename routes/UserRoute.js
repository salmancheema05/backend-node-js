import express from 'express'
import { userLogin,userLogout,userSignup } from "../controllers/usercontroller.js";
const router = express.Router()
router.post('/api/usersignup',userSignup)
router.post('/api/userlogin',userLogin )
router.post('/api/userlogout',userLogout )
router.get('/',(req,res) =>{
    res.send('node start')
})

export default router