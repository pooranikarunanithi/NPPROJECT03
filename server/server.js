import express from "express"
import {readdirSync} from 'fs'
import cors from "cors";
import mongoose from "mongoose"
import { threadId } from "worker_threads";
const morgan =require("morgan");

require ("dotenv").config();

const app =express()
//db connection
mongoose.connect(process.env.DATABASE)
.then(() =>console.log('DB connected'))
.catch((err)=>console.log('DB Cnnection error: ',err))
//middleware

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
const port =process.env.PORT || 8000;



app.listen(port,() => console.log('server is running on port ${port}'));

