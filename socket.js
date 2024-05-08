const { chatModel } = require("./dao/models/chat.model.js");

module.exports = (io) => {
  io.on("connection", async (socket) => {
    console.log(`${socket.handshake.auth.username} se ha conectado`);

    socket.on("disconnect", () => {
      console.log(`${socket.handshake.auth.username} se ha desconectado`);
    });

    socket.on("client_message", async (msg) => {
      let result;
      const username = socket.handshake.auth.username ?? "anonymous";
      const newMessage = {
        username: username,
        message: msg,
        dateTime: new Date(),
      };
      try {
        result = await chatModel.create(newMessage);
      } catch (e) {
        console.error(e);
        return;
      }

      io.emit("server_message", {
        ...newMessage,
        lastRow: result._id.toString(),
      });
    });

    if (!socket.recovered) {
      try {
        const messages = await chatModel.find({});

        messages.forEach((message) => {
          socket.emit("server_message", {
            username: message.username,
            message: message.message,
            dateTime: message.dateTime,
            lastRow: message._id.toString(),
          });
        });


        socket.recovered = true;
      } catch (err) {
        console.error(err);
      }
    }
  });
};