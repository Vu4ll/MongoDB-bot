const mongoose = require("mongoose");
const { MONGO } = require("../config.js");

mongoose.connect(MONGO, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB bağlandı!");
});

mongoose.connection.on("error", () => {
  console.error("MongoDB bağlanılamadı!");
});

// Vu4ll
