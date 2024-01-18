require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors({origin: "*"}))
const subscriptionModel = require("./model/subscriptionModel")
const postModel = require("./model/postModel")
//webhook
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.ENDPOINT
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
 async (req, res) => {
   const sig = req.headers['stripe-signature'];
   let event;
   try {
     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
   } catch (err) {
     res.status(400).send(`Webhook Error: ${err.message}`);
     return;
   }
    switch (event.type) {
     case 'charge.succeeded': 
     break;
     case 'payment_intent.succeeded':
       const paymentIntent = event.data.object;
         await subscriptionModel.create({
          userId: paymentIntent.metadata.userId,
          postId: paymentIntent.metadata.postId,
          plan: paymentIntent.metadata.plan,
          paymentMode: paymentIntent.metadata.paymentMode,
          paymentStatus: paymentIntent.metadata.paymentStatus,
          totalAmount: paymentIntent.metadata.totalAmount,
         })
         const post = await postModel.findById(
          paymentIntent.metadata.postId
        );
        post.plan = paymentIntent.metadata.plan
        post.userId = paymentIntent.metadata.userId
       
      const data =  await post.save();
      console.log(data)
      // console.log("metadata",paymentIntent.metadata.plan)
       break;
     case 'payment_method.attached':
       const paymentMethod = event.data.object;
      
       break;
       case 'charge.succeeded': 
       break;
       case 'payment_intent.created':
         break;
     default:
       console.log(`Unhandled event type ${event.type}`);
    }

//     // Return a 200 response to acknowledge receipt of the event
   res.send();
  }
);





app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const connectToMongo = require('./db');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
app.use("/api/subcategory",require("./route/SubCategory"));
app.use("/api/contactus",require('./route/Contact'));
app.use("/api/city",require("./route/City"));

app.use("/api/subscription",require("./route/Subscription"));

// app.use( cors({
//   exposedHeaders: ['X-Total-Count'],
// }));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 500 * 2024 * 1024 },
  })
);
app.use("/api/category",require('./route/Category'));
app.use("/api/post",require("./route/Post"));
app.use("/api/job",require("./route/Job"));
app.use("/api/user", require('./route/Auth'));



   

//     // Handle the event
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         const paymentIntentSucceeded = event.data.object;
//         console.log(paymentIntentSucceeded)
    

//         // const order = await Order.findById(
//         //   paymentIntentSucceeded.metadata.orderId
//         // );
//         // order.paymentStatus = 'received';
//         // await order.save();

//         break;
    
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a 200 response to acknowledge receipt of the event
    
//   //}
// );


// app.post(
//   '/webhook',
//   bodyParser.raw({ type: 'application/json' }),
//   async (req, res) => {
//     const sig = req.headers['stripe-signature'];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//     } catch (err) {
//       res.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }

//     // Handle the event
//     switch (event.type) {
//       case 'checkout.session.completed':
//         const paymentIntentSucceeded = event.data.object;
//   console.log(paymentIntentSucceeded.metadata)
//         // const order = await Order.findById(
//         //   paymentIntentSucceeded.metadata.orderId
//         // );
//         // order.paymentStatus = 'received';
//         // await order.save();

//         break;
//       // ... handle other event types
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     res.send();
//   }
// );







// app.post("/create-payment-intent", async (req, res) => {
//   const { totalAmount, orderId } = req.body;
//   console.log(req.body);

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: totalAmount * 100, //for decimal stripe
//     currency: "inr",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//     metadata: { orderId },
//   });
//   res.json({
//     clientSecret: paymentIntent.client_secret,
//   });
// });








app.listen(process.env.PORT,()=>{
    console.log("Server is connected with",process.env.PORT)
    connectToMongo();
 })