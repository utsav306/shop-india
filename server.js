import color  from "colors"
import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectdb from "./config/db.js"
import authRoutes from "./routes/authRoute.js"
import cors from "cors"
import categoryRoutes from "./routes/categoryRoutes.js"



const app=express()


app.use(cors())
app.use(express.json())
app.use(morgan('dev'))



connectdb();

//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)



dotenv.config()
app.get("/",(req,res)=>{
    res.send({
        message : "wellcome to ecommerce app"
    })
})

//


app.listen(process.env.PORT,()=>{
    console.log("Server started".bgCyan.white)
})