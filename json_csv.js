// contains function for processing json data and converting it to csv file

const inputFileName = '1636511715321--data.json';
const outputFileName = '1636511715321--data.csv';


const fs = require("fs");

// // RAW works to conver ANY json to ANY csv 
// // import this to convert json to csv
// const { readFile, writeFile } = require('fs').promises;

// const csv_data = require('./data/1636511715321--data.json');

// async function parseJSONFile (fileName) {
//     try {
//       const file = await readFile('./data/' + fileName);
//       return JSON.parse(file);
//     } catch (err) {
//       console.log(err);
//       process.exit(1);
//     }
//   }

//   function arrayToCSV (data) {
//     csv = data.map(row => Object.values(row));
//     csv.unshift(Object.keys(data[0]));
//     return `"${csv.join('"\n"').replace(/,/g, '","')}"`;
//   }


//   async function writeCSV (fileName, data) {
//     try {
//         await writeFile(fileName, data, 'utf8'); 
//     } catch (err) {
//       console.log(err);
//       process.exit(1);
//     }
//   }


//   (async () => {
//     const data = await parseJSONFile(inputFileName);
//     const CSV = arrayToCSV(data);
//     await writeCSV('./data/' + outputFileName, CSV);
//   console.log(`Successfully converted ${outputFileName}!`);
// })();


























// const URL = require('url');

module.exports = {
    convertJSONtoCSV_ali: function (json_object_data, outfile_name) {
      
       // write the header row date, day, PTO, Time In Time Out and Breaks
        const headers = ['Date','Day','PTO','Time In','Time Out','Breaks'];

        var csv_string = "";

        // add the headers
        csv_string += headers.join(",") + "\r\n";


        // skip the headers (i=1), and itearate over the days
        const days = json_object_data;
        for (let i=1; i < days.length; i++) {
            // for each date, save the date, day and PTO
            var current_date = days[i].Date;
            var current_day = days[i].Day;
            var current_pto = days[i].PTO;

            // iterate over timecards within the given day
            for (let j=0; j < days[i].Timecards.length; j++) {
                // for each timecard, write a row to the excel file
                var current_time_in = days[i].Timecards[j].In;
                var current_time_out = days[i].Timecards[j].Out;
                var current_breaks = days[i].Timecards[j].Break;

                // use the date, day, PTO, Time In Time Out and Breaks
                var current_row = [current_date, current_day, current_pto, current_time_in, current_time_out, current_breaks];

                // add the row data to the csv string
                csv_string += current_row.join(",") + "\r\n";
                };

            // need to reset the date day and PTO
            current_date = current_day = null;
            current_pto = 0

            };

        // console.log(csv_string);

        // now, just need to write the CSV to the file on the server
        fs.writeFileSync("./data/" + outfile_name + ".csv", csv_string);
      
    }
       
}

        // console.log('convertJsonToExcelTimecard was run');
        
        // // create a new workbook
        // var Excel = require('exceljs');

        // // A new Excel Work Book
        // var workbook = new Excel.Workbook();

        // // Some information about the Excel Work Book.
        // workbook.creator = 'Asa LeHolland';
        // workbook.lastModifiedBy = '';
        // workbook.created = new Date();
        // workbook.modified = new Date();
        // workbook.lastPrinted = new Date();

        // // Create a sheet
        // var sheet = workbook.addWorksheet('Sheet1');

        // // write the header row date, day, PTO, Time In Time Out and Breaks
        // sheet.columns = [
        //     { header: 'Date', key: 'date' },
        //     { header: 'Day', key: 'day' },
        //     { header: 'PTO', key: 'pto' },
        //     { header: 'Time In', key: 'time_in' },
        //     { header: 'Time Out', key: 'time_out' },
        //     { header: 'Breaks', key: 'breaks' }
        // ]              

        // // iterate over dates of provided json
        // const days = json_object_data;
        // for (let i=0; i < days.length; i++) {
        //     // for each date, save the date, day and PTO
        //     var current_date = days[i].Date;
        //     var current_day = days[i].Day;
        //     var current_pto = days[i].PTO;

        //     // iterate over timecards
        //     for (let j=0; j < days[i].Timecards.length; j++) {
        //         // for each timecard, write a row to the excel file
        //         var current_time_in = days[i].Timecards[j].In;
        //         var current_time_out = days[i].Timecards[j].Out;
        //         var current_breaks = days[i].Timecards[j].Break;

        //         // use the date, day, PTO, Time In Time Out and Breaks
        //         sheet.addRow({
        //             date: current_date, 
        //             day: current_day, 
        //             pto: current_pto,
        //             time_in: current_time_in,
        //             time_out: current_time_out,
        //             breaks: current_breaks
        //         });
        //     };
                
        // }

            
        
        // // save and close the Excel file
        // workbook.xlsx.writeFile("./data/" + end_filename)
        // .then(function() {
        //     // Success Message
        //     console.log('success')
        // });

        // // obtain the path from the server
        // var path_to_final_excel_file = "./data/" + end_filename;


        // // final_excel_file_url = URL.createObjectURL(converted_timesheet_excel_path);

        // // return the path
        // // return final_excel_file_url;
        // return path_to_final_excel_file;
