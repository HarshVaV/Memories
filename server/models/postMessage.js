import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String, //used to convert IMG-> base64_String
    comments:{
        type:[String],
        default:[]
    },
    likes: {
        type: [String],//user[] that likes currPost
        default: [],
    },
    createdAt: Date
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;