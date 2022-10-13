var express = require('express');
const department = require('../models/department');
const student = require('../models/student');
var router = express.Router();
var Student = require('../models/student');
const checkAuth = require('../middleware/check-auth');

router.post('/api/students', checkAuth, function(req, res, next){
    var student = new Student(req.body);
    student.save()
    .then(result => {
        console.log(result);
        return res.status(201).json({
          message:"Student has been created",
          student: result,
          links:[{
            rel: "All students",
            type: 'GET',
            hrel: "http://localhost:3000/api/students/",
          },{
            rel: "self",
            type: 'PATCH',
            hrel:"http://localhost:3000/api/students/" + result._id,
          },
          {
            rel: "self",
            type: 'GET',
            hrel:"http://localhost:3000/api/students/" + result._id,
          },
          {
            rel: "self",
            type: 'DELETE',
            hrel:"http://localhost:3000/api/students/" + result._id,
          },
  
        ]
        })
  
        })
        .catch(err => {
         console.log(err);
         return res.status(500).json({
          error: err
         });
        })
});

router.get('/api/students', checkAuth, function(req, res, next) {
    Student.find(function(err, students) {
        if (err) { return res.status(500).send(err);  }
        return res.status(200).json({
            students: students,
            links:[
              {
                rel: "create",
                type: 'POST',
                hrel:"http://localhost:3000/api/students/"
              }
          ]
        })
    });
});

router.get('/api/students/:id', checkAuth, function(req, res, next) {
    var id = req.params.id;
    Student.findById(id, function(err, student) {
        if (err) { return res.status(500).send(err);  }
        if (student === null) {
            return res.status(404).json({'message': 'Student not found!'});
        }
        return res.status(200).json({
            student,
            links:[{
             rel: "All students",
             type: 'GET',
             hrel: "http://localhost:3000/api/students/",
           },{
             rel: "self",
             type: 'PATCH',
             hrel:"http://localhost:3000/api/students/" + student._id,
           },
           { rel: "create",
             type: 'POST',
             hrel:"http://localhost:3000/api/students/",
             },
             {
             rel: "self",
             type: 'DELETE',
             hrel:"http://localhost:3000/api/students/" + student._id,
           },
      
         ]
       });
    });
});


router.patch('/api/students/:id', checkAuth, function(req, res,next) {
    var id = req.params.id;
    Student.findById(id, function(err, student) {
        if (err) { return res.status(500).send(err); }
        if (student == null) {
        return res.status(404).json({"message": "Student not found"});
        }
        student.SSN = (req.body.SSN || student.SSN);
        student.firstName = (req.body.firstName || student.firstName);
        student.lastName = (req.body.lastName || student.lastName);
        student.emailAddress = (req.body.emailAddress || student.emailAddress);
        student.save()
        .then(result => {
            console.log(result);
          return res.status(201).json({
            message:"Student has been patched",
            student: result,
            links:[{
              rel: "All students",
              type: 'GET',
              hrel: "http://localhost:3000/api/students/",
            },
            { rel: "create",
              type: 'POST',
              hrel:"http://localhost:3000/api/students/",
            },
            {
              rel: "self",
              type: 'GET',
              hrel:"http://localhost:3000/api/students/" + result._id,
            },
            {
              rel: "self",
              type: 'DELETE',
              hrel:"http://localhost:3000/api/studnets/" + result._id,
            },
      
          ]
          })
      
          })
          .catch(err => {
           console.log(err);
           return res.status(500).json({
            error: err
           });
          })
    });
});

router.put('/api/students/:id', checkAuth, function(req, res,next) {
    var id = req.params.id;
    Student.findById(id, function(err, student) {
        if (err) { return res.status(500).send(err); }
        if (student == null) {
        return res.status(404).json({"message": "Student not found"});
        }
        
        student.SSN = req.body.SSN;
        student.firstName = req.body.firstName;
        student.lastName = req.body.lastName;
        student.emailAddress = req.body.emailAddress;
        student.save()
        .then(result => {
            console.log(result);
          return res.status(201).json({
            message:"Student has been put",
            student: result,
            links:[{
              rel: "All courses",
              type: 'GET',
              hrel: "http://localhost:3000/api/students/",
            },
            { rel: "create",
              type: 'POST',
              hrel:"http://localhost:3000/api/students/",
            },
            {
              rel: "self",
              type: 'GET',
              hrel:"http://localhost:3000/api/students/" + result._id,
            },
            {
              rel: "self",
              type: 'DELETE',
              hrel:"http://localhost:3000/api/students/" + result._id,
            },
      
          ]
          })
      
          })
          .catch(err => {
           console.log(err);
           return res.status(500).json({
            error: err
           });
          })
       
    });
});

router.delete('/api/students', checkAuth, function(req,res,next){
    Student.deleteMany(function(err, students) {
        if (err) { return res.status(500).send(err);  }
        return res.status(200).json({
            students,
            links:[{
             rel: "All students",
             type: 'GET',
             hrel: "http://localhost:3000/api/students/",
           },
           { rel: "create",
             type: 'POST',
             hrel:"http://localhost:3000/api/students/",
             },
         ]
       });
    });
});

router.delete('/api/students/:id', checkAuth, function(req, res, next) {
    var id = req.params.id;
    Student.findOneAndDelete({_id: id}, function(err, student) {
        if (err) { return res.status(500).send(err);  }
        if (student === null) {
            return res.status(404).json({'message': 'Studnet not found'});
        }
        return res.status(200).json({
            student,
            links:[{
             rel: "All students",
             type: 'GET',
             hrel: "http://localhost:3000/api/students/",
           },
           { rel: "create",
             type: 'POST',
             hrel:"http://localhost:3000/api/students/",
             },
             {
              rel: "self",
              type: 'PATCH',
              hrel:"http://localhost:3000/api/students/" + student._id,
            },
            {
            rel: "self",
            type: 'DELETE',
            hrel:"http://localhost:3000/api/students/" + student._id,
          },
         ]
       });
         
    });
});

module.exports = router;