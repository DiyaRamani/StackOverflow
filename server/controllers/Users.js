import mongoose from "mongoose";
import User from '../models/auth.js'

export const getAllUsers = async  (req,res) =>{
    try {
        const allUsers = await User.find();
        const allUserDetail = []
        allUsers.forEach(users => {
            allUserDetail.push({_id: users._id,name: users.name, about: users.about, tags: users.tags, joinedOn: users.joinedOn, point: users.point, subscription: users.subscription})
        });
        res.status(200).json(allUserDetail);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const updateProfile = async (req,res) => {
    const {id: _id} =req.params
    const {name, about, tags} = req.body
    try {
        const updatedProfile = await User.findByIdAndUpdate(_id,{$set:{'name':name,'about':about,'tags':tags}},{new:true})
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(405).json({message:error.message})
    }
}
export const subscription = async (req,res) => {
    const {id: _id} =req.params
    const {value} = req.body
    try {
        const updatedProfile = await User.findByIdAndUpdate(_id,{$set:{'subscription':value}},{new:true})
        if(value === 0){await User.findByIdAndUpdate(_id,{$set:{'noOfQuetions':1}})}
        if(value === 1){await User.findByIdAndUpdate(_id,{$set:{'noOfQuetions':5}})}
        if(value === 2){await User.findByIdAndUpdate(_id,{$set:{'noOfQuetions':1000}})}
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(405).json({message:error.message})
    }
}