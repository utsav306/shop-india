import CategoryModel from "../models/CategoryModel.js"
import slugify from "slugify"

export const createCategoryController=async(req,res)=>{
   try {

    //create category using slugify
    const {name}=req.body
    if(!name){
        return res.status(401).send({
            success:false,
            message:"Name is required"
        })
    }

    //check is existing category
    const existingCategory=await CategoryModel.findOne({name})
    if(existingCategory){
        return res.status(200).send({
            success:false,
            message:"Category already exists"
        })
    }
    const category = await new CategoryModel({
        name,
        slug: slugify(name),
      }).save();

    res.status(201).send({
        success:true,
        message:"Category created successfully",
        category
    })
    
   } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in category",
        error
    })
   }
  
}



//update category controller
export const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body
        const {id}=req.params
        const category=await CategoryModel.findByIdAndUpdate(id,{
            name,
            slug:slugify(name)
        },{
            new:true
        })
        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while updating category",
            error
        })
    }
}



//get all category controller
export const categoryController=async(req,res)=>{
    try {
        const category=await CategoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All categories",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting all categories",
            error
        })
    }
}


//single category controller
export const singalCategoryController=async(req,res)=>{
    try {
        const category=await CategoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"Get single category successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting single category",
            error
        })
    }
}


//delete category controller
export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params
        await CategoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Category deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while deleting category",
            error
        })
    }
}