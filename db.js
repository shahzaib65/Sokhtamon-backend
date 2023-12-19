require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const connectToMongo = () => {
    mongoose.connect(process.env.DATABASE)

    .then((data)=> 
        console.log(`connection established`))
        .catch((err) => {
            console.log(err.message);
            
        })
    } 
module.exports = connectToMongo
