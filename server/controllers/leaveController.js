import Employee from "../models/Employee.js"
import Leave from "../models/Leave.js"

const addLeave = async(req,res)=>{
    try{
            const {userId, leaveType, startDate, endDate, reason} = req.body
            const employee = await Employee.findOne({userId})

            const newLeave = new Leave({
                employeeId: employee._id, leaveType, startDate, endDate, reason
            })
            await newLeave.save()
            return res.status(200).json({success: true})
        } catch(error){
            return res.status(500).json({success: false,error: "leave add server error"})
        }
}

const getLeave = async (req, res) => {
    try {
        const { id, role } = req.params;
        // console.log(id, role)
        if (!id || !role) {
            return res.status(400).json({ success: false, error: "Missing id or role in request" });
        }

        let leaves;

        if (role === "admin") {
            leaves = await Leave.find({ employeeId: id });
        } else {
            const employee = await Employee.findOne({ userId: id });
            if (!employee) {
                return res.status(404).json({ success: false, error: "Employee not found" });
            }
            leaves = await Leave.find({ employeeId: employee._id });
        }

        return res.status(200).json({ success: true, leaves: leaves || [] });

    } catch (error) {
        console.error("Error in getLeave:", error.message);
        return res.status(500).json({ success: false, error: "Leave fetch server error" });
    }
};


const getLeaves = async(req,res)=>{
    try{
        const leaves = await Leave.find().populate({
            path:"employeeId",
            populate:[
                {
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name'
                }
            ]
        })
        return res.status(200).json({success: true,leaves})
    } catch(error){
        console.log(error.message);
        return res.status(500).json({success:false, error: "leave add server error"})
    }
}

const getLeaveDetail = async(req,res)=>{
    try{
        const{id} = req.params;
        const leave = await Leave.findById({_id: id}).populate({
            path:"employeeId",
            populate:[
                {
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name profileImage'
                }
            ]
        })
        return res.status(200).json({success: true,leave})
    } catch(error){
        console.log(error.message);
        return res.status(500).json({success:false, error: "leave detail server error"})
    }
}

const updateLeave = async(req,res)=>{
    try{
        const{id} = req.params;
        const leave = await Leave.findByIdAndUpdate({_id:id},{status:req.body.status})
        if(!leave){
            return res.status(404).json({success: false, error: "leave not founded"})
        }
        return res.status(200).json({success:true})
    } catch(error){
        console.log(error.message)
        return res.status(500).json({success:false, error: "leave update server error"})
    }
}

export {addLeave,getLeave,getLeaves,getLeaveDetail,updateLeave}