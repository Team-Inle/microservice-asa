// // // contains functions for processing an Excel worksheet and converting it to a JSON file

// // var data = "a,b,c\n1,2,3".split("\n").map(function(x) { return x.split(","); });

// // // import this to convert Excel worksheet and converting it to a JSON file
// // const XLSX = require('xlsx');

// // function make_book() {
// // 	var ws = XLSX.utils.aoa_to_sheet(data);
// // 	var wb = XLSX.utils.book_new();
// // 	XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
// // 	return wb;
// // }

// // function get_data(req, res, type) {
// // 	var wb = make_book();
// // 	/* send buffer back */
// // 	res.status(200).send(XLSX.write(wb, {type:'buffer', bookType:type}));
// // }

// // function get_file(req, res, file) {
// // 	var wb = make_book();
// // 	/* write using XLSX.writeFile */
// // 	XLSX.writeFile(wb, file);
// // 	res.status(200).send("wrote to " + file + "\n");
// // }


// // function load_data(file) {
// // 	var wb = XLSX.readFile(file);
// // 	/* generate array of arrays */
// // 	data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header:1});
// // 	console.log(data);
// // }

// // function post_data(req, res) {
// // 	var keys = Object.keys(req.files), k = keys[0];
// // 	load_data(req.files[k].path);
// // 	res.status(200).send("ok\n");
// // }

// // function post_file(req, res, file) {
// // 	load_data(file);
// // 	res.status(200).send("ok\n");
// // }

// 'use strict';
// const excelToJson = require('convert-excel-to-json');
 
// const result = excelToJson({
//     sourceFile: 'SOME-EXCEL-FILE.xlsx'
// });

// // export function convertJsonToExcel() {
// //     return "hello";
// // }

// module.exports = {
//     convertJsonToExcel: function (req) {
// 		var json_data = req.body.json

// 		var excel_output = Date.now() + "output.xlsx"

// 		if(isJson(json_data)){
// 			var xls = json2xls(JSON.parse(json_data));

// 			fs.writeFileSync(excel_output, cls, 'binary');

// 			result.download(excel_output, (err) => {
// 				if(err){
// 					fs.unlinkSync(excel_output)
// 					result.send("Unable to download Excel file.")
// 				}
// 				fs.unlinkSync(excel_output)
// 			})
// 		} else {
// 			result.send("JSON Data is not valid")
// 		}
//         console.log('convertJsonToExcel was run');
//         return "FastRecast just converted Json to Excel";
//     }
// }