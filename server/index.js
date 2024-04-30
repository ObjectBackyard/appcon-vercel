



import mongoose from 'mongoose';
import express from 'express';
import router from './network/router.js';
import dotenv from 'dotenv'




dotenv.config()
function mongoose_success_callback(){ console.log("The bluetooth device is connected dah succesfalley"); }
function mongoose_failed_callback(error){ console.error('Failed to connect to MongoDB:', error); }
mongoose.connect(process.env.DATABASE_URI)
  .then(mongoose_success_callback)
  .catch(mongoose_failed_callback);




const app = express()


app.use('/cache', express.static('cache'))
app.use((req, res, next) => {
  if (req.path !== '/api/webhook-payment-confirm') {
    express.json()(req, res, next);
  } else {
    console.log('Using webhook route...');
    next();
  }
});

app.use(router);

console.log("listening")
app.listen(process.env.PORT)
// Added this comment to trigger deployment