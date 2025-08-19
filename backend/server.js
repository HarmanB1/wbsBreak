import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import projectsRouter from "./src/routes/project.js";
import { query } from "./src/db/query.js";
import authRoutes from "./src/routes/auth.js";


dotenv.config();

const app = express();
app.use(cors());

app.use('/api/projects', projectsRouter)
app.use('/api/auth', authRoutes)


const PORT = process.env.PORT || 3000; //falbackDev
app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`);
});