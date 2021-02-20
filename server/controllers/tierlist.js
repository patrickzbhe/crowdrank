import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/tierlist.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const findMatch = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const elements = await PostMessage.findById(id);
    const rand = elements.elements.sort(() => 0.5-Math.random()).slice(0,2);
    res.status(200).json({data: rand.concat(elements)});
}

export const sendVote = async (req, res) => {
    const { first, second, id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);
    let found = false;
    for (var i = 0; i < post.votes.length; i++) {
        if (post.votes[i][0] == req.userId) {
            found = true;
            if (post.votes[i][1] > post.elements.length * 2) {
                res.status(400).json({data: 'TOO MANY VOTES'});
                return null;
            }
            post.votes[i][1] += 1

        }
    }
    if (!found) {
        post.votes.push([req.userId, 1]);
    }

    let firstRating = 0;
    let secondRating = 0;

    for (var i = 0; i < post.elements.length; i++) {
        if (post.elements[i]._id == first) {
            firstRating = post.elements[i].rating;
        }
        if (post.elements[i]._id == second) {
            secondRating = post.elements[i].rating;
        }
    } 

    const R1 = 10 ** (firstRating/400);
    const R2 = 10 ** (secondRating/400);

    for (var i = 0; i < post.elements.length; i++) {
        if (post.elements[i]._id == first) {
            post.elements[i].rating = Math.round(firstRating + 32 * (1 - (R1 / (R1 + R2))));
        }
        if (post.elements[i]._id == second) {
            post.elements[i].rating = Math.round(secondRating + 32 * (0 - (R2 / (R1 + R2))));
        }
    } 

    await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json({data: 'Cast'});
}

export default router;