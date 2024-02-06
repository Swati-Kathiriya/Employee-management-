const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  position: { type: String, required: true }
},
{ timestamps: true }
);

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
  