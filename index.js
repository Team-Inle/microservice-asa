const express = require ("express");
const app = express();


// import { convertJsonToExcel } from "./xl_json";
const EtoJ = require('./json_xl');
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


// accepts an excel file and converts to json
app.post("/excel_json", (req, res) => {
    var convertedJson = EtoJ.convertExcelToJson();
    res.status(200).send(convertedJson);
});


// accepts a json file and converts to excel
app.post("/json_excel", (req, res) => {
    var convertedExcel = JtoE.convertJsonToExcel();
    res.status(200).send(convertedExcel);
});


app.listen(port, () => {
    console.log(`running on port http://localhost:${port}`);
});