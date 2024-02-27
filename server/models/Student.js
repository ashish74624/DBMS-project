import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
      Student_ID: {
        type: Number,
        required: true,
        unique: true 
    },
    Student_Name:{
        type:String,
        required:true
    },
    Department:{
        type:String,
        required:true
    },
    Semester:{
        type:Number
    },
    Student_Phone:{
        type:Number
    }
})

const Student = mongoose.model('Student',StudentSchema);

export default Student;