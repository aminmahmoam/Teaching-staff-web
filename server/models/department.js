var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = new Schema({
    id: { type: String },
    campus: { type: String },
    name: {
        type: String,
        allowedValues: ["Applied information technology", "Biomedicine", "Computer and software engineering", "Business"],
      }

});


module.exports = mongoose.model('department', departmentSchema);