var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Get helloworld page
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});

//Get user list page
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function(e, docs) {
    res.render('userlist', {
      "userlist" : docs
    })
  })
})

router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

router.post('/adduser', function(req, res) {
  //The following sets the internal database var
  var db = req.db;
  //Retreives the values from the form
  var userName = req.body.username;
  var userEmail = req.body.useremail;
  //Sets the collection from the database
  var collection = db.get('usercollection');
  //The following submits the information to the database
  collection.insert({
    "username" : userName,
    "email" : userEmail
  }, function (err, doc) {
    if (err) {
      //returns error
      res.send("There was a problem adding the information to the database")
    }
    else {
      //Forwards to the success page
      res.redirect("userlist");
    }
  });
});





module.exports = router;
