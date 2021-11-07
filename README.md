# FastRecast: the most reliable file converter you'll ever have the pleasure of meeting.

# To convert a .JSON file to a .xlsx file:

Use the following endpoint: https://fastrecast.herokuapp.com/json_excel

Sample Python Request:

```python
import requests

url = "https://fastrecast.herokuapp.com/excel_json"

payload={}
files=[
  ('excel',('data_format.xlsx',open('/PATH/TO/data.xlsx','rb'),'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'))
]
headers = {
  'Authorization': 'Bearer 702547d3761d435c950ad07e783b18e2',
  'Accept': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text)
```

Sample NodeJs Axios Request:

```javascript
var axios = require("axios");
var FormData = require("form-data");
var fs = require("fs");
var data = new FormData();
data.append("excel", fs.createReadStream("/PATH/TO/data.xlsx"));

var config = {
  method: "post",
  url: "https://fastrecast.herokuapp.com/excel_json",
  headers: {
    Authorization: "Bearer 702547d3761d435c950ad07e783b18e2",
    Accept: "application/json",
    ...data.getHeaders(),
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
```

# Convert a .xlsx or .xls file to a .JSON file:

Use the following endpoint: https://fastrecast.herokuapp.com/excel_json
