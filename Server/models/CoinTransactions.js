import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    coins_used: Number,
    transaction_type: String,
    timestamp: Date,
});


export default mongoose.model("CoinTransactions", transactionSchema);
