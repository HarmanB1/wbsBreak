import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());


app.get('/api/projects', (req, res)=>{
    res.json("blank");
});

app.get('')
const PORT = process.env.PORT || 3000; //falbackDev

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`);
});