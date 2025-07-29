import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import projectsRouter from "./routes/project.js";

dotenv.config();

const app = express();
app.use(cors());
app.use('/api/projects', projectsRouter)


const PORT = process.env.PORT || 3000; //falbackDev

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`);
});