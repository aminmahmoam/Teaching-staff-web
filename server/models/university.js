var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var universitySchema = new Schema({
    name: { type: String },
    location: { type: String },
    departments: [{
     type: Schema.Types.ObjectId,
     ref: "departments"

    }]
});

module.exports = mongoose.model('university', universitySchema);