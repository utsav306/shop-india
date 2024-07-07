import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken"



export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address,answer } = req.body;

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
        if(!answer){
            return res.send({ message: "Answer is required" });
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
            answer
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
                role:user.role,
               
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


//forgot password controller
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        
        if (!email) {
            return res.status(400).send({ message: "Email is required" });
        }
        if (!answer) {
            return res.status(400).send({ message: "Answer is required" });
        }
        if (!newPassword) {
            return res.status(400).send({ message: "Password is required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email not registered",
            });
        }
       
        console.log("User's security answer:", user.answer);
        if (user.answer === answer) {
            const hashed = await hashPassword(newPassword);
            await userModel.findByIdAndUpdate(user._id, { password: hashed });
            return res.status(200).send({
                success: true,
                message: "Password Reset Successfully",
            });
        } else {
            return res.status(400).send({
                success: false,
                message: "Wrong Security Answer",
            });
        }
    } catch (error) {
        console.error("Error in forgotPasswordController:", error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};
