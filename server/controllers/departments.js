var express = require('express');
var router = express.Router();
var Department = require('../models/department');



router.post('/api/departments', function(req, res, next){
    var department = new Department(req.body);
    department.save(function(err, department) {
        if (err) { return res.status(500).send(err); }
        console.log(department.name, "added.");
        return res.status(201).json(department);
    });
});

router.get('/api/departments', function(req, res, next) {
    Department.find(function(err, departments) {
        if (err) { return res.status(500).send(err); }
        res.json({'departments': departments});
        return res.status(200);
    });
});

router.get('/api/departments/:id', function(req, res, next) {
    var id = req.params.id;
    Department.findById(id, function(err, department) {
        if (err) { return res.status(500).send(err); }
        if (department === null) {
            return res.status(404).json({'message': 'Department not found!'});
        }
        return res.status(200).send(department);
    });
});


router.patch('/api/departments/:id', function(req, res,next) {
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

router.put('/api/departments/:id', function(req, res, next) {
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

router.delete('/api/departments', function(req,res,next){
    Department.deleteMany(function(err, department) {
        if (err) { return res.status(500).send(err); }
       return  res.status(200).json(department);
    });
});

router.delete('/api/departments/:id', function(req, res, next) {
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
router.get("/api/departments?name=:name", function (req, res, next) {
    console.log("finding");
    Department.find({ name: { $all: [req.params.name] } }).exec(function (
      err,
      department
    ) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log("success");
      return res.status(200).json(department);
    });
});

router.get("/api/departments", async function(req, res, err) {
    //let limit = 5;
    let offset = 0;
    Department
      .findAndCountAll()
      .then(department => {
        console.log("hello world", req.body);
        //let page = (req.body.page && req.body.page) || 1;
        let sortfield = req.body.sortfield;
        let sortOrder = req.body.sortOrder;
        //let pages = Math.ceil(data.count / limit);
        //offset = limit * (page - 1);
        Department
          .findAll({
            attributes: ["campus", "name"],
            //limit: limit,
            //offset: offset
            order: [[sortfield || 'id', sortOrder || 'DESC']] // fixed at here
          })
          .then(deoartment => {
            res.status(200).json({
              
              message: "Data has been retrieved",
              result: users,
            });
          });
      })
      .catch(err => {
        res.status(500).json({
          status: 0,
          message: "Data is not retrieved from database"
        });
      });
  });

module.exports = router;