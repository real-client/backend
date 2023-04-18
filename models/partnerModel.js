import mongoose from 'mongoose';
const {Schema, model}= mongoose;
const partnerSchema = new Schema({
   
     name: {
        type: String,
        required: true,
        unique: [true,"name already exist"],
    },
     logo: {
        type: String,
        required: true,
    },
   
},
{timestamps:true},
{
    collection: 'partner'
});

const partnerModel = model('partner', partnerSchema);
export default partnerModel;