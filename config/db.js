import mongoose from "mongoose";

const connectDB = async() => {
try {
   mongoose.set('strictQuery', false);
   const conn = await mongoose.connect("mongodb+srv://real-client:1234@real-client.7c4px6k.mongodb.net/?retryWrites=true&w=majority", {
       useUnifiedTopology: true
   })

   console.log(`MongoDB Connected Successfully`);
} catch (error) {
   console.log(`Error: ${error.message}`)
   process.exit(1);
}
};  

export default connectDB;