var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    id: { type: String },
    name: { type: String },
    text: { type: String },
    lectureDates: [{
        type: Number
     }],
    department: { 
        type: Schema.Types.ObjectId,
        ref: "department" },
    students: [{
        type: Schema.Types.ObjectId,
        ref: "student"
     }],
     staffs: [{
        type: Schema.Types.ObjectId,
        ref: "staff"
     }]
});



module.exports = mongoose.model('course', courseSchema);