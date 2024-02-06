const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');


exports.createAttendance = async (req, res) => {
  let { employeeID, date, checkInTime, checkOutTime, employeename } = req.body;
  // console.log(typeof(checkInTime));
  checkInTime = new Date(checkInTime)
  checkOutTime = new Date(checkOutTime)
  // console.log(typeof(checkInTime));
  // checkOutTime =  new Date(checkInTime)
  // employeeID = JSON.parse(employeeID)
  // console.log(checkInTime.getTime());

  try {

    const employee = await Employee.findById(employeeID);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    console.log(checkInTime);

    const timeDiff = Math.abs(checkOutTime.getTime() - checkInTime.getTime());
    console.log(timeDiff);

    const workHours = parseInt(Math.floor(timeDiff / (1000 * 60 * 60)));
    console.log(workHours);
    console.log(typeof (workHours));

    const newAttendance = await Attendance.create({
      employeename,
      employeeID,
      date,
      checkInTime,
      checkOutTime,
      workHours
    });

    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAttendanceByEmployeeId = async (req, res) => {
  const { employeeID } = req.params.id;

  try {

    const employee = await Employee.findById(employeeID);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    } 
    const attendance = await Attendance.find({ employeeID });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
