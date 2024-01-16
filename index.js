require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors({origin: "*"}))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const connectToMongo = require('./db');


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


const endpointSecret = process.env.ENDPOINT_SECRET;

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;

        // const order = await Order.findById(
        //   paymentIntentSucceeded.metadata.orderId
        // );
        // order.paymentStatus = 'received';
        // await order.save();

        break;
    
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);


app.listen(process.env.PORT,()=>{
    console.log("Server is connected with",process.env.PORT)
    connectToMongo();
 })