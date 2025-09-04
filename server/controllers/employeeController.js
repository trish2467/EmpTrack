import path from "path"
import Employee from "../models/Employee.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import multer from 'multer'
import Department from "../models/Department.js"

// Set up multer storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) 
    }
})

const upload = multer({ storage: storage })


const addEmployee = async (req, res) => {
    try {
        console.log("controll reached in add");
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;
        
        // const user = await User.findOne({ email })
        // if (user) {
        //     return res.status(400).json({ success: false, error: "User already registered in emp" })
        // }
        
        const existingEmployee = await Employee.findOne({ employeeId });
        if (existingEmployee) {
            return res.status(400).json({ success: false, error: "Employee ID already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10)
        
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : ""
        })
        const savedUser = await newUser.save()
        
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        })
        
        await newEmployee.save()
        
        return res.status(201).json({ success: true, message: "Employee created successfully" })
    } catch (error) {
        console.error(error);
        
        if (error.code === 11000) {
            if (error.keyPattern.employeeId) {
                return res.status(400).json({ success: false, error: "Employee ID already exists" });
            } else if (error.keyPattern.email) {
                return res.status(400).json({ success: false, error: "Email already exists" });
            }
        }
        return res.status(500).json({ success: false, error: "Server error in adding employee" })
    } 
}

 
// const getEmployees = async (req, res) => {
//     try {
//         let employee;
//         const employees = await Employee.find({_id: id})
//             .populate("userId", { password: 0 })
//             .populate("department")
//             if(!employee){
//                 employee = await Employee.findOne({userId: id})
//             .populate("userId", { password: 0 })
//             .populate("department")
//             }
//         return res.status(200).json({ success: true, employees })
//     } catch (error) {
//         return res.status(500).json({ success: false, error: "Error retrieving employees" })
//     }
// }
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({})
            .populate("userId", { password: 0 })
            .populate("department");
        res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error retrieving employees" });
    }
};


const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findById(id)
            .populate('userId', { password: 0 })
            .populate('department');

        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        return res.status(200).json({ success: true, employee });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error retrieving employee details" });
    }
}
const getEmployeebyUserID = async (req, res) => {
    const { id } = req.params; // this is userId
    try {
        const employee = await Employee.findOne({ userId: id })
            .populate('userId', { password: 0 })
            .populate('department');

        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found for this user" });
        }

        return res.status(200).json({ success: true, employee });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error retrieving employee details" });
    }
};



const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body;

        const employee = await Employee.findById(id)
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" })
        }

        const user = await User.findById(employee.userId)
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" })
        }

        const updateUser = await User.findByIdAndUpdate(employee.userId, { name })
        const updateEmployee = await Employee.findByIdAndUpdate(id, {
            maritalStatus,
            designation, 
            salary, 
            department
        })

        if (!updateEmployee || !updateUser) {
            return res.status(404).json({ success: false, error: "Failed to update employee" })
        }

        return res.status(200).json({ success: true, message: "Employee updated successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, error: "Error updating employee" })   
    }
}

const fetchEmployeesByDepId = async(req,res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.find({department: id})
        return res.status(200).json({ success: true, employee })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get employeesbyDepId server error" });
    }
}


export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId ,getEmployeebyUserID}