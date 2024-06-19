const express = require("express");
const db = require("./config/connection");
const routes = require("/routes");
const userRoutes = require("./routes/userRoutes");
const thoughtRoutes = require("./routes/thoughtRoutes");

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}`);
  });
});
