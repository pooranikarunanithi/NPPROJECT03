import express from "express";
import { register,login } from "../controllers/auth";

const router =express.Router(); 
//instead of this
//app.get("/api/:message",(req,res) => {
  //  res.status(200).send(`Here is your message: ${req.params.message}`);
//}); 

//controllers

//router.get("/:message",showMessage)
router.post("/register",register);
router.post("/login",login);

  module.exports = router;