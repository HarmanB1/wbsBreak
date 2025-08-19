import express from "express";
const router = express.Router();


router.get("/", (req, res) => {
  res.json("blank");
});

router.get("/:id", (req, res) => {
  //query database
  res.json("blank");
});

export default router;