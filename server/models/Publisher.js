import mongoose from 'mongoose'

const PublisherSchema = new mongoose.Schema({
    Publisher_Name:{
        type:String,
        required:true
    }
})

const Publisher = mongoose.model('Publisher',PublisherSchema);

export default Publisher; 