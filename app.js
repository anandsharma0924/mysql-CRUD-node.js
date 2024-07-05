import express from "express";
import UserRouter from "./routes/user.routes.js";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/user",UserRouter);

app.listen(3000,()=>{
    console.log("Server Started...");
});