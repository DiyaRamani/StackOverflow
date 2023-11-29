import mongoose from 'mongoose'
import Questions from '../models/Questions.js'
import User from '../models/auth.js'
import { getMessaging } from "firebase-admin/messaging";

export const postAnswer = async(req,res) => {
    const{id:_id } = req.params;
    const {userId,noOfAnswers, answerBody, userAnswered} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question Unavailable...")
    }
    updateNoOfAnswers(_id,noOfAnswers)
    try{
        const updatedQuestion = await Questions.findByIdAndUpdate(_id,{$addToSet:{'answer':[{answerBody,userAnswered,userId: userId}]}})
        const point = await User.findByIdAndUpdate(userId,{$inc:{point:30}},{new:true})
        //const point = await User.findById(userId,'point',{new:true})
        const questionOwner = await Questions.findById(_id)
        res.status(200).json(point)
    }catch(error){
        res.status(404).json(error)
    }
} 

const updateNoOfAnswers = async (_id,noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate(_id,{$set:{'noOfAnswers': noOfAnswers}})
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswer = async(req,res) => {
    const {id:_id} = req.params;
    const {answerId, noOfAnswers, userId} = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question Unavailable...")
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send("Question Unavailable...")
    }
    updateNoOfAnswers(_id,noOfAnswers)
    try {
        await Questions.updateOne(
            {_id},
            {$pull:{'answer':{_id:answerId}}}
        )
        const data = await User.findByIdAndUpdate(userId,{$inc:{point:-30}},{new:true})
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}