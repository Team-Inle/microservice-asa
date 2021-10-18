// contains functions for processing json data and converting it to Excel worksheet


// import this to convert json to xls
const XLSX = require('xlsx');

// 
const convertJsonToExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet();
}