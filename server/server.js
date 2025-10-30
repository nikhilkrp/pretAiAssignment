import express from "express"
import dotenv from "dotenv"
import mongoDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import noteRoutes from "./routes/noteRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";


dotenv.config();



const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    // origin:"http://localhost:5173",
    origin:process.env.FRONTEND,
    credentials: true,
  })
);

const PORT = process.env.PORT
// routes
app.get('/',(req,res)=>{
    res.json("server is running");
})

app.use('/api/auth',userRouter);
app.use("/api/notes", noteRoutes);
app.use("/api/profile", profileRoutes);

mongoDB();



app.listen(PORT , ()=>{
    console.log(`server is listening on port ${PORT}`)
})


