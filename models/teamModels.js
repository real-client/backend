import mongoose from 'mongoose';

const teamSchema = mongoose.Schema({

    firstName: { type: String},

    lastName: { type: String},

    image: { type: String },

    title: { type: String },

    email: { type: String }, 

    linkedin: { type: String },

    role: { type: String }

})

export default mongoose.model('Team', teamSchema);





