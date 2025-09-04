import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewEmp = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`https://gg-wb8q.onrender.com/api/employee/userID/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setEmployee(response.data.employee)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    if (!employee || !employee.userId || !employee.department) {
        return <div>Something went wrong while fetching employee data.</div>;
    }

    const userInitial = employee.userId.name?.charAt(0).toUpperCase();

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-8 text-center">
                Employee Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-center">
                    {/* <div className="w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold">
                        {userInitial}
                    </div> */}
                    {employee.userId.profileImage ? (
                        <img
                            src={`https://gg-wb8q.onrender.com/${employee.userId.profileImage}`}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold">
                            {userInitial}
                        </div>
                    )}

                </div>
                <div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Name:</p>
                        <p className="font-medium">{employee.userId.name}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Employee ID:</p>
                        <p className="font-medium">{employee.employeeId}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Date of Birth:</p>
                        <p className="font-medium">
                            {new Date(employee.dob).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Gender:</p>
                        <p className="font-medium">{employee.gender}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Department:</p>
                        <p className="font-medium">{employee.department.dep_name}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Marital Status:</p>
                        <p className="font-medium">{employee.maritalStatus}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEmp;


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const View = () => {
//     const { id } = useParams();
//     const [employee, setEmployee] = useState(null); // null instead of []

//     useEffect(() => {
//         const fetchEmployee = async () => {
//             try {
//                 const response = await axios.get(`https://gg-wb8q.onrender.com/api/employee/${id}`, {
//                     headers: {
//                         "Authorization": `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 if (response.data.success) {
//                     setEmployee(response.data.employee);
//                 }
//             } catch (error) {
//                 console.error("Fetch error: ", error);
//                 if (error.response && error.response.data && !error.response.data.success) {
//                     alert(error.response.data.error);
//                 }
//             }
//         };
//         fetchEmployee();
//     }, [id]);

//     if (!employee || !employee.userId || !employee.department) {
//         return <div className="text-center mt-10">Loading...</div>;
//     }

//     return (
//         <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
//             <h2 className="text-2xl font-bold mb-8 text-center">
//                 Employee Details
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                     <img
//                         src={`https://gg-wb8q.onrender.com/${employee?.userId?.profileImage}`}
//                         className="rounded-full border w-72"
//                         alt="Profile"
//                     />
//                 </div>
//                 <div>
//                     <div className="flex space-x-3 mb-5">
//                         <p className="text-lg font-bold">Name:</p>
//                         <p className="font-medium">{employee?.userId?.name}</p>
//                     </div>
//                     <div className="flex space-x-3 mb-5">
//                         <p className="text-lg font-bold">Employee ID:</p>
//                         <p className="font-medium">{employee?.employeeId}</p>
//                     </div>
//                     <div className="flex space-x-3 mb-5">
//                         <p className="text-lg font-bold">Date of Birth:</p>
//                         <p className="font-medium">
//                             {new Date(employee?.dob).toLocaleDateString()}
//                         </p>
//                     </div>
//                     <div className="flex space-x-3 mb-5">
//                         <p className="text-lg font-bold">Gender:</p>
//                         <p className="font-medium">{employee?.gender}</p>
//                     </div>
//                     <div className="flex space-x-3 mb-5">
//                         <p className="text-lg font-bold">Department:</p>
//                         <p className="font-medium">{employee?.department?.dep_name}</p>
//                     </div>
//                     <div className="flex space-x-3 mb-5">
//                         <p className="text-lg font-bold">Marital Status:</p>
//                         <p className="font-medium">{employee?.maritalStatus}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default View;
