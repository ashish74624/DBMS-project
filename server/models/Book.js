import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
    Author_Name:{
        type:String,
        required:true
    },
    Book_Title:{
        type:String,
        required:true
    },
    Publisher_Name:{
        type:String,
        required:true
    },
    No_Of_Copies:{
        type:Number
    },
    Edition:{
        type:Number,
        required:true
    }
});

const Book = mongoose.model('Book',BookSchema);

export default Book;