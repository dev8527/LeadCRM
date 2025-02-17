import mongoose from "mongoose";

// Define the lead filters schema
const leadFiltersSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    result_count: { type: Number, default: 0 },
    lead_filters: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

// Create the model from the schema
// const LeadFilters = mongoose.model('LeadFilters', leadFiltersSchema);
export default mongoose.model("LeadFilters", leadFiltersSchema);

// // Export the model
// module.exports = LeadFilters;
