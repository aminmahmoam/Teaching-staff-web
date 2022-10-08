var express = require('express');
const department = require('../models/department');
const student = require('../models/student');
var router = express.Router();
var Student = require('../models/student');
const checkAuth = require('../middleware/check-auth');

router.post('/api/students', checkAuth, function(req, res, next){
    var student = new Student(req.body);
    student.save(function(err, student) {
        if (err) { return res.status(500).send(err);  }
        return res.status(201).json(student);
    })
});

router.get('/api/students', checkAuth, function(req, res, next) {
    Student.find(function(err, students) {
        if (err) { return res.status(500).send(err);  }
        res.json({'students': students});
        return res.status(200);
    });
});

router.get('/api/students/:id', checkAuth, function(req, res, next) {
    var id = req.params.id;
    Student.findById(id, function(err, student) {
        if (err) { return res.status(500).send(err);  }
        if (student === null) {
            return res.status(404).json({'message': 'Student not found!'});
        }
        return res.status(200).send(student);
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
        student.save();
        return res.status(201).json(student);
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
        student.save();
        return res.status(201).json(student);
    });
});

router.delete('/api/students', checkAuth, function(req,res,next){
    Student.deleteMany(function(err, students) {
        if (err) { return res.status(500).send(err);  }
        res.status(200).json(students);
    });
});

router.delete('/api/students/:id', checkAuth, function(req, res, next) {
    var id = req.params.id;
    Student.findOneAndDelete({_id: id}, function(err, student) {
        if (err) { return res.status(500).send(err);  }
        if (student === null) {
            return res.status(404).json({'message': 'Studnet not found'});
        }
       return  res.status(200).json(student);
    });
});

module.exports = router;