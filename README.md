# FastRecast: the most reliable file converter you'll ever have the pleasure of meeting.

# Convert a `.xlsx` file to a `.json` file:

Use the following endpoint: https://fastrecast.herokuapp.com/excel_json

Replace `'/PATH/TO/data.xlsx'` with the path to the `.xlsx` file you want to convert.

Sample Python Request:

```python
import requests

url = "https://fastrecast.herokuapp.com/excel_json"

payload={}
files=[
  ('excel',('data_format.xlsx',open('/PATH/TO/data.xlsx','rb'),'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'))
]
headers = {
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

# To convert a `.json` file to a `.xlsx` file:

Use the following endpoint: https://fastrecast.herokuapp.com/json_excel

Replace `'/PATH/TO/data.json'` with the path to the `.json` file you want to convert.

Sample Python Request:

```python
import requests

url = "https://fastrecast.herokuapp.com/json_excel"

payload={}
files=[
  ('json',('data.json',open('/PATH/TO/data.json','rb'),'application/json'))
]
headers = {
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
data.append("json", fs.createReadStream("/PATH/TO/data.json"));

var config = {
  method: "post",
  url: "https://fastrecast.herokuapp.com/json_excel",
  headers: {
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
