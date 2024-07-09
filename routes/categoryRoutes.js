import { Router } from "express";
import {createCategoryController, updateCategoryController, categoryController, singalCategoryController, deleteCategoryController} from "../controllers/categoryController.js"
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

//create of category
router.post('/create-category',requireSignIn, isAdmin, createCategoryController)

//update of category
router.put('/update-category/:id',requireSignIn, isAdmin, updateCategoryController)

//get all category
router.get('/get-category',categoryController)


//get single category
router.get('/single-category/:slug',singalCategoryController)

//delete category
router.delete('/delete-category/:id',requireSignIn, isAdmin, deleteCategoryController)



export default router