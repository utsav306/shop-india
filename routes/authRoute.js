import express from "express"
import { registerController,testController } from "../controllers/authController.js";
import { loginController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();


//register
router.post('/register',registerController)



//login
router.post('/login',loginController)



//test route
router.get('/test',requireSignIn,isAdmin,testController)

export default router