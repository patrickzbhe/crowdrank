import mongoose from 'mongoose';
import userSchema from './user.js';
import {element,elementSchema} from './element.js';

const tierlistSchema = mongoose.Schema({
    title: String,
    name: String,
    creator: String,
    elements: [elementSchema],
    cover: String,
    votes: [],
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var tierlist = mongoose.model('PostMessage', tierlistSchema);

export default tierlist;