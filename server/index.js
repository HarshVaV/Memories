import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

//import routes
    import postRoutes from './routes/posts.js'
    import userRoutes from './routes/user.js'
    import envRoutes from './routes/env.js'
import { fetchGoogleClientId } from './controllers/env.js';

const app =express();
dotenv.config()

//for parsing get/post request. limit=30mb-> as images will be send
    app.use(bodyParser.json({limit:"30mb",extended:true}));
    app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
//for cross-origin-request
    app.use(cors()); 




//call routes (NOTE: positioning of rotuing statement is Imp; must be after parsing-CORS-etc-stuff)
    app.use('/posts',postRoutes);
    app.use('/user',userRoutes);
    app.use('/env',envRoutes);
    

//MONGO-Atlas (cloub DB)
    const CONNECTION_URL=process.env.CONNECTION_URL
    const PORT=process.env.PORT||2000; //either '2000' or 'Heruko-populated-PORT' will be used
    mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=>app.listen(PORT,()=>console.log(`Listening on Port ${PORT}`)))
        .catch((err)=>console.log(err.message));
    // mongoose.set('useFindAndModify', false); Commented-> as causing error

  