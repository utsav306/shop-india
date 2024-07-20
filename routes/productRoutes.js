import { Router } from "express";
import { createProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    deleteProductController,
    updateProductController,
    productFiltersController,
    productCountController,
    productListController,
    searchProductController,
    realtedProductController
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
router.delete("/delete-product/:pid", deleteProductController);


//update product controller
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);


// filter products
router.post('/product-filters',productFiltersController)

//product count
router.get('/product-count',productCountController)

//product per page
router.get("/product-list/:page",productListController)


//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);



export default router;