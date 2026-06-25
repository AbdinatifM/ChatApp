import Message from "../models/Message.js";


const initChatSocket = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);


        socket.on('join chat', (chatId) => joinChat(socket, chatId));
        socket.on('private message', (payload) => privateMessage(io, socket, payload));
        socket.on('disconnect', () => disconnect(socket));
    });
};


async function joinChat(socket, chatId) {
    socket.join(chatId);
    const history =  await Message
                    .find({ chatId })
                    .sort({ createdAt: 1 });
    socket.emit('chat history', history);
}

async function privateMessage(io, socket, {chatId, message}) {
    if (!chatId || !message.trim()) return;

    const savedMessage = await Message.create({
        chatId: chatId,
        sender: socket.user._id,
        content: message,
    });
        
    io.to(chatId).emit('private message', savedMessage);
}

function disconnect(socket) {
    console.log(`User disconnected: ${socket.id}`);
}


export default initChatSocket;