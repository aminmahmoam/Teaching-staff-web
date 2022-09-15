var express = require('express');
var router = express.Router();
var Staff = require('../models/staff');
//const createUser = require( '../helpers/validation');
//const decodeHeader = require( '../middleware/verifyAuth');

router.post('/api/staffs', function(req, res, next){
    var staff = new Staff(req.body);
    staff.save(function(err, staff) {
        if (err) { return res.status(500).send(err); }
        console.log("New Staff ", staff.SNN, "created");
        res.status(201).json(staff);
    })
});

router.get('/api/staffs', function(req, res, next) {
    Staff.find(function(err, staffs) {
        if (err) { return res.status(500).send(err); }
        res.json({'staffs': staffs });
        res.status(200);
    });
});

router.get('/api/staffs/:id', function(req, res, next) {
    var id = req.params.id;
    Staff.findById(id)
    .populate("courses")
    .exec(function (err, staff) {
        if (err) { return res.status(500).send(err); }
        if (staff === null) {
            return res.status(404).json({'message': 'Staff not found!'});
        }
        return res.status(200).json(staff);
    });
});

router.patch('/api/staffs/:id', function(req, res,next) {
    var id = req.params.id;
    Staff.findById(id, function(err, staff) {
        if (err) { return next(err); }
        if (staff == null) {
        return res.status(404).json({"message": "Staff not found"});
        }
        staff.SSN = (req.body.SSN || staff.SSN);
        staff.firstName = (req.body.firstName || staff.firstName);
        staff.lastName = (req.body.lastName || staff.lastName);
        staff.educationalDegree =  (req.body.educationalDegree || staff.educationalDegree);
        staff.role = (req.body.role || staff.role);
        staff.salary = (req.body.salary || staff.salary);
        staff.telephone =(req.body.telephone || staff.telephone);
        staff.emailAddress = (req.body.emailAddress || staff.emailAddress);
        staff.address = (req.body.address || staff.address);
        staff.save();
        res.json(staff);
    });
});

router.put('/api/staffs/:id', function(req, res,next) {
    var id = req.params.id;
    Staff.findById(id, function(err, staff) {
        if (err) { return next(err); }
        if (staff == null) {
        return res.status(404).json({"message": "Staff not found"});
        }


    staff.SSN = req.body.SSN;
    staff.firstName=  req.body.firstName;
    staff.lastName= req.body.lastName;
    staff.educationalDegree = req.body.educationalDegree;
    staff.role = req.body.role;
    staff.salary= req.body.salary;
    staff.telephone = req.body.telephone;
    staff.emailAddress= req.body.emailAddress;
    staff.address =req.body.address;
    staff.save();
    res.json(staff);
    });
});

router.delete('/api/staffs', function(req,res,next){
    Staff.deleteMany(function(err, staffs) {
        if (err) { return next(err); }
        res.status(200).json(staffs);
    });
});
router.delete('/api/staffs/:id', function(req, res, next) {
    var id = req.params.id;
    Staff.findOneAndDelete({_id: id}, function(err, staff) {
        if (err) { return next(err); }
        if (staff === null) {
            return res.status(404).json({'message': 'Staff not found'});
        }
        res.json(staff);
    });
});


module.exports = router;

