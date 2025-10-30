import jwt from "jsonwebtoken"


const authUser = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "No Token Available" });
    }
    try {
        const tokendecoded = jwt.verify(token, process.env.JWT_SECRET);
        if (tokendecoded.id) {
            req.userId = tokendecoded.id;
            next();
        }else{
            return res.status(401).json({message:"Token is not valid"});
        }

    } catch (error) {
        return res.status(401).json({message:"Token is not valid"})

    }
}
export default authUser;