const express = require ("express");
const app = express();

// import data from a json
const importData = require(".//data.json");

let port = process.env.PORT || 5151;

app.get("/", (req, res) => {
    res.send("Received GET!");
});

// sends all imported data
app.get("/posts", (req, res) => {
    res.send(importData);
});


app.listen(port, () => {
    console.log(`running on port http://localhost:${port}`);
});