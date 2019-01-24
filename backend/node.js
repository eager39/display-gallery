const express = require('express')
var bodyParser = require("body-parser")
var cors = require('cors')

var mysql = require('mysql')
const app = express()
var conf = require('./config')
conf=new conf();



var connection = mysql.createConnection({
  host: 'localhost',
  user: conf.DBuser, 
  password: conf.DBpass, 
  database: 'evidenca_zaposlenih'
})



connection.connect(function(err) {
  if(err){
    console.log("Napaka v povezavi do baze");
  }else{
     console.log('You are now connected...')
  }
 
})
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


app.get('/data', function(req, res) {
  
  var sql='SELECT id,username,password FROM user ';
  connection.query(sql, function(err, results) {
    if (err) throw err
    var data = results;
    console.log(data);
    res.send(data);
  });
}, err => {
  console.log("Error " + err);
});
app.post('/auth', function(request, response) {
  
  console.log(request.body);
  var username = request.body.username;
  var password = request.body.password;
  

  var sql = "SELECT * FROM user WHERE username = ? AND password = ?";
  connection.query(sql, [username, password], function(err, results) {
    if (err) {
      res.send(false);
    } else if (results == "") {
      response.status(200).json(false);
    } else {
      /*
      const JWTToken = jwt.sign({
          user: results[0].id
        },
        'asd', {
          expiresIn: 144000
        });*/
      response.status(200).json({
        token: "token",
        user:username
      });
    }
  });
  
 
});




app.listen(3000, () => console.log('Example app listening on port 3000!'))