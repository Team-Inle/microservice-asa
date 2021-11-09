// references:
// Multer guide: https://www.youtube.com/watch?v=EVOFt8Its6I
// convert-excel-to-json: https://www.npmjs.com/package/convert-excel-to-json

// custom function to handle timecard excel creation
const JtoET = require('./json_xlTimecard');

// custom function to reorder timecard structure
const rebuildJT = require('./rebuildJSONTimecard');


// import functions to handle conversion from CSV to JSON and vice versa
const CSVtoJSON = require('./csv_json');
const JSONtoCSV = require('./json_csv');

const path = require("path");
const express = require("express");

// require multer (middleware to handle files uploaded in the body)
const multer = require("multer");
const cors = require("cors");

// import package to handle excel to json
'use strict';
const excelToJson = require('convert-excel-to-json');

// include this to handle server file to url
const url = require('url');

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
    try {
        fs.unlinkSync(json_filepath);
        if (isDebugMode) {
            console.log("File removed:", json_filepath);
        };
    } catch (err) {
        console.error(err);
    }

});



// handle request to upload a csv file, process it, then return as a json file
app.post("/csv_json", upload.single("csv"), (req, res) => {
    if (isDebugMode) {
        console.log(req.file);
    };

    // locate the newest uploaded file
    var csv_data = req.file.path;  

    // convert provided excel to json object
    const converted_json_object_result = CSVtoJSON.convertCSVToJSON(csv_data);

    console.log(converted_json_object_result);

    // convert json object to json file
    var json_file_result = JSON.stringify(converted_json_object_result);


    if (isDebugMode) {
        console.log("json_file_result:", json_file_result);
    };

    // result_params = {'url': }
    
    // return the converted json file back to the client
    res.status(200).send(json_file_result);

    // delete the csv file from the data storage
    // try {
    //     fs.unlinkSync(csv_data);
    //     if (isDebugMode) {
    //         console.log("File removed:", csv_data);
    //     };
    // } catch (err) {
    //     console.error(err);
    // }

  });



// handle a request to upload a json file, process it, then return as a csv
app.post("/json_csv", upload.single("json"), (req, res) => {
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
      try {
          fs.unlinkSync(json_filepath);
          if (isDebugMode) {
              console.log("File removed:", json_filepath);
          };
      } catch (err) {
          console.error(err);
      }
  
  });



// // handle a specific request to process a json file for timesheet application, then return an excel file
// app.post("/json_excel_timesheet", upload.single("json"), (req, res) => {
    
//     console.log(req.file);

//     // crete var to store the json filepath
//     var json_filepath = req.file.path;

//     // need to open the file, then parse the content of the file into a json object
//     var jsonObjectData = JSON.parse(fs.readFileSync(json_filepath));

//     // create new filename for the XL file
//     var new_filename = req.file.originalname;
//     new_filename = new_filename.replace(".json", ".xlsx")

//     // write a new file to the server with the provided filename and json object, obtain the path
//     // let converted_timesheet_excel_path = JtoET.convertJsonToExcelTimecard(jsonObjectData, new_filename);
//     // let converted_timesheet_excel_path = JtoET.convertJsonToExcelTimecard(jsonObjectData, new_filename);


//     // let final_excel_file_url = url.pathToFileURL(converted_timesheet_excel_path);
//     let final_excel_file_url = url.createObjectURL(converted_timesheet_excel_path);

//     // read in the new converted file data (have to parse back as JSON to send)

//     // Convert the local excel file back to json object
//     // const converted_json_object_result = excelToJson({
//     //     sourceFile: converted_timesheet_excel_path
//     // });

//     // set up response
//     let final_response_payload = {"excel": final_excel_file_url};

//     // Convert the JSON back as a downloadable excel file 
//     res.status(200).send(final_response_payload);

//     // res.status(200).xls(new_filename, converted_json_object_result);

//     // then convert the NEW json back into to excel, name it as the new filename, and send back to client 
//     // res.status(200).xls(new_filename, convertedJSONTimesheet);
//     // res.status(200).send('complete');


//     // delete the file from the data storage
//     // try {
//     //     fs.unlinkSync(json_filepath);
//     //     if (isDebugMode) {
//     //         console.log("File removed:", json_filepath);
//     //     };
//     // } catch (err) {
//     //     console.error(err);
//     // }
  
//   });


  
// handle a specific request to process a json file for timesheet application, then return an excel file
app.post("/json_excel_timesheet", upload.single("json"), (req, res) => {
    
    console.log(req.file);

    // crete var to store the json filepath
    var json_filepath = req.file.path;

    console.log('json_filepath:', json_filepath);

    // need to open the file, then parse the content of the file into a json object
    var jsonObjectData = JSON.parse(fs.readFileSync(json_filepath));

    // create new filename for the XL file
    var new_filename = req.file.originalname;
    new_filename = new_filename.replace(".json", ".xlsx")

    // write a new JSON file to the server with the provided filename and json object, obtain the path
    let rebuiltJSONTimecardFilepath = rebuildJT.rebuildJSONTimecard(jsonObjectData, new_filename);

    console.log('rebuiltJSONTimecardFilepath:', rebuiltJSONTimecardFilepath);


    //joining path of directory 
    const directoryPath = path.join(__dirname, 'data');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file); 
        });
    });

    console.log('HERE', fs.realpathSync(rebuiltJSONTimecardFilepath, []));

    let read_file = fs.readFileSync(rebuiltJSONTimecardFilepath);

    var rebuiltJSONTimecardObjectData = JSON.parse(read_file);

    // Convert the JSON back as a downloadable excel file 
    res.status(200).xls(new_filename, rebuiltJSONTimecardObjectData);

    // res.status(200).xls(new_filename, converted_json_object_result);

    // then convert the NEW json back into to excel, name it as the new filename, and send back to client 
    // res.status(200).xls(new_filename, convertedJSONTimesheet);
    // res.status(200).send('complete');


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
// // 


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