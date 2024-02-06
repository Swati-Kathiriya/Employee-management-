const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeename: { type: String, required: true, unique: true },
  employeeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  checkInTime: { type: Date, required: true },
  checkOutTime: { type: Date },
  workHours: { type: Number },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;