
import ProductModel from "../models/productModel.js";
import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify";
import fs from 'fs'



//creae product controller
export const createProductController = async (req, res) => {

    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const {photo}=req.files;

        //validation
        switch (true) {
            case !name: return res.status(500).send({ error: "Name is required" });
            case !description: return res.status(500).send({ error: "Description is required" });
            case !price: return res.status(500).send({ error: "Price is required" });
            case !category: return res.status(500).send({ error: "Category is required" });
            case !quantity: return res.status(500).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000: return res.status(500).send({ error: "Photo is required and should be less than 1mb" });
        }

        const products = new ProductModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            products
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while creating product",
            error
        })
    }
}  


//get product controller
    export const getProductController = async (req, res) => {
        try {
          const products = await ProductModel
            .find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
          res.status(200).send({
            success: true,
            counTotal: products.length,
            message: "ALlProducts ",
            products,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: "Error in getting products",
            error: error.message,
          });
        }
      };
    

//get single product controller
    export const getSingleProductController = async (req, res) => {
        try {
          const { slug } = req.params;
          const product = await ProductModel.findOne({ slug })
            .populate("category")
            .select("-photo");
          res.status(200).send({
            success: true,
            message: "Single product ",
            product,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: "Erorr in getting single product",
            error: error.message,
          });
        }
      };



//photo controller
    export const productPhotoController = async (req, res) => {
        try {
          const { pid } = req.params;
          const product = await ProductModel.findById(pid).select("photo");
          if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
          }
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: "Error in getting photo",
            error: error.message,
          });
        }
      };


      //delete product controller
      export const deleteProductController = async (req, res) => {
        try {
          await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
          res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
          });
        }
      };


//update controller
export const updateProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const products = await ProductModel.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updte product",
      });
    }
  };