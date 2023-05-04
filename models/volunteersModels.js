import mongoose from 'mongoose';

const volunteersSchema = mongoose.Schema({

    firstName: { type: String, required: true },

    lastName: { type: String, required: true },
    
    image: { type: String },

    title: { type: String, required: true },

    faculty: { type: String, required: true },

    branch: { type: String, required: true },

    startingDate: { type: Date, required: true },

    endingDate: { type: Date, required: true }


})

export default mongoose.model('Volunteer', volunteersSchema);