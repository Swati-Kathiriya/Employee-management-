const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
{
    employeeId:
    {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee'
    },
    Date:
    {
        type: Date,
        required: true
    },
    employeename:
    {
        type: String,
        required: true
    },
    reason:
    {
        type: String,
        required: true
    },
    leavetype:
    {
        type: String,
        enum: ["Casual leave", "Earned leave", "Leave Without Pay", "Paternity leave", "Sabbatical leave", "Sick leave"],
    },
    isrejected:
    {
        type: Boolean,
        default: false
    }
},
{ timestamps: true}  
);

const leave = mongoose.model("leave", leaveSchema);
module.exports = leave;