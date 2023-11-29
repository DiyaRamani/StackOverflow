import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answer.js'
import videoRoutes from './routes/video.js'
import tokenRoutes from './routes/token.js'
import subRoutes from './routes/subscribe.js'
/* import {initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import * as admin from 'firebase-admin'
import serviceAccount from './react-app-435f5-firebase-adminsdk-vcfn0-943541a7d4.json' */

const app = express();
dotenv.config()
app.use(express.json({limit:'30mb',extended: true}))
app.use(express.urlencoded({limit:"30mb", extended: true}))
app.use('/uploads',express.static(path.join('uploads')))

app.use(cors())

app.get('/',(req,res) => {
    res.send("This is a stack overflow clone API")
})

app.use('/user',userRoutes)
app.use('/questions',questionRoutes)
app.use('/answer',answerRoutes)
app.use('/video',videoRoutes)
app.use('/token',tokenRoutes)
app.use('/subscribe',subRoutes)

const PORT =process.env.PORT || 5000

const CONNECTION_URL = "mongodb+srv://diyaramani:diya@cluster0.rhxmsl3.mongodb.net/"

mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology :true})
.then(()=>app.listen(PORT, () => {console.log(`server running on port on ${PORT}`)}))
.catch((err)=> console.log(err.message));
