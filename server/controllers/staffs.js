var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
var Staff = require('../models/staff');
var Course = require('../models/course');
const jwt= require("jsonwebtoken");
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

router.post('/api/login', (req,res,next) =>{
    Staff.findOne({emailAddress: req.body.emailAddress})
    .exec() 
    .then(staff =>{
     if(staff.length < 1){
        return res.status(401).json({
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
        process.env.JWT_KEY);
        console.log(token)
        return res.status(200).json({
            message: 'Authentication succussful',
            token: token
        });
    }
    return res.status(401).json({
        message:'Authentication failed'
    });
    })
})
    .catch(err =>{
        console.log(err);
        return res.status(500)
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
      staff.save()
      .then(result => {
        console.log(result);
      return res.status(201).json({
        message:"Staff has been created",
        staff: result,
        links:[{
          rel: "All staffs",
          type: 'GET',
          hrel: "http://localhost:3000/api/staffs/",
        },{
          rel: "self",
          type: 'PATCH',
          hrel:"http://localhost:3000/api/staffs/" + result._id,
        },
        {
          rel: "self",
          type: 'GET',
          hrel:"http://localhost:3000/api/staffs/" + result._id,
        },
        {
          rel: "self",
          type: 'DELETE',
          hrel:"http://localhost:3000/api/staffs/" + result._id,
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
    }
    });
});

router.get('/api/staffs', checkAuth, function(req, res, next) {
    Staff.find(function(err, staffs) {
        if (err) { return res.status(500).send(err); }
          return res.status(200).json({
            staffs,
            links:[
              {
                rel: "create",
                type: 'POST',
                hrel:"http://localhost:3000/api/staffs/"
              }
          ]
        })

});
});

router.get('/api/staffs/:id', checkAuth, function(req, res, next) {
    var id = req.params.id;
    Staff.findById(id)
    .populate("courses")
    .exec(function (err, staff) {
        if (err) { return res.status(500).send(err); }
        if (staff === null) {
            return res.status(404).json({'message': 'Staff not found!'});
        }
        return res.status(200).json({
         staff,
         links:[{
          rel: "All staffs",
          type: 'GET',
          hrel: "http://localhost:3000/api/staffs/",
        },{
          rel: "self",
          type: 'PATCH',
          hrel:"http://localhost:3000/api/staffs/" + staff._id,
        },
        { rel: "create",
          type: 'POST',
          hrel:"http://localhost:3000/api/staffs/",
          },
          {
          rel: "self",
          type: 'DELETE',
          hrel:"http://localhost:3000/api/staffs/" + staff._id,
        },

      ]
    });
    });
});

router.patch('/api/staffs/:id', checkAuth, function(req, res,next) {
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
        staff.paymentDates = (req.body.paymentDates || staff.paymentDates )
    staff.save()
    .then(result => {
      console.log(result);
    return res.status(201).json({
      message:"Staff has been patched",
      staff: result,
      links:[{
        rel: "All staffs",
        type: 'GET',
        hrel: "http://localhost:3000/api/staffs/",
      },
      { rel: "create",
        type: 'POST',
        hrel:"http://localhost:3000/api/staffs/",
      },
      {
        rel: "self",
        type: 'GET',
        hrel:"http://localhost:3000/api/staffs/" + result._id,
      },
      {
        rel: "self",
        type: 'DELETE',
        hrel:"http://localhost:3000/api/staffs/" + result._id,
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

router.put('/api/staffs/:id', checkAuth, function(req, res,next) {
    var id = req.params.id;
    Staff.findById(id, function(err, staff) {
        if (err) { res.status(500).json({
          error: err
         }); }
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
    staff.save()
    .then(result => {
      console.log(result);
    return res.status(201).json({
      message:"Staff has been put",
      staff: result,
      links:[{
        rel: "All staffs",
        type: 'GET',
        hrel: "http://localhost:3000/api/staffs/",
      },
      { rel: "create",
        type: 'POST',
        hrel:"http://localhost:3000/api/staffs/",
      },
      {
        rel: "self",
        type: 'GET',
        hrel:"http://localhost:3000/api/staffs/" + result._id,
      },
      {
        rel: "self",
        type: 'DELETE',
        hrel:"http://localhost:3000/api/staffs/" + result._id,
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

router.delete('/api/staffs', checkAuth, function(req,res,next){
    Staff.deleteMany(function(err, staffs) {
        if (err) {  return res.status(500).send(err); }
        return res.status(200).json({
          staffs,
          links:[{
           rel: "All staffs",
           type: 'GET',
           hrel: "http://localhost:3000/api/staffs/",
         },
         { rel: "create",
           type: 'POST',
           hrel:"http://localhost:3000/api/staffs/",
           },
       ]
     });
    });
});
router.delete('/api/staffs/:id', checkAuth, function(req, res, next) {
    var id = req.params.id;
    Staff.findOneAndDelete({_id: id}, function(err, staff) {
        if (err) { return res.status(500).send(err); }
        if (staff === null) {
            return res.status(404).json({'message': 'Staff not found'});
        }
        return res.status(200).json({
          staff,
          links:[{
           rel: "All staffs",
           type: 'GET',
           hrel: "http://localhost:3000/api/staffs/",
         },
         { rel: "create",
           type: 'POST',
           hrel:"http://localhost:3000/api/staffs/",
           },
           {
            rel: "self",
            type: 'PATCH',
            hrel:"http://localhost:3000/api/staffs/" + staff._id,
          },
          {
          rel: "self",
          type: 'DELETE',
          hrel:"http://localhost:3000/api/staffs/" + staff._id,
        },
       ]
     });
});
});

//task 3 
router.get("/api/staffs/:st_id/courses/:co_id", checkAuth, function (req, res, next) {
      Staff.findOne({ _id: req.params.st_id })
        .populate({path: "courses", 
          match: { _id: { $eq: req.params.co_id } },
        })
        .exec(function (err, staff, course) {   
          if (course === null || staff === null) {
            return res.status(404).json({'message': 'Not found!'});
        }
          if (err) {
            return res.status(500).send(err);   //returns this error
          } 

          console.log(staff.courses);
          return res.status(200).send(staff.courses);
          
      });
  });
  
  
  //task 3
  router.get('/api/staffs/:id/courses', checkAuth, function(req, res, next){
      var id = req.params.id;
      Staff.findOne({_id: id}).populate('courses').exec(function(err, staff) {
          if(err){ return res.status(500).send(err);}
          if(staff == null){
              return res.status(404).json({'message': 'Staff not found'});
          }
         console.log('Courses of this staff are %s', staff.courses);
        return  res.status(200).json({courses: staff.courses});
      });
  });
  
  //task 3
  router.post("/api/staffs/:id/courses", checkAuth, function (req, res, next) {
      Staff.findById(req.params.id, function (err, staff) {
        if (err) {
          return res.status(500);
        }
        if (staff == null) {
          return res.status(404).json({ message: "Staff not found" });
        }
        var newCourse = new Course(req.body);
        newCourse.save(function (err) {
          if (err) {
            return res.status(500);
          }
          console.log("Course " + newCourse.name + " created.");
        });
        staff.courses.push(newCourse);
        staff.save();
        console.log("Course added to ", staff.firstName, " ", newCourse.name);
        return res.status(201).json(staff);
      });
    });
    
module.exports = router;
