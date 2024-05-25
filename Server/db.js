const mongoose = require('mongoose');

const mongoURL = "mongodb://0.0.0.0:27017/Twitter"


const connectToMongo = () => {
    mongoose.connect(mongoURL).then(()=>console.log("Connected")).catch((e)=>console.log(e.message))
    } 



module.exports = connectToMongo;

