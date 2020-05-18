const express = require("express");
const app = express();
const path = require("path");
// Middleares
const middleares = require("./middleware/middleware");
middleares(app);

// Routers
const routers = require("./router/router");
routers(app);

// Database connacted
const connectDB = require("./config/DB");
connectDB();

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// App start on port 5000
const PORT = process.env.PORT | 5000;
app.listen(PORT, () => console.log(`Server Start on Port ${PORT}`));
