import express from "express";
const router = express.router();


router.get("/register", (req, res) => {
  res.json("blank");
});

router.get("/:id", (req, res) => {
  //query database
  res.json("blank");
});

export default router;