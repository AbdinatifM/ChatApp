import User from "../models/User.js";
import Chat from "../models/Chat.js"



export const addFriend = async(req, res) => {
    console.log("res.body: ", req.body);
    const { friendUsername } = req.body;
    const currentUserId = req.user._id
    try {  
        const friend = await User.findOne({ username: friendUsername });

        if (!friend) {
            return res.status(404).json({ error: "User not found" });
        }

        if (friend._id.toString() === currentUserId.toString()) {
            return res.status(400).json({ error: "You cannot add yourself" });
        }

        if (req.user.friends.includes(friend._id)) {
            return res.status(400).json({ error: "You already friends with this user." });
        }

        await User.findByIdAndUpdate(currentUserId, { $push: { friends: friend._id } });

        await User.findByIdAndUpdate(friend._id, { $push: { friends: currentUserId} });
        
        
        await Chat.create({
            user1: currentUserId,
            user2: friend._id
        }); 

        res.status(200).json({ message: `Added ${friendUsername} as a friend!`})
    } catch (error) {
        res.status(500).json({ error: error});
    }
}


export const getFriends = async(req, res) => {
    const currentUserId = req.user._id
    try {
        const user = await User.findById(req.user._id).populate("friends", "_id username");
        
        const friendsWithChatIds = await Promise.all(
            user.friends.map(async (friend) => {
                let chat = await Chat.findOne({
                    $or: [
                        { user1: currentUserId, user2: friend._id },
                        { user1: friend._id, user2: currentUserId }
                    ]
                });

                return {
                    _id: friend._id,
                    username: friend.username,
                    chatId: chat._id
                };
            })
        );
        return res.status(200).json(friendsWithChatIds);
    } catch (error) {
         res.status(500).json({ error: error});
         console.log(error);
    }
}