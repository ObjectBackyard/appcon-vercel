



import mongoose from 'mongoose';
import bcrypt from 'bcrypt';




const userSchema = new mongoose.Schema({
    // Schema of the users model
    first_name: {type: String, require: true},
    last_name: {type: String, require: true},
    password: {type: String, minlength: 8, required: true},
    bio: {type: String},
    email: {type: String, required: true},
    stripe_id : {type: String},
    contact_number: {type: String, required: true},
    user_image: {type: String},
    date_created: {type: Date, required: true},
    user_type: {type: String, required: true, enum: ["User", "Admin","Moderator"]},
    suspension_end_date : {type: Date},
    existence_status: {type: String}
});




// hashing of password
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});




export default mongoose.model('users',userSchema);