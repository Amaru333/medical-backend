const express = require("express");
require("dotenv/config");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

const corsOptions = {
  exposedHeaders: "auth-token",
};
app.use(cors(corsOptions));
app.use(express.json());
const PORT = process.env.PORT || 3002;

const userRoute = require("./routes/users/userRoute");
app.use("/api/users", userRoute);

app.listen(PORT, () => console.log("Listening to port 3002"));
