var express = require('express');
var app = express();
var fs = require("fs");
var users;
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


fs.readFile(__dirname + "/" + "user.json", 'utf8', function (err, data) {
    console.log(data);
    users = JSON.parse(data);
});

app.get('/listUsers', function (req, res) {
    res.end(JSON.stringify(users, null, 2));
})

app.post('/addUser', function (req, res) {
    console.log(req.body.user);
    var user = JSON.parse(req.body.user);
    users[req.body.name] = user;
    res.end(req.body.name + ' : ' + user);
});


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})