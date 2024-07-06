//hash password using bcrypt
import bcrypt from "bcrypt";

//function "hashPassword" to hash password use try catch
export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};


//compare passwrods using bcrypt
export const comparePassword = async (password, hashedPassword) => {
    try {
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    } catch (error) {
        console.log(error);
    }
}