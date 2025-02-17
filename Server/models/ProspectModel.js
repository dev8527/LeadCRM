import mongoose from 'mongoose';

const ProspectSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    company: { type: String, required: true },
    lookup_type: { type: Number, enum: [0, 1, 2], required: true }, // Lookup Type (0, 1, 2)
    contact_details: { type: mongoose.Schema.Types.Mixed, default: {} } // JSON field for additional details
}, { timestamps: true });

export default mongoose.model('Prospect', ProspectSchema);
