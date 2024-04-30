



import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    // Schema of the donation posts
    transaction_hash: {type: String},
    amount_paid: {type: Number, required: true},
    message: {type: String, required: true},
    date_created: {type: Date, required: true},
    source_id: {type: mongoose.Schema.Types.ObjectId},
    destination_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    cause_id: {type: mongoose.Schema.Types.ObjectId, required: true},
});

export default mongoose.model('transactions',transactionSchema);