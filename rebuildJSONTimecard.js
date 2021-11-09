

// const URL = require('url');
const path = require('path');
const fs = require('fs');

module.exports = {
    rebuildJSONTimecard: function (original_json_object_data, end_filename) {
        console.log('rebuildJSONTimecard was run');


        var rebuiltJSON = [{
            "A":"Date",
            "B":"Day",
            "C":"PTO",
            "D":"Time In",
            "E":"Time Out",
            "F":"Breaks"
         }];
          

        // iterate over dates of provided json
        const days = original_json_object_data;
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
                rebuiltJSON.push({
                    "A": current_date, 
                    "B": current_day, 
                    "C": current_pto,
                    "D": current_time_in,
                    "E": current_time_out,
                    "F": current_breaks
                });
            };
                
        }

        // convert JSON object to string
        const data = JSON.stringify(rebuiltJSON);

        // console.log(data);

        let temp_filename = 'temp_' + Date.now() + '_temp.json';

        // write JSON string to a file
        fs.writeFile("./data/" + temp_filename, data, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });    
    

        // obtain the path from the server
        var path_to_final_excel_file = path.join('data/' + temp_filename);


        // final_excel_file_url = URL.createObjectURL(converted_timesheet_excel_path);

        // return the path
        // return final_excel_file_url;
        return temp_filename;
    }
}