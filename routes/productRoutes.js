import { Router } from "express";
import { createProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    deleteProductController,
    updateProductController
 } from "../controllers/productController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable"

const router = Router();

//create a product route

router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
  );


 //get product controller
 router.get('/get-product',getProductController)


//get single product controller
router.get('/get-product/:slug',getSingleProductController)


//get photo controller
router.get('/product-photo/:pid',productPhotoController)


//delete product controller
router.delete("/product/:pid", deleteProductController);


//update product controller
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

export default router;