const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);


app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const locations = {};

io.on("connection", (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);


  socket.on("userLocation", (coords) => {
    locations[socket.id] = coords;
    io.emit("allLocations", locations);
  });

  socket.on("disconnect", () => {
   delete locations[socket.id];
    io.emit("allLocations", locations);
  });
});

server.listen(3001, () => {
  console.log("Server running at port 3001");
});
