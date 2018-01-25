const express = require("express");
const bodyParser = require("body-parser");
const model = require("./model/entry");
const action = require("./route/action");
const fileUpload = require("express-fileupload");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(fileUpload());
app.use(express.static('public'));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();    
});

app.get("/", (req, res) => {
    res.send("What would you like to do?")
});

app.post("/add", (req, res) => {

    if(!req.files){
        return res.status(400).send("No files uploaded.");
    }
    
    let image = req.files.gambar;
    let imageName = new Date().getTime() + ".png";

    image.mv("./public/image/" + imageName, function(err){
        if(err){
            return res.status(500).send(err);
        }

        var validEntry = new model.entry(
            req.body.name,
            req.body.price,
            req.body.category,
            "http://localhost:3000/image/" + imageName 
        );

        action.addnew(validEntry);
        res.send(validEntry);
    });
});

app.get("/show", (req, res) => {
    res.send(action.fetch());
});

app.get("/category", (req, res) => {
    res.send(action.category(req.query.cat));
});

app.get("/detail", (req, res) => {
    res.send(action.detail(req.query.id));
});

app.put("/update", (req, res) => {
    var validEntry = new model.entry(
        req.body.name,
        req.body.price,
        req.body.category,
        req.body.image
    );

    res.send(action.update(validEntry,req.body.id));
});

app.post("/addtocart", (req, res) => {

    var validEntry = new model.entry(
        req.body.id,
        req.body.name,
        req.body.price,
        req.body.category,
        req.body.image
    );

    res.send(action.addtocart(validEntry));
});

app.post("/remove", (req, res) => {
    res.send("Bill titled " + action.remove(req.query.id) + " has been deleted.");
});

app.listen(3000);