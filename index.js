const express = require ("express");
const app = express();


// import { convertJsonToExcel } from "./xl_json";

const JtoE = require('./xl_json');


// import data from a json
const importData = require(".//data.json");

let port = process.env.PORT || 5151;

app.get("/", (req, res) => {
    let excel_file = JtoE.convertJsonToExcel();
    res.status(200).send(excel_file);
});

// sends all imported data
app.get("/posts", (req, res) => {
    res.send(importData);
});


app.listen(port, () => {
    console.log(`running on port http://localhost:${port}`);
});