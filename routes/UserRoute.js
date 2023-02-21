import express from 'express'
import { usersignup, userlogin  } from "../controllers/UserController.js";
const router = express.Router()
router.post('/api/usersignup',usersignup)
router.post('/api/userlogin',userlogin)
export default router