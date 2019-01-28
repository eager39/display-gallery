const express = require('express')
var bodyParser = require("body-parser")
var cors = require('cors')
var mysql = require('mysql')
const app = express()
var conf = require('./config')
conf = new conf();
const fs = require('fs');


var connection = mysql.createConnection({
   host: 'localhost',
   user: conf.DBuser,
   password: conf.DBpass,
   database: conf.database,
   multipleStatements: true
})



connection.connect(function(err) {
   if (err) {
      console.log("Napaka v povezavi do baze");
   } else {
      console.log('You are now connected...')
   }

})
app.use(cors());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json({
   limit: '50mb'
}));


app.get('/video', function(req, res) {
   var sql = 'SELECT id,name,active FROM video WHERE active=1 LIMIT 1 ';
   connection.query(sql, function(err, results) {
      if (err) throw err
      if (results.length > 0) {
         const path = 'upload/' + results[0].name;
         const stat = fs.statSync(path)
         const fileSize = stat.size
         const range = req.headers.range
         if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1] ?
               parseInt(parts[1], 10) :
               fileSize - 1
            const chunksize = (end - start) + 1
            const file = fs.createReadStream(path, {
               start,
               end
            })
            const head = {
               'Content-Range': `bytes ${start}-${end}/${fileSize}`,
               'Accept-Ranges': 'bytes',
               'Content-Length': chunksize,
               'Content-Type': 'video/mp4',
            }
            res.writeHead(206, head);
            file.pipe(res);
         } else {
            const head = {
               'Content-Length': fileSize,
               'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(path).pipe(res)
         }
      }
   });
});

app.get('/data', function(req, res) {

   let arr = [];
   const fs1 = require('fs').promises;



   var slike = [];
   var data;
   var sql = 'SELECT id,name,active FROM image WHERE active=1 ';
   connection.query(sql, function(err, results) {
      if (err) throw err
      data = results;


      function getImage(image) {
         var imgPath = "upload/" + image;
         return fs1.readFile(imgPath);
      }

      function getAllImages() {
         var promises = [];
         // load all images in parallel
         for (var i = 0; i < data.length; i++) {
            promises.push(getImage(data[i].name));
         }
         // return promise that is resolved when all images are done loading
         return Promise.all(promises);
      }

      getAllImages().then(function(imageArray) {
         for (var i = 0; i < imageArray.length; i++) {
            slike.push({
               "slika": imageArray[i].toString("base64")
            })
         }

         res.send(slike)
      }, function(err) {
         // an error occurred
      });




   });
}, err => {
   console.log("Error " + err);

});

app.post("/image", function(request, response) {
   if (!request.body.avatar) {
      response.json(false)
      return false;
   }
   var filename = request.body.avatar.filename;
   var image = request.body.avatar.value;
   var filetype = request.body.avatar.filetype;
   if (filetype.includes("video")) {
      try {
         fs.writeFile("upload/" + filename, image, "base64", function(err) {
            if (err) {
               return console.log(err);
            }
            var sql = "INSERT INTO video (name,active) VALUES (?,?)";
            connection.query(sql, [filename, 1], function(err, results) {
               console.log("The file was saved!");
               response.json(true);
            });
         });

      } catch (err) {

      }
   } else if (filetype.includes("image")) {
      try {
         fs.writeFile("upload/" + filename, image, "base64", function(err) {
            if (err) {
               return console.log(err);
            }
            var sql = "INSERT INTO image (name,active) VALUES (?,?)";
            connection.query(sql, [filename, 1], function(err, results) {
               console.log("The file was saved!");
               response.json(true);
            });
         });

      } catch (err) {

      }
   } else {
      response.json(false)
   }

});



app.post('/auth', function(request, response) {


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
            user: username
         });
      }
   });


});
app.get("/uredi", function(request, response) {

   var sql = "SELECT id,name,active FROM image;SELECT * FROM video"
   connection.query(sql, function(err, results) {
      console.log(results)
      response.json(results)
   })



})
app.post("/deleteImg", function(request, response) {

   var id = request.body.id
   var sql = "DELETE FROM image WHERE id=?"
   connection.query(sql, [id], function(err, results) {
      if (!err) {
         response.json(true);
      }
   })



})
app.post("/showhideImg", function(request, response) {

   var id = request.body.id
   var active = request.body.active
   var sql = "UPDATE image set active=? WHERE id=?"
   connection.query(sql, [active, id], function(err, results) {
      if (!err) {
         response.json(true);
      }
   })



})
app.post("/showhideVid", function(request, response) {

   var id = request.body.id
   var active = request.body.active
   var sql = "UPDATE video set active=? WHERE id=?"
   connection.query(sql, [active, id], function(err, results) {
      if (!err) {
         response.json(true);
      }
   })



})
app.post("/deleteVid", function(request, response) {

   var id = request.body.id
   var sql = "DELETE FROM video WHERE id=?"
   connection.query(sql, [id], function(err, results) {
      if (!err) {
         response.json(true);
      }
   })



})




app.listen(3000, () => console.log('Example app listening on port 3000!'))