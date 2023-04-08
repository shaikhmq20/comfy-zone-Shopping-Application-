const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    instance.orders.create(options, (error, order) => {
      if (error) {
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      return res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ ...error, message: "Internal Server Error!" });
  }
});
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_signature, order_id } =
      req.body;
    const sign = order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");
    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Failed signature verification!" });
    }
  } catch (error) {
    res.status(500).json({ ...error, message: "Internal Server Error!" });
  }
});
module.exports = router;
