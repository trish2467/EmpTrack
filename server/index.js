import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import connectToDatabase from './db/db.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import dotenv from 'dotenv'
import leaveRouter from './routes/leave.js'
import settingRouter from './routes/setting.js'
import attendanceRouter from './routes/attendance.js'
import dashboardRouter from './routes/dashboard.js'

dotenv.config();

connectToDatabase()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'))
app.get("/", (req, res) => {
    res.send("bchfbv");
})
app.use('/api/dashboard', dashboardRouter)
app.use('/api/auth', authRouter)
app.use('/api/department',departmentRouter)
app.use('/api/employee', employeeRouter) 
app.use('/api/salary',salaryRouter)  
app.use('/api/leave',leaveRouter) 
app.use('/api/setting',settingRouter)
app.use('/api/attendance', attendanceRouter)

app.listen(3000, () =>{
    console.log(`Server is Running on port 3000`)
})


// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';

// import connectToDatabase from './db/db.js';
// import authRouter from './routes/auth.js';
// import departmentRouter from './routes/department.js';
// import employeeRouter from './routes/employee.js';
// import salaryRouter from './routes/salary.js';
// import leaveRouter from './routes/leave.js';
// import settingRouter from './routes/setting.js';
// import attendanceRouter from './routes/attendance.js';
// import dashboardRouter from './routes/dashboard.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(express.static('public/uploads'));

// // Routes
// app.get("/", (req, res) => {
//   res.send("✅ EMS backend is live.");
// });

// app.use('/api/dashboard', dashboardRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/department', departmentRouter);
// app.use('/api/employee', employeeRouter);
// app.use('/api/salary', salaryRouter);
// app.use('/api/leave', leaveRouter);
// app.use('/api/setting', settingRouter);
// app.use('/api/attendance', attendanceRouter);

// // ✅ Only start server **after** DB is connected
// const startServer = async () => {
//   try {
//     await connectToDatabase();
//     console.log("✅ Connected to MongoDB");

//     app.listen(PORT, () => {
//       console.log(`🚀 Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("❌ Failed to connect to MongoDB:", error.message);
//     process.exit(1); // Exit if DB fails
//   }
// };

// startServer();
