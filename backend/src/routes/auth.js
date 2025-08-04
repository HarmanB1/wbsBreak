import express from "express";
import { hashPassword } from "../util/hashPassword";
import { registerUser } from "../controllers/authController";

const router = express.router();




router.post("/register", registerUser);

router.get("/:id", (req, res) => {
  //query database
  res.json("blank");
});

export default router;