var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    id: { type: String },
    name: { type: String },
    department: { 
        type: Schema.Types.ObjectId,
        ref: "department" },
    students: [{
        type: Schema.Types.ObjectId,
        ref: "course"
     }],
     staffs: [{
        type: Schema.Types.ObjectId,
        ref: "staff"
     }]
});



module.exports = mongoose.model('course', courseSchema);