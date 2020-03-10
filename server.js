const express = require("express");
const app = express();
const connectDB = require("./config/db");
//init middleware
app.use(express.json({ extended: true }));

//connect Database
connectDB();

//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/task"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.
