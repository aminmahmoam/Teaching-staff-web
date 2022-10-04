var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var staffSchema = new Schema({
    SSN: { type: String },
    firstName: { type: String },
    lastName: {type: String},
    educationalDegree: { type: String },
    role: { type: String },
    salary: { type: Number },
    telephone: { type: Number },
    emailAddress: { type: String },
    address: { type: String },
    password: {
        type: String,
        required: true
      },
    paymentDate: {
      type: Number
    },
    courses: [{
      type: Schema.Types.ObjectId,
      ref: "course"
   }]
});



module.exports = mongoose.model('staff', staffSchema);