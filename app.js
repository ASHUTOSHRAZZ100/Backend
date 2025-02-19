import express from "express";
import Userrouter from "./routes/user.route.js";
import Taskrouter from "./routes/task.route.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from "cors"

export const app = express();

dotenv.config({
    path:'./data/config.env'
})

// Middleware
app.use(express.json());
app.use(cookieParser())
// app.use(cors({
//     origin:[process.env.FRONTEND_URL],
//     methods :["GET","POST","PUT","DELETE"],
//     Credentials: true,
// }))

app.get("/",(req,res)=>{
    res.redirect("/api/users");
})
// Routes
app.use("/api/users",Userrouter);
app.use("/api/tasks",Taskrouter);

app.use(errorMiddleware);


