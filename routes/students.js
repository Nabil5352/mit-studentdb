var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

/* GET first page. */
router.route('/')
//GET all students
.get(function(req, res, next) {
    //retrieve all student info from databse
    mongoose.model('Student').find({}, function (err, students) {
          if (err) {
              return console.error(err);
          } else {
              res.format({
                html: function(){
                    res.render('students/index', {
                          title: 'All Students',
                          "students" : students
                      });
                },
                json: function(){
                    res.json(infophotos);
                }
            });
          }     
    });
})

//POST
.post(function(req, res) {
    var name = req.body.name;
    var roll = req.body.roll;
    var batch = req.body.batch;
    var session = req.body.session;
    var gender = req.body.gender;
    var doa = req.body.dob;
    //call the create function for our database
    mongoose.model('Student').create({
        name : name,
        roll : roll,
        batch : batch,
        session : session,
        gender : gender,
        doa : doa
    }, function (err, student) {
          if (err) {
              res.send("There was a problem adding the information to the database.");
          } else {
              console.log('POST creating new student: ' + student);
              res.format({
                html: function(){
                    res.location("students");
                    res.redirect("/students");
                },
                json: function(){
                    res.json(student);
                }
            });
          }
    })
});

/* ADD NEW */
router.get('/new', function(req, res) {
    res.render('students/new', { title: 'Add New Student' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Student').findById(id, function (err, student) {
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        } else {
            req.id = id;
            next(); 
        } 
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Student').findById(req.id, function (err, student) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + blob._id);
        if (typeof query !== 'undefined' && query !== null){
           var studentdoa = blob.dob.toISOString();
            studentdoa = studentdoa.substring(0, studentdoa.indexOf('T'));
        } else {
          var studentdoa = "No date given";
        }
        
        res.format({
          html: function(){
              res.render('blobs/show', {
                "studentdoa" : studentdoa,
                "student" : student
              });
          },
          json: function(){
              res.json(student);
          }
        });
      }
    });
  });


//GET the individual info by Mongo ID
router.get('/:id/edit', function(req, res) {
    mongoose.model('Student').findById(req.id, function (err, student) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            //Return the blob
            console.log('GET Retrieving ID: ' + student._id);
            //format the date properly for the value to show correctly in our edit form
          var studentdoa = student.doa.toISOString();
          studentdoa = studentdoa.substring(0, studentdoa.indexOf('T'))
            res.format({
                //HTML response will render the 'edit.jade' template
                html: function(){
                       res.render('students/edit', {
                          title: 'Student' + stidemt._id,
                          "studentdoa" : studentdoa,
                          "student" : student
                      });
                 },
                json: function(){
                       res.json(student);
                 }
            });
        }
    });
});


//PUT
router.put('/:id/edit', function(req, res) {
    var name = req.body.name;
    var roll = req.body.roll;
    var batch = req.body.batch;
    var session = req.body.session;
    var gender = req.body.gender;
    var doa = req.body.dob;

    mongoose.model('Student').findById(req.id, function (err, blob) {
        //update it
        student.update({
            name : name,
            roll : roll,
            batch : batch,
            session : session,
            gender : gender,
            doa : doa
        }, function (err, studentID) {
          if (err) {
              res.send("There was a problem updating the information to the database: " + err);
          } 
          else {
                  res.format({
                      html: function(){
                           res.redirect("/students/" + student._id);
                     },
                     json: function(){
                           res.json(blob);
                     }
                  });
           }
        })
    });
});


//DELETE
router.delete('/:id/edit', function (req, res){
    mongoose.model('Student').findById(req.id, function (err, student) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            student.remove(function (err, student) {
                if (err) {
                    return console.error(err);
                } else {
                    console.log('DELETE removing ID: ' + student._id);
                    res.format({
                        //HTML returns us back to the main page, or you can create a success page
                          html: function(){
                               res.redirect("/students");
                         },
                         json: function(){
                               res.json({message : 'deleted',
                                   item : student
                               });
                         }
                      });
                }
            });
        }
    });
});

module.exports = router;