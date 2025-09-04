import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmployeeButtons, columns } from "../../utils/EmployeeHelper";
import DataTable from 'react-data-table-component';
import axios from "axios";

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filteredEmployee, setFilteredEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get('https://gg-wb8q.onrender.com/api/employee', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((emp) => ({
                        _id: emp.userId._id,
                        sno: sno++,
                        dep_name: emp.department.dep_name,
                        name: emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage: (
                            <img
                                width={40}
                                className='rounded-full'
                                src={`https://gg-wb8q.onrender.com/${emp.userId.profileImage}`}
                                alt="profile"
                            />
                        ),
                        action: (<EmployeeButtons Id={emp._id} />),
                    }));

                    setEmployees(data);
                    setFilteredEmployees(data);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                } else {
                    console.error("Error fetching employees", error);
                    alert("Something went wrong while fetching employees.");
                }
            } finally {
                setEmpLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
        const value = e.target.value.toLowerCase();
        const records = employees.filter((emp) =>
            emp.name.toLowerCase().includes(value) ||
            emp.dep_name.toLowerCase().includes(value)
        );
        setFilteredEmployees(records);
    };

    return (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Employee</h3>
            </div>
            <div className="flex justify-between items-center mt-4">
                <input
                    type="text"
                    placeholder="Search by Name or Dept Name"
                    className="px-4 py-1 rounded border"
                    onChange={handleFilter}
                />
                <Link to="/admin-dashboard/add-employee" className="px-4 py-1 bg-teal-600 rounded text-white">
                    Add New Employee
                </Link>
            </div>
            <div className="mt-6">
                {empLoading ? (
                    <p className="text-center text-gray-500">Loading employees...</p>
                ) : (
                    <DataTable
                        columns={columns}
                        data={filteredEmployee}
                        pagination
                        highlightOnHover
                        striped
                        responsive
                    />
                )}
            </div>
        </div>
    );
};

export default List;
