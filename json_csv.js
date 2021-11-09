// contains functions for processing json data and converting it to Excel worksheet

// reference: creating excel file using exceljs
// https://vlemon.com/tutorial/electron-js/electron-js-how-to-create-an-excel-file

// import this to convert json to xls
const XLSX = require('xlsx');

// const URL = require('url');

module.exports = {
    convertJsonToExcelTimecard: function (json_object_data, end_filename) {
        console.log('convertJsonToExcelTimecard was run');
        
        // create a new workbook
        var Excel = require('exceljs');

        // A new Excel Work Book
        var workbook = new Excel.Workbook();

        // Some information about the Excel Work Book.
        workbook.creator = 'Asa LeHolland';
        workbook.lastModifiedBy = '';
        workbook.created = new Date();
        workbook.modified = new Date();
        workbook.lastPrinted = new Date();

        // Create a sheet
        var sheet = workbook.addWorksheet('Sheet1');

        // write the header row date, day, PTO, Time In Time Out and Breaks
        sheet.columns = [
            { header: 'Date', key: 'date' },
            { header: 'Day', key: 'day' },
            { header: 'PTO', key: 'pto' },
            { header: 'Time In', key: 'time_in' },
            { header: 'Time Out', key: 'time_out' },
            { header: 'Breaks', key: 'breaks' }
        ]              

        // iterate over dates of provided json
        const days = json_object_data;
        for (let i=0; i < days.length; i++) {
            // for each date, save the date, day and PTO
            var current_date = days[i].Date;
            var current_day = days[i].Day;
            var current_pto = days[i].PTO;

            // iterate over timecards
            for (let j=0; j < days[i].Timecards.length; j++) {
                // for each timecard, write a row to the excel file
                var current_time_in = days[i].Timecards[j].In;
                var current_time_out = days[i].Timecards[j].Out;
                var current_breaks = days[i].Timecards[j].Break;

                // use the date, day, PTO, Time In Time Out and Breaks
                sheet.addRow({
                    date: current_date, 
                    day: current_day, 
                    pto: current_pto,
                    time_in: current_time_in,
                    time_out: current_time_out,
                    breaks: current_breaks
                });
            };
                
        }

            
        
        // save and close the Excel file
        workbook.xlsx.writeFile("./data/" + end_filename)
        .then(function() {
            // Success Message
            console.log('success')
        });

        // obtain the path from the server
        var path_to_final_excel_file = "./data/" + end_filename;


        // final_excel_file_url = URL.createObjectURL(converted_timesheet_excel_path);

        // return the path
        // return final_excel_file_url;
        return path_to_final_excel_file;
    }
}