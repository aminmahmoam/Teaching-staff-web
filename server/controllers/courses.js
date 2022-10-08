var express = require('express');
var router = express.Router();
var Course = require('../models/course');
var Staff = require('../models/staff');
var Student = require('../models/student');
var Department = require('../models/department');
const checkAuth = require('../middleware/check-auth');

router.post('/api/courses', checkAuth, function(req, res, next){
  var course = new Course(req.body);
  course.save(function(err, course) {
      if (err) { return res.status(500).send(err); }
      console.log(course.name, "added.");
      return res.status(201).json(course);
  })
});


router.get('/api/courses', checkAuth, function(req, res, next) {
  Course.find(function(err, courses) {
      if (err) { return res.status(500).send(err); }
      res.json({courses: courses, decoded: req.userData});
      res.status(200);
      res.send;
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
      return res.status(200).send(course);
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
        course.save();
        return res.status(201).json(course);
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
       course.save();
       return res.status(201).json(course);
    });
});


router.delete('/api/courses', checkAuth, function(req,res,next){
    Course.deleteMany(function(err, course) {
        if (err) { return res.status(500).send(err); }
        return res.status(200).json(course);
    });
});


router.delete('/api/courses/:id', checkAuth, function(req, res, next) {
    var id = req.params.id;
    Course.findOneAndDelete({_id: id}, function(err, course) {
        if (err) {res.status(500).send(err); }
        if (course === null) {
            return res.status(404).json({'message': 'Course not found'});
        }
       return  res.status(200).json(course);
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
  

  //task 4.a (sorts all the courses by descending names) ⛔️
router.get('/api/courses/:id/sortCourses',checkAuth,function(req, res, next) {
  var sortedCourses =[];
    Course.find(function(err, courses) {
      if(err){
        return res.status(500).send(err);
      }
      for (var i=0; i<courses.length; i++) {
           sortedCourses.push([courses[i].name, courses[i]]);
      }
      sortedCourses.sort
      (function(a,b){
        return b[0]-a[0];
      });
      res.json( Object.assign({}, sortedCourses));
      res.status(200);
    });
});
  //task 4.a (field selection) ⛔️
router.get('/api/courses?fields=name,id', function(req, res, next) {
      Course.find(function(err, courses) {
          if (err) { return res.status(500).send(err);  }
          res.json({'courses': courses});
         return res.status(200);
    });
});


module.exports = router;