
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
    }
}