import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user1: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
}, { timestamps: true});


chatSchema.index({user1: 1, user2: 1}, { unique: true });


export default mongoose.model("Chat", chatSchema);