const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// ✅ Connect Post Routes
const postRoutes = require('./routes/posts'); // 👈 ADD THIS
app.use('/api/posts', postRoutes);            // 👈 AND THIS

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// ✅ Start the server
const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});

// ✅ Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});