const Leave = require('../models/leave');
const Employee = require('../models/Employee');
 
exports.applyLeave = async (req, res) => {
   
   try {
      const leave = await Leave.create(req.body);
      res.status(201).json(leave);
   } catch (err) {
      res.status(400).json({ error: err.message }); 
   }

}

exports.getAllLeaves = async (req, res) => {

   try {
      const leaves = await Leave.find()
         .populate('employee', 'name', 'email'); 
      res.json(leaves);
   } catch (err) {
      res.status(500).json({ error: err.message });
   } 

}
 
exports.getLeaveById = async (req, res) => {
   try {
      const leave = await Leave.findById(req.params.id)
         .populate('employee', 'name', 'email');
         
      if(!leave) {
         return res.status(404).json({ message: 'Leave not found'});
      }
         
      res.json(leave);
      
   } catch (err) {
      res.status(500).json({ error: err.message })
   }
}

exports.updateLeave = async (req, res) => {

   try {
      const leave = await Leave.findByIdAndUpdate(
         req.params.id,
         req.body,
         { new: true }
      );
         
      if(!leave) {
         return res.status(404).json({ message: 'Leave not found' });
      }

      res.json(leave);
      
   } catch (err) {
      res.status(500).json({ error: err.message });  
   }

}

exports.deleteLeave = async (req, res) => {

   try {
      const leave = await Leave.findById(req.params.id);
         
      if(!leave) {
         return res.status(404).json({ message: 'Leave not found'});
      }

      await leave.remove();
         
      res.json({ message: 'Leave removed successfully' });
      
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}