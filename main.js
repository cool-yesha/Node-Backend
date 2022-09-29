const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require('http');




const app = express();

// setup the server port
app.set('port', process.env.PORT || 5000);

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());


app.use(express.static("./public"))
app.use("/images", express.static(path.join(__dirname, '/public/images')));


// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get("/", (req, res) => {
    res.send("Hello World");
});

const adminRoutes = require("./app/routes/admin.route");

app.use("/api/admin/", adminRoutes);


//-------------😎😎😎✨✨✨✨✨✨✨✨✨✨✨✨✨💚💙💙🌈🔥🌈💙💙💚✨✨✨✨✨✨✨✨✨✨✨✨✨✨😎😎😎------------------------


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// listen to the port
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});