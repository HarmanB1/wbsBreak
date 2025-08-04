import express from "express";
import { hashPassword } from "../util/hashPassword";
const router = express.router();


router.post("/register", (req, res) => {
  

});

router.get("/:id", (req, res) => {
  //query database
  res.json("blank");
});

export default router;