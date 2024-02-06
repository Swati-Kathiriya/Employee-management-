const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/', attendanceController.createAttendance);
router.get('/:employeeID', attendanceController.getAttendanceByEmployeeId);

module.exports = router;
