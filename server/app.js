import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path'
import {fileURLToPath} from 'url';
 // Note *** --> used for the to access common js variable of url like filename, dirname
 /** LOCAL IMPORTS */
 import {register} from './controllers/auth.js';
 import {createPost} from './controllers/post.js';
 import authRoutes from './routes/auth.js';
 import userRoutes from './routes/user.js';
 import postRoutes from './routes/post.js';
 import { verifyToken } from './middleware/auth.js';
 import User from './models/User.js';
 import Post from './models/Post.js';
 import {users, posts} from './Data/index.js'
 


/** CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json({limit:"30mb", extended: true}));
app.use(express.urlencoded({limit:"30mb", extended: true}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan('common'));
app.use(cors());
// app.use(express.static("public"))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));


/** FILE STORAGE */
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'public/assets');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

const upload = multer({storage});

/** ROUTES WITH FILES */

app.post('/auth/register', upload.single('picture'), register);
app.post('/posts',verifyToken,upload.single('picture'), createPost )

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

/** MONGODB CONNECTION */
const port = process.env.PORT || 4050;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  app.listen(port, ()=>console.log(`http://localhost:${port}/`));
  //  for getting dummy inputs -> please use it for one call to populate data in your database and Make sure to uncomment  the import above
  // User.insertMany(users);
  // Post.insertMany(posts);
}).catch((error)=>console.log(`${error} did not connect` ));

