import express from "express"
import {readdirSync} from 'fs'
import cors from "cors";
import mongoose from "mongoose"
import { threadId } from "worker_threads";
const morgan =require("morgan");

require ("dotenv").config();

const app =express()
//db connection
mongoose.connect(process.env.DATABASE )
.then(() =>console.log('DB connected'))
.catch((err)=>console.log('DB Cnnection error: ',err))
//middleware

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
readdirSync("./server/routes").map((r) => app.use("/api", require(`./server/routes/${r}`)));
const port =process.env.PORT;

if ( process.env.NODE_ENV==="production") {
    app.use(express.static(path.resolve(__dirname, './client/build')));
      app.get('*', function(request, response) {
        response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
      });
    }else{
      app.get('/', (req, res) => {
        res.send("api running");
      })
    }

app.listen(port,() => console.log('server is running on port ${port}'));

