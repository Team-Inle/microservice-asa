
const fs = require("fs");

module.exports = {
    convertCSVToJSON: function (pathToFile) {
		csv = fs.readFileSync(pathToFile);
        
        var array = csv.toString().split("\r");
        let result = [];
        let headers = array[0].split(",");

        console.log(headers);

        for (let i = 1; i < array.length - 1; i++) {
            let obj = {}
           
            let values = array[i].split(",")

            // iterate over headers
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = values[j].replace("\n", "");
            }
  
            result.push(obj)
          } 

          return result;
    },

    convertCSVToJSON_ali: function (pathToFile) {
		csv = fs.readFileSync(pathToFile);
        
        var csv_lines_array = csv.toString().split("\r");
        let result_obj = {};
        let headers = csv_lines_array[0].split(",");

        console.log(headers);

        var current_date = null;
        var current_day = null;
        var current_pto = 0;
        var current_time_in = null;
        var current_time_out = null;
        var current_breaks = 0;

        // iterate over lines
        for (let i = 1; i < csv_lines_array.length - 1; i++) {

            // create a current object for each line
            // let current_date_obj = {}
           
            var values = csv_lines_array[i].split(",")

            current_date = values[0];
            // console.log(current_date);
            current_day = values[1];
            // console.log(current_day);
            current_pto = values[2];
            // console.log(current_pto);
            current_time_in = values[3];
            // console.log(current_time_in);
            current_time_out = values[4];
            // console.log(current_time_out);
            current_breaks = values[5];
            // console.log(current_breaks);

            var found = false;
            for (let [date_key, date_value] of Object.entries(result_obj)){
                if (date_key === current_date) {
                    found = true;
                    console.log(result_obj[date_key]);
                    result_obj[date_key].Timecards.push({"In": current_time_in, "Out": current_time_out, "Break": current_breaks});
                } 
            }
            if (!(found)){
                result_obj[current_date] = {"Date": current_date, "Day": current_day, "PTO": current_pto, Timecards: [{"In": current_time_in, "Out": current_time_out, "Break": current_breaks}]}};
            }


            // if (result_obj.hasOwnProperty(current_date)){
            //     console.log('fiound');
            // }
            // for (const array_element of result_array){
            //     if (array_element.hasOwnProperty(values[0])){
            //         found = true;

            //         console.log('if', {"In": current_time_in, "Out": current_time_out, "Break": current_breaks});
            //         array_element.keys()[0].Timecards.push({"In": current_time_in, "Out": current_time_out, "Break": current_breaks})
            //         console.log('end if', array_element);
            //     }
            // }

            // if (!(found)){
            //     var new_result_obj = {};
            //     console.log('else', new_result_obj);
            //     result_array.push ({values[0]: {"In": {current_time_in}, "Out": current_time_out, "Break": current_breaks}});
            //     console.log('end else', new_result_obj);
            // }
            
            
        //   } 

          return result_obj;
    }
}