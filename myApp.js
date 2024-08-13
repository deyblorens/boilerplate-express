let express = require("express");
let app = express();
require("dotenv").config();

//console.log("Hello World");

//app.get("/", (req, res) => {
//  res.send("Hello Express");
//});

// Logger middleware function
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next(); // Call next() to pass control to the next middleware/route handler
});

// API endpoint for GET /name
app.route("/name").get((req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;
  const fullName = `${firstName} ${lastName}`;
  res.json({ name: fullName });
});

// Echo server route
app.get("/:word/echo", (req, res) => {
  const word = req.params.word; // Extract the word from the URL
  res.json({ echo: word }); // Respond with the JSON object
});

// Serve the index.html file on the root route
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Serve static files from the "public" directory
app.use("/public", express.static(__dirname + "/public"));

// Handle the /json route
app.get("/json", (req, res) => {
  let message = "Hello json";

  // Check if the MESSAGE_STYLE environment variable is set to "uppercase"
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase(); // Transform the message to uppercase
  }

  // Send the JSON response with the appropriate message
  res.json({ message: message });
});

// Chain middleware function and final handler for the '/now' route
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString(); // Add current time to req.time
    next(); // Proceed to the next handler in the chain
  },
  (req, res) => {
    res.json({ time: req.time }); // Respond with the time in JSON format
  }
);

module.exports = app;
