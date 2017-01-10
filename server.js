let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let port = 3000;
let cors = require("cors");

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use('/', express.static(__dirname + '/public'));

app.use(cors());


// get config.json
let config = require('./config.json');

if (config && config.data) {
    for (let key in config.data) {
        if (config.data.hasOwnProperty(key)) {
            createRoute(key, config.data[key]);
        }
    }
}

function createRoute(url, file) {
    let data = require(`./${file}`);

    app.route(`/${url}`)
        .get((req, res)=> {
            res.json(data);
        }).post((req, res)=> {
        let item = req.body;
        item._id = incrementId(data);
        data.push(item);
        res.json(item);
    });


    app.route(`/${url}/:id`)
        .get(function (req, res) {
            let item = findInData(req.params.id, data);
            if (!item) {
                res = res.status(400);
            }
            res.json(item);
        }).put((req, res)=>{
            let item = req.body;
            delete item._id;
            let target = findInData(req.params.id, data);
            if (!target) {
                res = res.status(400);
            }
            if (target) {
                Object.assign(target, item);
            }
            res.json(target);
        }).delete((req, res)=>{
            let target = findInData(req.params.id, data);
            if (!target) {
                res = res.status(400);
            }
            if (target) {
                data = data.filter((datum)=> {
                    return target._id !== datum._id;
                });
            }
            res.json(target);
        });

}

function findInData(id, data) {
    let result = null;
    data.forEach((datum)=> {
        if (datum._id === parseInt(id)) {
            result = datum;
        }
    });
    return result;
}

function incrementId(data) {
    let result = 0;
    data.forEach((datum)=> {
        if (result < datum._id) {
            result = datum._id;
        }
    });
    return ++result;
}


app.listen(port, function () {
    console.log(`Magic on port ${port}...`);
});