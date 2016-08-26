const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient

// The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.
app.use(bodyParser.urlencoded({extended: true}));

// teach it to read JSON data by using the bodyparser.json() middleware
app.use(bodyParser.json());

// tell Express to make this public folder accessible to the public by using a built-in middleware called express.static
app.use(express.static("public"));

// setting the view engine in Express to ejs.
app.set("view engine", "ejs");

var db; //allow us to use the database when we handle requests from the browser.

// start our servers only when the database is connected.
MongoClient.connect("mongodb://gcdeng:gcdeng526@ds031741.mlab.com:31741/crud-express-mongodb", (err, database)=>{
  if (err) {
    return console.log(err);
  }
  db = database;
  // console.log(db);
  app.listen(3000, ()=>{
      console.log("***listening on 3000.");
  });
});

// READ
app.get('/', (req, res)=>{
    console.log("***root");
    // res.sendFile(__dirname+"/index.html"); // host static file

    // var cursor = db.collection("quotes").find(); //We can get the quotes from MongoLab by using the find method that’s available in the collection method.
    // console.log(cursor); // this cursor object contains all quotes from our database.

    // The toArray method takes in a callback function that allows us to do stuff with quotes we retrieved from MongoLab.
    db.collection("quotes").find().toArray((err, result)=>{
      if (err) {
        return console.log(err);
      }
      console.log(result);
      // send HTML file populated with quotes here, ejs file must be placed within a views folder.
      res.render('index.ejs', {quotes: result});
    });
});

// CREATE
app.post('/quotes', (req, res)=>{
  console.log("***quotes");
  console.log(req.body);
  db.collection("quotes").save(req.body, (err, result)=>{
    if (err) {
      return console.log(err);
    }

    console.log("quote saved to database:\n"+result);
    res.redirect("/");
  });
});

// UPDATE
app.put('/quotes', (req, res)=>{
  db.collection('quotes').findOneAndUpdate(
    {name: 'Yoda'},
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    },
    {
      sort: {_id: -1},
      upsert: true
    },
    (err, result) => {
      if (err) {
        return res.send(err);
      }
      res.send(result);
    }
  );
});

// DELETE
app.delete('/quotes', (req, res)=>{
  // Handle delete event here
  db.collection('quotes').findOneAndDelete({name: req.body.name}, (err, result)=>{
      if (err) {
        return res.send(500, err);
      }

      res.json('A darth vadar quote got deleted');
    });
});
