var express = require('express');
const department = require('../models/department');
var router = express.Router();
var Department = require('../models/department');
const checkAuth = require('../middleware/check-auth');

router.post('/api/departments', checkAuth, function(req, res, next){
    var department = new Department(req.body);
    department.save()
    .then(result => {
        console.log(result);
        return res.status(201).json({
          message:"Department has been created",
          department: result,
          links:[{
            rel: "All departments",
            type: 'GET',
            hrel: "http://localhost:3000/api/departments/",
          },{
            rel: "self",
            type: 'PATCH',
            hrel:"http://localhost:3000/api/departments/" + result._id,
          },
          {
            rel: "self",
            type: 'GET',
            hrel:"http://localhost:3000/api/departments/" + result._id,
          },
          {
            rel: "self",
            type: 'DELETE',
            hrel:"http://localhost:3000/api/departments/" + result._id,
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

router.get('/api/departments', checkAuth, function(req, res, next) {
    Department.find(function(err, departments) {
        if (err) { return res.status(500).send(err); }
        return res.status(200).json({
            departments: departments,
            links:[
              {
                rel: "create",
                type: 'POST',
                hrel:"http://localhost:3000/api/departments/"
              }
            ]
        })
    });
});

router.get('/api/departments/:id', checkAuth, function(req, res, next) {
    Department.findById({_id: req.params.id}).exec(function(err, department) {
        if (err) { return res.status(500).send(err); }
        if (department === null) {
            return res.status(404).json({'message': 'Department not found!'});
        }
        return res.status(200).json({
            department,
            links:[{
             rel: "All departments",
             type: 'GET',
             hrel: "http://localhost:3000/api/departments/",
           },{
             rel: "self",
             type: 'PATCH',
             hrel:"http://localhost:3000/api/departments/" + department._id,
           },
           { rel: "create",
             type: 'POST',
             hrel:"http://localhost:3000/api/departments/",
             },
             {
             rel: "self",
             type: 'DELETE',
             hrel:"http://localhost:3000/api/departments/" + department._id,
           },
      
         ]
       });
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
        department.save()
        .then(result => {
            console.log(result);
          return res.status(201).json({
            message:"Department has been patched",
            department: result,
            links:[{
              rel: "All departments",
              type: 'GET',
              hrel: "http://localhost:3000/api/departments/",
            },
            { rel: "create",
              type: 'POST',
              hrel:"http://localhost:3000/api/departments/",
            },
            {
              rel: "self",
              type: 'GET',
              hrel:"http://localhost:3000/api/departments/" + result._id,
            },
            {
              rel: "self",
              type: 'DELETE',
              hrel:"http://localhost:3000/api/departments/" + result._id,
            },
      
            ]
    });
});
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
        department.save()
        .then(result => {
            console.log(result);
          return res.status(201).json({
            message:"Department has been put",
            department: result,
            links:[{
              rel: "All departments",
              type: 'GET',
              hrel: "http://localhost:3000/api/departments/",
            },
            { rel: "create",
              type: 'POST',
              hrel:"http://localhost:3000/api/departments/",
            },
            {
              rel: "self",
              type: 'GET',
              hrel:"http://localhost:3000/api/departments/" + result._id,
            },
            {
              rel: "self",
              type: 'DELETE',
              hrel:"http://localhost:3000/api/departments/" + result._id,
            },
      
          ]
          })
      
          })
          .catch(err => {
           console.log(err);
           return res.status(500).json({
            error: err
          })
    });
});
});

router.delete('/api/departments', checkAuth, function(req,res,next){
    Department.deleteMany(function(err, department) {
        if (err) { return res.status(500).send(err); }
        return res.status(200).json({
            department,
            links:[{
             rel: "All departments",
             type: 'GET',
             hrel: "http://localhost:3000/api/departments/",
           },
           { rel: "create",
             type: 'POST',
             hrel:"http://localhost:3000/api/departments/",
             },
         ]
       });

    });
    
});

router.delete('/api/departments/:id', checkAuth, function(req, res, next) {
    var id = req.params.id;
    Department.findOneAndDelete({_id: id}, function(err, department) {
        if (err) { return res.status(500).send(err); }
        if (department === null) {
            return res.status(404).json({'message': 'Department not found'});
        }
        return res.status(200).json({
            department,
            links:[{
             rel: "All departments",
             type: 'GET',
             hrel: "http://localhost:3000/api/departments/",
           },
           { rel: "create",
             type: 'POST',
             hrel:"http://localhost:3000/api/departments/",
             },
             {
              rel: "self",
              type: 'PATCH',
              hrel:"http://localhost:3000/api/departmens/" + department._id,
            },
            {
            rel: "self",
            type: 'DELETE',
            hrel:"http://localhost:3000/api/departments/" + department._id,
          },
         ]
       });
        
    });
});

// task 4.a (filters departments based on their names) 
router.get('/api/filter',(req,res,next)=>{
 var selectedName =req.query.name;
console.log("finding");
   // Department.find({ name: { $gte: selectedName } }).exec(function (
    Department.find({ name: selectedName}).exec(function (err,department) {
  if (err) {
    return res.status(500).send(err);
  }
  console.log("success");
   return res.json({'departments': department});
});

});

module.exports = router;