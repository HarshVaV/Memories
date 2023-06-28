import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js'; //always add '.js' at end (for custom file in Node)

export const getPosts=async(req,res)=>{
    // const { page } = req.query;
    const page=1;
    try {
        const LIMIT = 8; //pgSize
        const startIndex = (Number(page) - 1) * LIMIT; // startIdx of every page
        // const total = await PostMessage.countDocuments({});
        const total = 12;

        // use mongoKeyword: to sort via newestPost, not-cross Limit, skip startingPosts
        // const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        console.log('Get-Req sended at', Date())
        const posts = await PostMessage.find({})
        console.log('Response got at ', Date())

        //send: posts, currPgNo, totPg
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
            // return posts[] with valid statusCode
            //returned 'res.josn()' will be used by actionCreator at frontEnd
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    
    try {
        // Step1: searchTerm -> case-ignored regular expression
                //'i': ignoreCase
        const title = new RegExp(searchQuery, "i");
                //Now 'title' is not string-literal, it's now regExp
                //NOTE: RegExp()->JS object and Supported by mongoDB
                
                // get(allPost): if (title=searchTitle) or (tag[] contains any-searchTag)
        //Step2: use 'or' and 'in' to find        
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
        console.log('sended Searched Post', Date())
                
        res.json(posts);
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        console.log('Post returned', Date())
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPost = async (req, res) => {
    const post = req.body;
    const createdAt= new Date().toISOString()
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt })
    // extract 'creator' from userInfo

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
            //returned 'res.josn()' will be used by actionCreator at frontEnd
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
 
export const updatePost= async (req,res) => {
    const { id } = req.params;
    const { title, message, selectedFile, tags } = req.body;
    
    //check post exist
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No post with id: ${id}`);

    const newPost = { title, message, tags, selectedFile, _id: id };
    const updatedPost=await PostMessage.findByIdAndUpdate(id, newPost, { new: true });
        // "new:ture" will ensure that updated-Post is returned

    res.json(updatedPost);
        //returned 'res.josn()' will be used by actionCreator at frontEnd
    
}

export const deletePost= async (req,res) => {
    const { id } = req.params;
    
    
    //check post exist
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No post with id: ${id}`);

    
    await PostMessage.findByIdAndRemove(id);

    res.json({message:'Post deleted'});
    
}

export const likePost= async (req,res) => {
    const { id } = req.params;
    
    if (!req.userId) {
        // user not-loggedIn
        return res.json({ message: "Unauthenticated" });
      }

    
    //check post exist
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No post with id: ${id}`);

    
    //step1: fetchPost
    const post=await PostMessage.findById(id)
    const index = post.likes.findIndex((id) => id ===String(req.userId));
    
    if (index === -1) {
        // newUser, like++
        // add newUser to like[]
      post.likes.push(req.userId);
    } else {
        //oldUser, like--
        //remove
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    console.log('PostLikes',Date())
    res.status(200).json(updatedPost);
        //returned 'res.josn()' will be used by actionCreator at frontEnd
    
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value); //push currCommnet to commnet[]

    // update and return
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    console.log(updatePost)
    console.log('Comment',Date())
    res.json(updatedPost);
};