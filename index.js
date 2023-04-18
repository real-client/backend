import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import partnerRouter from "./routes/partnerRoute.js";
import opportunityRouter from "./routes/opportunityRoute.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = new express();

if (process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
}
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("API is running ...");
});


app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`))

app.use('/partner', partnerRouter)
app.use('/opportunity', opportunityRouter)

app.use(function (err, req, res, next) {
    res.status(err.status || 500).send ({
       success: false,
       message: err.message
    });
 })