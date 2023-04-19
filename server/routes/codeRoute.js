import { Router } from "express";
import verificationModel from "../models/verificationModel.js";

const router = Router();

router.post("/add", async (req, res) => {
  console.log("type of",typeof req.body.code)
  if (typeof req.body.code === "number") {
    const num = req.body.code.toString();
    const isLastDigit7 = Number(num.split("")[num.length - 1]) !==7;
    
    num.length === 6 & isLastDigit7
      ? res.json( await verificationModel.create(req.body))
      : res.json({ success: false, message: "Code should be of length:6 or the last digit is 7." });
  } else {
    res.json({ success: false, message: "Please enter a number" });
  }

});

router.get("/", async (req, res) => {
  try {
    const data = await verificationModel.findAll();
    res.json(data);
  } catch (err) {
    console.log({ success: false, message: err });
  }
});

export default router;
