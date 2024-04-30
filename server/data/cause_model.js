



import mongoose from 'mongoose';

const causeSchema = new mongoose.Schema({
    // Schema of the donation posts
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    post_content: {type: String, required: true},
    goal_amount: {type: Number, required: true},
    title: {type: String, required: true},
    date_created: {type: Date, required: true},
    urgency: {
        type: String, 
        required: true,
        //can be edited depending on how will the urgency be represented 
        enum: ["High", "Middle", "Low"]
    }, 
    type: {
        type: String, 
        required: true,
        //can be edited depending on the types that will be available in our app
        enum: ["Displacement", "Medical", "Animal", "Environment", "Memorial", "Education", "Nonprofit", "Community", "Fire", "Typhoon", "Flood", "Earthquake"]
    },
    images:[{type:String}],
    existence_status: {type: String}
});

export default mongoose.model('causes',causeSchema);
