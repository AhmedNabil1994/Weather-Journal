// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
const port = 3000;
/* Middleware*/
// Cors for cross origin allowance
//Here we are configuring express to use body-parser as middle-ware.
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Initialize the main project folder
app.use(express.static("website"));
// Setup Server
const server = app.listen(port, () => {
  console.log(`server is running at:localhost:${port}`);
});

app.post("/projectData", (req, res) => {
  projectData = {
    apiData: req.body.apiData,
    content: req.body.content,
    date: req.body.date,
    temperature: req.body.temperature,
    zipCode: req.body.zipCode,
  };
  res.send(projectData);
  console.log("All data:", projectData);
});
app.get("/all", (req, res) => {
  res.send(projectData);
});
