import React, { useEffect, useState } from "react";
import axios from "axios"
import SummaryCard from "./SummaryCard";
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminSummary = () => {
    const [summary,setSummary] = useState(null)

    useEffect(()=>{
        const fetchSummary = async()=>{
            try{
                const summary = await axios.get('https://gg-wb8q.onrender.com/api/dashboard/summary',{
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setSummary(summary.data)
            } catch(error){
                if(error.response){
                    alert(error.response.data.error)
                }
                console.log(error.message)
            }
        }
        fetchSummary()
    },[])

    if(!summary){
        return <div>Loading...</div>
    }

    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold">Dashboard Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <SummaryCard icon={<FaUsers />} text="Total Employees" number={summary.totalEmployees} color="bg-teal-600" />
                <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summary.totalDepartments} color="bg-yellow-600" />
                <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number={summary.totalSalary} color="bg-red-600" />
            </div>
            {/* Attendance and Attendance Report Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="rounded bg-white shadow flex flex-col items-center p-6">
                    <div className="text-3xl mb-2 text-teal-600"><FaCheckCircle /></div>
                    <div className="text-lg font-semibold mb-2">Attendance</div>
                    <Link to="/admin-dashboard/attendance" className="px-4 py-2 bg-teal-600 text-white rounded font-semibold hover:bg-teal-700 transition">Go to Attendance</Link>
                </div>
                <div className="rounded bg-white shadow flex flex-col items-center p-6">
                    <div className="text-3xl mb-2 text-yellow-600"><FaFileAlt /></div>
                    <div className="text-lg font-semibold mb-2">Attendance Report</div>
                    <Link to="/admin-dashboard/attendance-report" className="px-4 py-2 bg-yellow-600 text-white rounded font-semibold hover:bg-yellow-700 transition">Go to Attendance Report</Link>
                </div>
            </div>
            <div className="mt-12">
                <h4 className="text-center text-2xl font-bold">Leave Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={summary.leaveSummary.appliedFor} color="bg-teal-600" />
                    <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={summary.leaveSummary.approved} color="bg-green-600" />
                    <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={summary.leaveSummary.pending} color="bg-yellow-600" />
                    <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={summary.leaveSummary.rejected} color="bg-red-600" />
                </div>
            </div>
        </div>
    )
}

export default AdminSummary