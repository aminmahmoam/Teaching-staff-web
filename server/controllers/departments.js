var express = require('express');
const department = require('../models/department');
var router = express.Router();
var Department = require('../models/department');
const checkAuth = require('../middleware/check-auth');

router.post('/api/departments', checkAuth, function(req, res, next){
    var department = new Department(req.body);
    department.save(function(err, department) {
        if (err) { return res.status(500).send(err); }
        console.log(department.name, "added.");
        return res.status(201).json(department);
    });
});

router.get('/api/departments', checkAuth, function(req, res, next) {
    Department.find(function(err, departments) {
        if (err) { return res.status(500).send(err); }
        res.json({'departments': departments});
        return res.status(200);
    });
});

router.get('/api/departments/:id', checkAuth, function(req, res, next) {
    var id = req.params.id;
    Department.findById(id, function(err, department) {
        if (err) { return res.status(500).send(err); }
        if (department === null) {
            return res.status(404).json({'message': 'Department not found!'});
        }
        return res.status(200).send(department);
    });
});


router.patch('/api/departments/:id', checkAuth, function(req, res,next) {
    var id = req.params.id;
    Department.findById(id, function(err, department) {
        if (err) { return res.status(500).send(err); }
        if (department == null) {
        return res.status(404).json({"message": "Department not found"});
        }
        department.id = (req.body.id || department.id);
        department.name = (req.body.name || department.name);
        department.campus = (req.body.campus || department.campus);
        department.save();
        return res.status(201).json(department);
    });
});

router.put('/api/departments/:id', checkAuth, function(req, res, next) {
    var id = req.params.id;
    Department.findById(id, function(err, department) {
        if (err) { return res.status(500).send(err); }
        if (department == null) {
        return res.status(404).json({"message": "Department not found"});
        }
        department.id = req.body.id;
        department.name = req.body.name;
        department.campus = req.body.campus;
        department.save();
        return res.status(201).json(department);
    });
});

router.delete('/api/departments', checkAuth, function(req,res,next){
    Department.deleteMany(function(err, department) {
        if (err) { return res.status(500).send(err); }
       return  res.status(200).json(department);
    });
});

router.delete('/api/departments/:id', checkAuth, function(req, res, next) {
    var id = req.params.id;
    Department.findOneAndDelete({_id: id}, function(err, department) {
        if (err) { res.status(500).send(err); }
        if (department === null) {
            return res.status(404).json({'message': 'Department not found'});
        }
       return res.status(200).json(department);
    });
});

// task 4.a (filters departments based on their names) ⛔️
router.get("/api/departments", function (req, res, next) {
    var selectedName =req.params.name;
    console.log("finding");
   // Department.find({ name: { $gte: selectedName } }).exec(function (
        Department.find({ name: selectedName}).exec(function (
      err,
      departments
    ) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log("success");
      return res.status(200).json({departments : departments.findAll(d => d.name== selectedName)})
    });
});

module.exports = router;