import mongoose from 'mongoose';

export const elementSchema = mongoose.Schema({
    title: String,
    image: String,
    rating: Number,
})

export const element = mongoose.model('element', elementSchema);