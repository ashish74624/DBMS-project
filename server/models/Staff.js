import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
    Staff_Name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
})

const Staff = mongoose.model('Staff',StaffSchema);

export default Staff ;