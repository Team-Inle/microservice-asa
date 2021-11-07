// references:
// Multer guide: https://www.youtube.com/watch?v=EVOFt8Its6I
// convert-excel-to-json: https://www.npmjs.com/package/convert-excel-to-json



const path = require("path");
const express = require("express");

// require multer (middleware to handle files uploaded in the body)
const multer = require("multer");
const cors = require("cors");

// import package to handle excel to json
'use strict';
const excelToJson = require('convert-excel-to-json');


// import package to handle json to excel
const jsonToExcel = require('json2xls');


// install fs (file system) to delete files off the server after we've processed them
const fs = require("fs");
const { type } = require("os");


// initial app setup
const app = express();

// debug mode
var isDebugMode = true;

// set port settings
let port = process.env.PORT || 5151;

// use middleware to handle json to excel conversion
app.use(jsonToExcel.middleware)

// install CORS so headers can be accessed
app.use(cors());

// set file storage settings which defines out destination and filename settings
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {

    // save the file into the data folder
    callback(null, "./data");
  },
  filename: (req, file, callback) => {

    // use the current time to create a filename, prepended to the provided filename
    callback(null, Date.now() + "--" + file.originalname);
  },
});

// // Route To Load Index.html page to browser
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// associate the multer middleware with the specific provided file storage settings
const upload = multer({ storage: fileStorageEngine });

// handle a request to upload a json file, process it, then return an excel file
app.post("/json_excel", upload.single("json"), (req, res) => {
  console.log(req.file);

    // crete var to store the json filepath
    var json_filepath = req.file.path;

    // // need to open the file, then parse the content of the file into a json object
    var jsonObjectData = JSON.parse(fs.readFileSync(json_filepath));

    // create new filename
    var new_filename = req.file.originalname;
    new_filename = new_filename.replace(".json", ".xlsx")
    
    // send the resulting excel file back using the new filename
    res.status(200).xls(new_filename, jsonObjectData);
    
    // delete the file from the data storage
    // try {
    //     fs.unlinkSync(json_filepath);
    //     if (isDebugMode) {
    //         console.log("File removed:", json_filepath);
    //     };
    // } catch (err) {
    //     console.error(err);
    // }

});


// handle request to upload an excel file, process it, then return a json file
app.post("/excel_json", upload.single("excel"), (req, res) => {
    if (isDebugMode) {
        console.log(req.file);
    };

    // locate the newest uploaded file
    var excel_data = req.file.path;

    // convert provided excel to json object
    const converted_json_object_result = excelToJson({
        sourceFile: excel_data
    });

    // convert json object to json file
    var json_file_result = JSON.stringify(converted_json_object_result);
    
    // return the converted json file back to the client
    res.status(200).send(json_file_result);

    // delete the file from the data storage
    try {
        fs.unlinkSync(excel_data);
        if (isDebugMode) {
            console.log("File removed:", excel_data);
        };
    } catch (err) {
        console.error(err);
    }

  });


// run server
app.listen(port, () => {
    console.log(`running on port http://localhost:${port}`);
});






// const express = require ("express");

// // middleware for handling / parsing multi-part form data
// var multer = require('multer');

// const fileStorageEngine = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "./data")
//     }, 
//     filename: (req, file, callback) => {
//         callback(null, Date.now() + "--" + file.originalname);
//     },
// });

// const upload = multer({storage: fileStorageEngine});

// // var isJson = require('is-json');

// // var json2xls = require('json2xls');

// const router = express.Router();

// const app = express();

// app.use(express.urlencoded({extended: false}));
// app.use(express.json());

// app.use(upload.array());


// // var fs = require('fs');


// // // import { convertJsonToExcel } from "./xl_json";
// // const EtoJ = require('./json_xl');
// // const JtoE = require('./xl_json');


// // import data from a json
// // const importData = require(".//data.json");

// let port = process.env.PORT || 5151;

// // app.get("/", (req, res) => {
// //     console.log('here');
// //     let excel_file = JtoE.convertJsonToExcel();
// //     res.status(200).send(excel_file);
// // });

// // sends all imported data
// // app.get("/posts", (req, res) => {
// //     res.send(importData);
// // });


// // // accepts an excel file and converts to json
// // app.post("/excel_json", (req, res) => {
// //     var convertedJson = EtoJ.convertExcelToJson(req, res);
// //     res.status(200).send(convertedJson);
// // });


// // accepts a json file and converts to excel
// app.post("/json_excel", upload.single('json'), (req, res) => {

//     console.log(req.file);
//     console.log(req.body);
    
//     var json_data = req.body;



//     // var excel_output = Date.now() + "output.xlsx"

//     // if(isJson(json_data)){
//     //     var xls = json2xls(JSON.parse(json_data));

//     //     fs.writeFileSync(excel_output, xls, 'binary');

//     //     result.download(excel_output, (err) => {
//     //         if(err){
//     //             fs.unlinkSync(excel_output)
//     //             result.send("Unable to download Excel file.")
//     //         }
//     //         fs.unlinkSync(excel_output)
//     //     })
//     // } else {
//     //     result.send("JSON Data is not valid")
//     // }

//     res.status(200).send(json_data);

// });


// app.listen(port, () => {
//     console.log(`running on port http://localhost:${port}`);
// });