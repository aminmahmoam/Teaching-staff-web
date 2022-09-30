var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
var Staff = require('../models/staff');
const jwt= require("jsonwebtoken");
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth')
const cookies = require("cookie-parser")
//const createUser = require( '../helpers/validation');
//const decodeHeader = require( '../middleware/verifyAuth');


router.post('/api/login', (req,res,next) =>{
    Staff.findOne({emailAddress: req.body.emailAddress})
    .exec() 
    .then(staff =>{
     if(staff.length <1){
        return res.status(401 ).json({
            message: 'Authentication failed'
        });
     }
     bcrypt.compare(req.body.password, staff.password, (err, result)=>{
     if(err){
        return res.status(401).json({
            message: 'Authentication failed'
        });
     }
     if (result){
        const token =jwt.sign({
            emailAddress: staff.emailAddress,
            _id: staff._id
        },
        process.env.JWT_KEY,
       {
            expiresIn: "1h"
        });
        //res.cookie("accessToken", token, {
          //  maxAge: 3600000,
        //})
        res.cookie("access-token", token)
        return res.status(200).json({
            message: 'Authentication succussful',
            token: token
        });
    }
    res.status(401).json({
        message:'Authentication failed'
    });
    })
})
    .catch(err =>{
        console.log(err);
        res.status(500)
    })
    
});
router.post('/api/staffs', function(req, res, next){
   var password = req.body.password;
    bcrypt.hash(password, 10, (err,hash) =>{
        if(err){
            return re.status(500);
        }
     else {
      var staff = new Staff({
        _id: new mongoose.Types.ObjectId,
        SSN: req.body.SSN,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        educationalDegree: req.body.educationalDegree,
        role: req.body.role,
        salary: req.body.salary,
        telephone: req.body.telephone,
        emailAddress: req.body.emailAddress,
        address: req.body.address,
        password: hash,
        paymentDate: req.body.paymentDate
      });
      staff.save();
      res.status(201).json(staff);
    }
    });
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
