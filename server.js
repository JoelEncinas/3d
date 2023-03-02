require("dotenv").config({ path: "./config.env" }); // needs to be at the top
const express = require("express");
const connectDB = require("./config/db");

// connect to db
connectDB();

const app = express();

// middleware
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.get("/home", (req, res) => {
  res.send("Home");
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// easier to read mongoDB connection custom err handler
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
