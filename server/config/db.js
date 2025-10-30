import mongoose from "mongoose";

const mongoDB = async()=>{
   try {
     mongoose.connect(process.env.MONGO_URI);
     console.log("DB connected Success fully")
   } catch (error) {
     console.log("DB Connection Error")
   }
}

export default mongoDB;