import express from "express";
import { hashPassword } from "../util/hashPassword";
import { registerUser, Login } from "../controllers/authController";
import { regUserValid, loginValid } from "../validator/userValid";
import { validReq } from "../middleware/validateUserReq";


const router = express.router();




router.post("/register", regUserValid, validReq, registerUser);

router.get("/:id", (req, res) => {
  //query database
  res.json("blank");
});

export default router;