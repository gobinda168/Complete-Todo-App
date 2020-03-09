const express = require("express");
const app = express();
const connectDb = require("./config1/db");
//init middleware
app.use(express.json({ extended: false }));

//connect Database
connectDb();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.
