# FastRecast: the most reliable file converter you'll ever have the pleasure of meeting.

# Convert a `.csv` file to receive a `.json` as a response:

Use the following endpoint: https://fastrecast.herokuapp.com/csv_json

Replace `'/PATH/TO/data.csv'` with the path to the `.csv` file you want to convert.

Sample Python Request:

```python
import requests

url = "https://fastrecast.herokuapp.com/csv_json"

payload={}
files=[
  ('csv',('data.csv',open('/PATH/TO/data.csv','rb'),'text/csv'))
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
data.append("csv", fs.createReadStream("/PATH/TO/data.csv"));

var config = {
  method: "post",
  url: "https://fastrecast.herokuapp.com/csv_json",
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

# To convert a `.json` file to a `.csv` file, first you must submit a POST request tob obtain a download URL:

Use the following endpoint: https://fastrecast.herokuapp.com/json_csv

Replace `'/PATH/TO/data.json'` with the path to the `.json` file you want to convert.

Sample Python POST Request:

```python
import requests

url = "https://fastrecast.herokuapp.com/json_csv"

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
var request = require("request");
var fs = require("fs");
var options = {
  method: "POST",
  url: "https://fastrecast.herokuapp.com/json_csv",
  headers: {
    Accept: "application/json",
  },
  formData: {
    json: {
      value: fs.createReadStream("/PATH/TO/data.json"),
      options: {
        filename: "/PATH/TO/data.json",
        contentType: null,
      },
    },
  },
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
```

# Then, following the POST request, you must submit an additional GET request to download a converted file from the FastRecast server:

Use the following endpoint: https://fastrecast.herokuapp.com/download?file={filename}

Replace `'URL'` with the URL provided as the response to your initial post request.

Sample Python Request:

```python
import requests

url = 'URL'

payload={}
files={}}
headers = {
  'Accept': 'application/json'
}

response = requests.request("GET", url, headers=headers, data=payload, files=files)

print(response.text)
```

Sample NodeJS Request:

```js
var axios = require("axios");
var FormData = require("form-data");
var data = new FormData();

var config = {
  method: "get",
  url: "URL",
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

<!---
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
-->
