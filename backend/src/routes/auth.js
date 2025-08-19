import express from "express";
import { hashPassword } from "../util/hashPassword.js";
import { registerUser, Login } from "../controllers/authController.js";
import { regUserValid, loginValid } from "../validator/userValid.js";
import { validReq } from "../middleware/validateUserReq.js";


const router = express.Router();




router.post("/register", regUserValid, validReq, registerUser);

router.get("/:id", (req, res) => {
  //query database
  res.json("blank");
});

export default router;