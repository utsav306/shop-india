import express from "express"
import { registerController,testController ,forgotPasswordController} from "../controllers/authController.js";
import { loginController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();


//register
router.post('/register',registerController)



//login
router.post('/login',loginController)

//forgot password route
router.post('/forgot-password',forgotPasswordController)

//test route
router.get('/test',requireSignIn,isAdmin,testController)


// protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });


  // protected route auth
router.get("/admin-auth", requireSignIn, isAdmin,(req, res) => {
  res.status(200).send({ ok: true });
});


export default router