# Test data node server

# Setup

* add yourdatafile.json into ./data folder
* add a record into ./config.json file 
```
"yoururl": "data/yourdatafile.json"
```
* see examples into ./data folder

# Usage

To install

```
npm install
```

To run application

```
npm start
```

and go to

```
GET http://localhost:3000/yourdataurl

POST http://localhost:3000/yourdataurl

PUT http://localhost:3000/yourdataurl/:id

DELETE http://localhost:3000/yourdataurl/:id
```