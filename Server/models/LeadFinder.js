import mongoose from "mongoose";

// Define the lead finder schema
const leadFinderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    profileId: { type: String, required: true },
    status: { type: Number, default: 0 },
    lookupType: { type: String },
    leadDetails: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

// // Create the model from the schema
// const LeadFinder = mongoose.model('LeadFinder', leadFinderSchema);


export default mongoose.model("LeadFinder", leadFinderSchema);
// Export the model
// module.exports = LeadFinder;
