import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema({
    Student_Id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
    ID:{
        type:Number
    },
    Student_Name:{
        type:String,
        required:true
    },
    Book_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    },
    Book_Title:{
        type:String,
        required:true
    },
    Issue_Date:{
        type:Date
    },
    Return_Date:{
        type:Date
    }
})

const Loan= mongoose.model('Loan',LoanSchema);

export default Loan;