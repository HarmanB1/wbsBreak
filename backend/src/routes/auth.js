import express from "express";
import { hashPassword } from "../middleware/hashPassword";
const router = express.router();


router.post("/register", (req, res) => {
  const {email, password} = req.body;

  try{
    passwordHash = hashPassword(password);
    
    
  }

});

router.get("/:id", (req, res) => {
  //query database
  res.json("blank");
});

export default router;