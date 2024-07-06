import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken"



export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Check required fields
        if (!name) {
            return res.send({ message: "Name is required" });
        }
        if (!email) {
            return res.send({ message: "Email is required" });
        }
        if (!password) {
            return res.send({ message: "Password is required" });
        }
        if (!phone) {
            return res.send({ message: "Phone is required" });
        }
        if (!address) {
            return res.send({ message: "Address is required" });
        }

        // Check existing user via email
        const existingUser = await userModel.findOne({ email }); // Use userModel here
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "User already exists, please login",
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Save user
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "User created successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error,
        });
    }
};





export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }

        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email not registered"
            })
        }

        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success: false,
                message: "Wrong Password"
            })
        }

        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
               
            },
            token
        })




    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error,
        });
    }
}



//test controller
export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
}