const io = require('socket.io');
const user = require('./models/user');
module.exports = async (server) => {
    _io = io(server);
    _io.on('connection', (socket) => {
        
        socket.on('userJoined',async (data)=>{
            let usr = await user.findById(data.userId);
            usr.sockets.push(socket.id);
            await usr.save();
            // console.log(usr);
            const msg = {
                name: "Chat Owner",
                socketId: socket.id,
                message: `${data.name} Joined the Chat!`,
                color:"#69c181"
            }
            socket.broadcast.emit('toAll',msg);
        })

        socket.on('toAll', (message) => {
            socket.emit('toAll',{...message, color:"#7fcd91"});
            socket.broadcast.emit('toAll',message)
        })

        socket.on('disconnect',async (message) => {
            let u = await user.updateOne({
                sockets:{    
                    $elemMatch:{$in:[socket.id]}
                }
            },{
                $pullAll: {sockets: [socket.id] }
            });
            console.log("HERE",u);
            // await user.updateOne({
            //     sockets:{    
            //         $elemMatch:{$in:[socket.id]}
            //     }
            // },{
            //     sockets:{
            //         $pullAll:[socket.id]
            //     }
            // });
            const msg = {
                name: "Chat Owner",
                message:`${socket.id} left the Chat!`,
                color: "#fc3a52"
            }
            _io.emit('toAll',msg)
        })

    })
}