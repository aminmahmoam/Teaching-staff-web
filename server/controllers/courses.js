var express = require('express');
var router = express.Router();
var Course = require('../models/course');
var Staff = require('../models/staff');
var Student = require('../models/student');
var Department = require('../models/department');
const staff = require('../models/staff');



router.post('/api/courses', function(req, res, next){
  var course = new Course(req.body);
  course.save(function(err, course) {
      if (err) { return res.status(500).send(err); }
      console.log(course.name, "added.");
      return res.status(201).json(course);
  })
});


router.get('/api/courses', function(req, res, next) {
  Course.find(function(err, courses) {
      if (err) { return res.status(500).send(err); }
      res.json({courses: courses });
      res.status(200);
  });
});
 

router.get("/api/courses/:id", function (req, res, next) {
  Course.findOne({ _id: req.params.id })
    .populate("students")
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
        course.save();
        return res.status(201).json(course);
    });
});

router.put('/api/courses/:id', function(req, res,next) {
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


router.delete('/api/courses', function(req,res,next){
    Course.deleteMany(function(err, course) {
        if (err) { return res.status(500).send(err); }
        return res.status(200).json(course);
    });
});


router.delete('/api/courses/:id', function(req, res, next) {
    var id = req.params.id;
    Course.findOneAndDelete({_id: id}, function(err, course) {
        if (err) {res.status(500).send(err); }
        if (course === null) {
            return res.status(404).json({'message': 'Course not found'});
        }
       return  res.status(200).json(course);
    });
});

//task 3 ⛔️
router.get("/api/courses/:co_id/staffs/:st_id", function (req, res, next) {
    Course.findOne({ _id: req.params.co_id })
      .populate("staffs", {
        match: { _id: { $ne: req.params.st_id } },
      })
      .exec(function (err, course) {    
        if (err) {
          return res.status(500).send(err);
        }
        if (course === null || staff === null) {
            return res.status(404).json({'message': 'Not found!'});
        }
        console.log(course.staffs);
        return res.status(200).send(course.staffs);
    });
});

//task 3
router.get('/api/courses/:id/staffs', function(req, res, next){
    var id = req.params.id;
    Course.findOne({_id: id}).populate('staffs').exec(function(err, course) {
        if(err){ return res.status(500).send(err);}
        if(course == null){
            return res.status(404).json({'message': 'Course not found'});
        }
       console.log('Staffs of this course are %s', course.staffs);
      return  res.status(200).json(course.staffs);
    });
});

//task 3
router.post("/api/courses/:id/staffs", function (req, res, next) {
    Course.findById(req.params.id, function (err, course) {
      if (err) {
        return res.status(500);
      }
      if (course == null) {
        return res.status(404).json({ message: "Course not found" });
      }
      var newStaff = new Staff(req.body);
      newStaff.save(function (err) {
        if (err) {
          return res.status(500);
        }
        console.log("Staff " + newStaff.firstName + " created.");
      });
      course.staffs.push(newStaff);
      course.save();
      console.log("Staff added to ", course.firstName, " ", newStaff.firstName);
      return res.status(201).json(course);
    });
  });
  
  
//task 3 ⛔️
router.delete("/api/courses/:co_id/staffs/:staff_id",function (req, res, next) {
    Course.updateOne(
        { _id: req.params.co_id },
        { $pull: { staffs: { _id: req.params.staff_id } } },
        function (err, course) {
        if (err) {
            return res.status(500).send(err);
        }
        if (course == null) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    });
});

//task 3
router.get('/api/courses/:id/students', function(req, res, next){
    Course.findOne({_id: req.params.id})
    .populate('students').exec(function(err, course) {
        if(err){ return res.status(500).send(err);}
        if(course == null){
            return res.status(404).json({'message': 'Course not found'});
        }
       console.log(course.students);
       return res.status(200).send(course.students);
    });
});

//task 3
router.get("/api/courses/:co_id/students/:st_id", function (req, res, next) {
    Course.findById({ _id: req.params.co_id })
      .populate("students", {
        match: { _id: { $ne: req.params.st_id } },
      })
      .exec(function (err, course, student) {
        if (err) {
          return res.status(500).send(err);
        }
        if (course === null || student === null) {
            return res.status(404).json({'message': 'Not found!'});
        }
        console.log(course.student);
        return res.status(200).json(course.student);
      });
});

  //task 3
router.delete("/api/courses/:co_id/students/:student_id",function (req, res, next) {
    Course.updateOne(
      { _id: req.params.co_id },
      { $pull: { students: { _id: req.params.student_id } } },
      function (err, course) {
        if (err) {
          return res.status(500).send(err);
        }
        if (course == null) {
          return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json(course);
      });
});

//task 3 ⛔️
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
router.post("/api/courses/:id/departments", function (req, res, next) {
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
router.get("/api/courses/:id/departments", function (req, res, next) {
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
router.get('/api/courses?sort=-name', function(req, res, next) {
    Course.find(function(err, course) {
        if (err) { return res.status(500).send(err); }
       return res.status(200).json(course);
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