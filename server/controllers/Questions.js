import Questions from '../models/Questions.js'
import User from '../models/auth.js'
import mongoose from 'mongoose'

/* export const AskQuestion = async (req,res) => {
    const postQuestionData = req.body;
    const postQuestion = new Questions(postQuestionData);
    try{
        const q = check(postQuestionData.userId)
        console.log(q)
        if(q === true){
            await postQuestion.save();
            const point = await User.findByIdAndUpdate(postQuestionData.userId,{$inc:{point:10}},{new:true})
            res.status(200).json(point)
        }else if(q === false){
            res.status(200).json('0')
        }
    }catch(error){
        console.log(error)
        res.status(409).json("Couldn't post  new questionm");
    }
} */
export const AskQuestion = async (req,res) => {
    const postQuestionData = req.body;
    const postQuestion = new Questions(postQuestionData);
    try{
        const data = await User.findById(postQuestionData.userId)
        const sub = data.subscription
        //console.log(sub)
        if(Math.abs(data.quetiontimer - Date.now)>24*60*60*1000){
            await User.findByIdAndUpdate(postQuestionData.userId,{$set:{'quetiontimer':Date.now}})
            if(sub === 0){await User.findByIdAndUpdate(postQuestionData.userId,{$set:{'noOfQuetions':1}})}
            if(sub === 1){await User.findByIdAndUpdate(postQuestionData.userId,{$set:{'noOfQuetions':5}})}
            if(sub === 2){await User.findByIdAndUpdate(postQuestionData.userId,{$set:{'noOfQuetions':1000}})}
        }
        if(data.noOfQuetions>0){
            await User.findByIdAndUpdate(postQuestionData.userId,{$inc:{noOfQuetions:-1}})
            await postQuestion.save();
            const point = await User.findByIdAndUpdate(postQuestionData.userId,{$inc:{point:10}},{new:true})
            res.status(200).json(point)
        }else{
            res.status(200).json('0')
        }
    }catch(error){
        console.log(error)
        res.status(409).json("Couldn't post  new questionm");
    }
}

export const getAllQuestions = 
async (req,res) =>{
    try{
        const questionList = await Questions.find();
        res.status(200).json(questionList);
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const deleteQuestion = async (req,res) => {
    const{id:_id} = req.params;
    const {userId} = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question Unavailable...")
    }
    try {
        await Questions.findByIdAndRemove(_id);
        const point = await User.findByIdAndUpdate(userId,{$inc:{point:-10}},{new:true})
        res.status(200).json(point)
    } catch (error) {
        res.status(404).json({message : "Error Occurred"})
    }
}

export const voteQuestion = async(req,res) => {
    const {id: _id} = req.params
    const{value,userId} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question Unavailable...")
    }
    try {
        const question = await Questions.findById(_id)
        const userIdposted = question.userId
        const upIndex = question.upVote.findIndex((id) =>id === String(userId))
        const downIndex = question.downVote.findIndex((id) =>id === String(userId))
        let point;

        if (value === 'upVote'){
            if(downIndex !== -1){
                question.downVote = question.downVote.filter((id) => id !== String(userId))
                point = await User.findByIdAndUpdate(userIdposted,{$inc:{point:20}})
            }
            if(upIndex === -1){
                question.upVote.push(userId)
                point = await User.findByIdAndUpdate(userIdposted,{$inc:{point:20}})
            }else{
                question.upVote = question.upVote.filter((id) => id!==String(userId))
                point = await User.findByIdAndUpdate(userIdposted,{$inc:{point:-20}})
            }
        }
        else if (value === 'downVote'){
            if(upIndex !== -1){
                question.upVote = question.upVote.filter((id) => id !== String(userId))
                point = await User.findByIdAndUpdate(userIdposted,{$inc:{point:-20}})
            }
            if(downIndex === -1){
                question.downVote.push(userId)
                point = await User.findByIdAndUpdate(userIdposted,{$inc:{point:-20}})
            }else{
                question.downVote = question.downVote.filter((id) => id !== String(userId))
                point = await User.findByIdAndUpdate(userIdposted,{$inc:{point:20}})
            }
        }
        await Questions.findByIdAndUpdate(_id,question)
        res.status(200).json(point)

    } catch (error) {
        res.status(404).json({message:"Id not Found"})
    }
}

/* const check = async(id) => {
    const data = await User.findById(id)
    const sub = data.subscription
    //console.log(sub)
    if(Math.abs(data.quetiontimer - Date.now)>24*60*60*1000){
        await User.findByIdAndUpdate(id,{$set:{'quetiontimer':Date.now}})
        if(sub === 0){await User.findByIdAndUpdate(id,{$set:{'noOfQuetions':1}})}
        if(sub === 1){await User.findByIdAndUpdate(id,{$set:{'noOfQuetions':5}})}
        if(sub === 2){await User.findByIdAndUpdate(id,{$set:{'noOfQuetions':1000}})}
        return true
    }else{
        if(data.noOfQuetions>0){
            await User.findByIdAndUpdate(id,{$inc:{noOfQuetions:-1}})
            return true
        }
        else{
            return false
        }
    }
} */