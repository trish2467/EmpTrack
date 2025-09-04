import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AttendanceHelper, columns } from "../../utils/AttendanceHelper";
import DataTable from 'react-data-table-component';
import axios from "axios";

const Attendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredAttendance, setFilterAttendance] = useState([]);
    const [error, setError] = useState("");

    const statusChange = () => {
        fetchAttendance();
    }

    const fetchAttendance = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get('https://gg-wb8q.onrender.com/api/attendance', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.attendance.map((att) => ({
                    employeeId: att.employeeId.employeeId,
                    sno: sno++,
                    department: att.employeeId.department.dep_name,
                    name: att.employeeId.userId.name,
                    action: <AttendanceHelper status={att.status} employeeId={att.employeeId.employeeId} statusChange={statusChange} />,
                }));
                setAttendance(data);
                setFilterAttendance(data);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Something went wrong while fetching employees.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const handleFilter = (e) => {
        const value = e.target.value.toLowerCase();
        const records = attendance.filter((emp) =>
            emp.employeeId.toLowerCase().includes(value) ||
            emp.department.toLowerCase().includes(value) ||
            emp.name.toLowerCase().includes(value)
        );
        setFilterAttendance(records);
    };

    if (loading) {
        return <div className="text-center mt-10 text-xl">Loading...</div>;
    }
    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    if(!filteredAttendance){
        return <div>Loading...</div>
    }

    return (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Attendance</h3>
            </div>
            <div className="flex justify-between items-center mt-4">
                <input
                    type="text"
                    placeholder="Search by Name, Department, or Employee ID"
                    className="px-4 py-0.5 border"
                    onChange={handleFilter}
                />
                <p className="text-2xl">
                    Mark Employees for <span className="font-bold underline">{new Date().toISOString().split("T")[0]}{" "}</span>
                </p>
                <Link 
                  to="/admin-dashboard/attendance-report" 
                  className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                    Attendance Report
                </Link>
            </div>
            <div className="mt-6">
                <DataTable
                    columns={columns}
                    data={filteredAttendance}
                    pagination
                />
            </div>
        </div>
    );
};

export default Attendance;