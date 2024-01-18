const subscriptin = require("../model/subCategoryModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const CheckoutSession = async (req, res) => {
  console.log(req.body.name)
  try {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        // line_items: [
        //   {
        //     name: 'Golden',
        //     amount: 499 * 100,
        //     currency: 'usd',
        //     quantity: 1,
        //   },
        // ],
        // payment_intent_data: {
        //       metadata: {
        //         userId: "123456",
        //         postId: "123456"
        //       },
        //     },
        line_items: req.body.items.map((item) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                description: item.description,
               
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity
          }
        }),
        payment_intent_data: {
          metadata: {
            "userId": req.body.userId,
            "postId": req.body.postId,
            "plan": req.body.plan,
            "totalAmount": req.body.totalAmount,
            "paymentStatus": "received",
            "paymentMode": "card"
          }
        },
        success_url: "https://sokhtamon-frontend.vercel.app/",
        cancel_url: "https://sokhtamon-frontend.vercel.app/cancel"
      });
      res.status(200).json({url: session.url})
  } catch (error) {
    res.status(500).send(error.message)
  }
};
module.exports = {
  CheckoutSession
};