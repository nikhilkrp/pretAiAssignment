
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// signup

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.json({ success: false, message: "Missing required fields" })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 6);
        const user = await User.create({
            username, email, password: hashedPassword
        })
        // generate a jwt token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"?true:false,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true, user: { email: user.email, name: user.name } })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


// login

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.json({ success: false, message: "Missing required fields" })
        }
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.json({ success: false, message: "User Not exist" })
        }
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }
        // generate a jwt token
        const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"?true:false,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true, user: { email: userExist.email, name: userExist.name } })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


// check for authentic user

export const isAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        return res.json({ success: true, user })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// logout user

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ?true:false,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        })
        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
