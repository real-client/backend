import mongoose from 'mongoose';
const {Schema, model}= mongoose;
const opportunitySchema = new Schema({
   
     type: {
        type: String,
        required: true,
    },
     capacity: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    deadline_date: {
        type: Date,
        required: true,
    },
    startup_date: {
        type: Date,
        required: true,
    },
    goals: {
        type: String,
        required: true,
    },
    target_audience: {
        type: String,
        required: true,
    },
    partners: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    agenda: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
   
},
{timestamps:true},
{
    collection: 'opportunity'
});

const opportunityModel = model('opportunity', opportunitySchema);
export default opportunityModel;