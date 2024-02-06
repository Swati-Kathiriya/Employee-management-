const Employee = require('../models/Employee');
 
exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }  
}

exports.getAllEmployees = async (req, res) => { 

  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
}

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if(!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
 
    res.json(employee);

  } catch(err) {
    res.status(500).json({ error: err.message }); 
  }
}  

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body, 
      { new: true }
    );

    if(!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if(!employee) {
      return res.status(404).json({ message: 'Employee not found' })
    }

    await employee.remove();

    res.json({ message: 'Employee removed successfully' });

  } catch(err) { 
    res.status(500).json({ error: err.message });
  }
}