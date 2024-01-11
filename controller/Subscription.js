const subscriptin = require("../model/subCategoryModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const CheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map((item) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity
          }
        }),
        success_url: "http://localhost:5000/success",
        cancel_url: "http://localhost:5000/cancel"
      });
      res.json({url: session.url})
  } catch (error) {
    res.status(500).send(error.message)
  }
};

module.exports = {
  CheckoutSession,
};