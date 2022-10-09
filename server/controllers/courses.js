var express = require('express');
var router = express.Router();
var Course = require('../models/course');
var Staff = require('../models/staff');
var Student = require('../models/student');
var Department = require('../models/department');
const checkAuth = require('../middleware/check-auth');

router.post('/api/courses', checkAuth, function(req, res, next){
  var course = new Course(req.body);
  course.save()
      .then(result => {
      console.log(result);
      res.status(201).json({
        message:"Course has been created",
        course: result,
        links:[{
          rel: "All courses",
          type: 'GET',
          hrel: "http://localhost:3000/api/courses/",
        },{
          rel: "self",
          type: 'PATCH',
          hrel:"http://localhost:3000/api/courses/" + result._id,
        },
        {
          rel: "self",
          type: 'GET',
          hrel:"http://localhost:3000/api/courses/" + result._id,
        },
        {
          rel: "self",
          type: 'DELETE',
          hrel:"http://localhost:3000/api/courses/" + result._id,
        },

      ]
      })

      })
      .catch(err => {
       console.log(err);
       res.status(500).json({
        error: err
       });
      })
  });


router.get('/api/courses', checkAuth, function(req, res, next) {
  Course.find(function(err, courses) {
      if (err) { return res.status(500).send(err); }
      res.status(200).json({
        courses: courses,
        decoded: req.userData,
        links:[
          {
            rel: "create",
            type: 'POST',
            hrel:"http://localhost:3000/api/courses/"
          }
      ]
    })
  });
});
 

router.get("/api/courses/:id", checkAuth, function (req, res, next) {
  Course.findOne({ _id: req.params.id })
    .populate("students") //doesn't return the students, returns empty
    .populate("staffs")
    .exec(function (err, course) {
      if (err) {
        return res.status(500).send(err);
      }
      if (course === null) {
        return res.status(404).json({'message': 'Course not found!'});
    }
    return res.status(200).json({
      course,
      links:[{
       rel: "All courses",
       type: 'GET',
       hrel: "http://localhost:3000/api/courses/",
     },{
       rel: "self",
       type: 'PATCH',
       hrel:"http://localhost:3000/api/courses/" + course._id,
     },
     { rel: "create",
       type: 'POST',
       hrel:"http://localhost:3000/api/courses/",
       },
       {
       rel: "self",
       type: 'DELETE',
       hrel:"http://localhost:3000/api/courses/" + course._id,
     },

   ]
 });
    });
});


router.patch('/api/courses/:id', function(req, res,next) {
    var id = req.params.id;
    Course.findById(id, function(err, course) {
        if (err) { return res.status(500).send(err); }
        if (course == null) {
        return res.status(404).json({"message": "Course not found"});
        }
        course.id = (req.body.id || course.id);
        course.name = (req.body.name || course.name);
        course.department = (req.body.department || course.department);
        course.staffs = (req.body.staffs || course.staffs);
        course.students = (req.body.students || course.students);
        course.lectureDates = (req.body.lectureDates || course.lectureDates)
        course.text = (req.body.text || course.text)
        course.save()
        .then(result => {
          console.log(result);
        res.status(201).json({
          message:"Course has been patched",
          course: result,
          links:[{
            rel: "All courses",
            type: 'GET',
            hrel: "http://localhost:3000/api/courses/",
          },
          { rel: "create",
            type: 'POST',
            hrel:"http://localhost:3000/api/courses/",
          },
          {
            rel: "self",
            type: 'GET',
            hrel:"http://localhost:3000/api/courses/" + result._id,
          },
          {
            rel: "self",
            type: 'DELETE',
            hrel:"http://localhost:3000/api/courses/" + result._id,
          },
    
        ]
        })
    
        })
        .catch(err => {
         console.log(err);
         res.status(500).json({
          error: err
         });
        })
    });
});

router.put('/api/courses/:id', checkAuth, function(req, res,next) {
    var id = req.params.id;
    Course.findById(id, function(err, course) {
        if (err) { return res.status(500).send(err); }
      if (course == null) {
        return res.status(404).json({"message": "Course not found"});
        }
        course.id = req.body.id;
        course.name = req.body.name;
        course.department = req.body.department;
        course.staffs = (req.body.staffs || course.staffs);
        course.students = (req.body.students || course.students);
       course.save()
       .then(result => {
        console.log(result);
      res.status(201).json({
        message:"Course has been put",
        course: result,
        links:[{
          rel: "All courses",
          type: 'GET',
          hrel: "http://localhost:3000/api/courses/",
        },
        { rel: "create",
          type: 'POST',
          hrel:"http://localhost:3000/api/courses/",
        },
        {
          rel: "self",
          type: 'GET',
          hrel:"http://localhost:3000/api/courses/" + result._id,
        },
        {
          rel: "self",
          type: 'DELETE',
          hrel:"http://localhost:3000/api/courses/" + result._id,
        },
  
      ]
      })
  
      })
      .catch(err => {
       console.log(err);
       res.status(500).json({
        error: err
       });
      })
    });
});


router.delete('/api/courses', checkAuth, function(req,res,next){
    Course.deleteMany(function(err, course) {
        if (err) { return res.status(500).send(err); }
        return res.status(200).json({
          course,
          links:[{
           rel: "All courses",
           type: 'GET',
           hrel: "http://localhost:3000/api/courses/",
         },
         { rel: "create",
           type: 'POST',
           hrel:"http://localhost:3000/api/courses/",
           },
       ]
     });
    });
});


router.delete('/api/courses/:id', checkAuth, function(req, res, next) {
    var id = req.params.id;
    Course.findOneAndDelete({_id: id}, function(err, course) {
        if (err) {res.status(500).send(err); }
        if (course === null) {
            return res.status(404).json({'message': 'Course not found'});
        }
        return res.status(200).json({
          course,
          links:[{
           rel: "All courses",
           type: 'GET',
           hrel: "http://localhost:3000/api/courses/",
         },
         { rel: "create",
           type: 'POST',
           hrel:"http://localhost:3000/api/courses/",
           },
           {
            rel: "self",
            type: 'PATCH',
            hrel:"http://localhost:3000/api/courses/" + course._id,
          },
          {
          rel: "self",
          type: 'DELETE',
          hrel:"http://localhost:3000/api/courses/" + course._id,
        },
       ]
     });
       
    });
});

//task 3 
router.get('/api/courses/:id/students', checkAuth, function(req, res, next){
    Course.findOne({_id: req.params.id})
    .populate('students').exec(function(err, course) {
        if(err){ return res.status(500).send(err);}
        if(course == null){
            return res.status(404).json({'message': 'Course not found'});
        }
       console.log(course.students);
       res.status(200).json({students: course.students});
    });
});

//task 3 
router.get("/api/courses/:co_id/students/:st_id", checkAuth, function (req, res, next) {
    Course.findOne({ _id: req.params.co_id })
      .populate({path: "students", 
        match: { _id: { $eq: req.params.st_id } },
      })
      .exec(function (err, course, student) {
        if (course === null || student === null) {
          return res.status(404).json({'message': 'Not found!'});
      }
        if (err) {
          return res.status(500).send(err); 
        }
        
        console.log(course.students);
        return res.status(200).send(course.students);
      });
});

  //task 3 
router.delete("/api/courses/:co_id/students/:student_id", checkAuth, function (req, res, next) {
  Course.findByIdAndUpdate({_id: req.params.co_id})
  .populate("students")
  .exec(function (err, course, student){
    if(err) {
      return res.status(500).send(err);
    }
    if(course === null || student === null){
      return res.status(404).json({message: "Not found!"});
    }
    course.students.pull({_id: req.params.student_id});
    course.save();
    return res.status(200).send(course.students);
  });
});

router.delete("/api/courses/:id/students", checkAuth, function (req, res, next) {
  Course.findByIdAndUpdate({_id: req.params.id})
  .populate("students")
  .exec(function (err, course){
    if(err) {
      return res.status(500).send(err)
    }
    if(course === null){
      return res.status(404).json({message: "Not found!"});
    }
  course.students.splice(0, course.students.length);
  course.save();
  return res.status(200).send(course);
  })
})

//task 3 
router.post("/api/courses/:id/students", function (req, res, next) {
    Course.findById(req.params.id, function (err, course) {
      if (err) {
        return res.status(500);
      }
      if (course == null) {
        return res.status(404).json({ message: "Course not found" });
      }
      var student = new Student(req.body);
      student.save(function (err) {
        if (err) {
          return res.status(500);
        }
        console.log("Student " + student.firstName + " created.");
      });
      course.students.push(student);
      course.save();
      console.log("Student added to ", course.firstName, " ", student.firstName);
      return res.status(201).json(course);
    });
});

//task 3
router.post("/api/courses/:id/departments", checkAuth, function (req, res, next) {
    Course.findById(req.params.id, function (err, course) {
      if (err) {
        return res.status(500);
      }
      if (course == null) {
        return res.status(404).json({ message: "Course not found" });
      }
      var department = new Department(req.body);
      department.save(function (err) {
        if (err) {
          return res.status(500);
        }
        console.log("Department " + department.name + " saved.");
      });
      course.department = department;
      course.save();
      console.log("departments of ", course.firstName, " ", department.name);
      return res.status(201).json(course);
    });
});

  //task 3
router.get("/api/courses/:id/departments", checkAuth, function (req, res, next) {
    Course.findOne({_id: req.params.id}).populate('department').exec(function(err, course) {
        if(err){ return res.status(500).send(err);}
        if(course == null){
            return res.status(404).json({'message': 'Course not found'});
        }
       console.log('Department of this course is %s', course.department);
      return  res.status(200).send(course.department);
    });
});
  

  //task 4.a (sorts all the courses by descending names) 
router.get('/api/sort',checkAuth,function(req, res, next) {
  var sortedCourses =[];
    Course.find(function(err, courses) {
      if(err){
        return res.status(500).send(err);
      }
      for (var i=0; i<courses.length; i++) {
           sortedCourses.push([courses[i].name, courses[i]]);
      }
      sortedCourses.sort();
   /*   (function(a,b){
        return b[0]-a[0];
      });
      */
      res.json(sortedCourses);
      res.status(200);
    });

});
  //task 4.a (field selection) ⛔️
router.get('/api/selection', function(req, res, next) {
      Course.find(function(err, courses) {
          if (err) { return res.status(500).send(err);  }
          res.json({'courses': courses});
         return res.status(200);
    });
});


module.exports = router;