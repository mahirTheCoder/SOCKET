require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const router = require("./routes");
const dbConfig = require("./configs/dbConfigs");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

// Routes
app.use(router);
dbConfig(); 

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));


const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Client already saved the message via the REST API (POST /send).
  // We just relay the saved document to EVERYONE (including the
  // sender) so every open tab/browser stays in sync.
  socket.on("send-message", (message) => {
    io.emit("receive-message", message);
  });

  // Client already saved the edit via the REST API (PUT /edit-massage/:id).
  socket.on("edit-message", (message) => {
    io.emit("message-updated", message);
  });

  // Client already soft-deleted via the REST API (DELETE /del-massage/:id).
  socket.on("delete-message", (message) => {
    io.emit("message-deleted", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
