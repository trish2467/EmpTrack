// import React, {useEffect,useState} from "react";
// import {Link,useParams} from "react-router-dom";
// import axios from "axios"
// import { useAuth } from "../../context/authContext";

// const View = () => {
//     const [salaries, setSalaries] = useState([]);
//     const[filteredSalaries, setFilteredSalaries] = useState([]);
//     const{id} = useParams();
//     let sno = 1;
//     const {user} = useAuth()

//     const fetchSalaries = async()=>{
//         try{
//             const response = await axios.get(`https://gg-wb8q.onrender.com/api/salary/${id}/${user.role}`,{
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });
//             console.log(response.data)
//             if(response.data.success){
//                 setSalaries(response.data.salary);
//                 setFilteredSalaries(response.data.salary);
//             }
//         } catch(error){
//             if(error.response && !error.response.data.success){
//                 alert(error.message);
//             }
//         }
//     };
//     useEffect(()=>{
//         fetchSalaries();
//     },[]);

//     const filterSalaries = (q)=>{
//         const filteredRecords = salaries.filter((leave)=>
//             leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
//         );
//         console.log(filteredRecords)
//         setFilteredSalaries(filteredRecords);
//     }
//     return (
//         <>
//           {filteredSalaries === null ? (
//             <div>Loading...</div>
//           ):(
//             <div className="overflow-x-auto p-5">
//                 <div className="text-center">
//                     <h2 className="text-2xl font-bold">Salary History</h2>
//                 </div>
//                 <div className="flex justify-end my-3">
//                     <input 
//                     type="text" 
//                     placeholder="Search By Emp ID"
//                     className="border px-2 rounded-md py-0.5 border-gray-300"
//                     onChange={filterSalaries}
//                     />
//                 </div>
//                 {filteredSalaries.length > 0 ?(
//                     <table className="w-full text-sm text-left text-gray-500">
//                         <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
//                             <tr>
//                                 <th className="px-6 py-3">SNO</th>
//                                 <th className="px-6 py-3">Emp ID</th>
//                                 <th className="px-6 py-3">Salary</th>
//                                 <th className="px-6 py-3">Allowance</th>
//                                 <th className="px-6 py-3">Deduction</th>
//                                 <th className="px-6 py-3">Total</th>
//                                 <th className="px-6 py-3">Pay Date</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredSalaries.map((salary)=>(
//                                 <tr
//                                   key={salary.id}
//                                   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//                                 >
//                                     <td className="px-6 py-3">{sno++}</td>
//                                     <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
//                                     <td className="px-6 py-3">
//                                         {salary.basicSalary}
//                                     </td>
//                                     <td className="px-6 py-3">
//                                         {salary.allowances}
//                                     </td>
//                                     <td className="px-6 py-3">{salary.deductions}</td>
//                                     <td className="px-6 py-3">{salary.netSalary}</td>
//                                     <td className="px-6 py-3">
//                                         {new Date(salary.payDate).toLocaleDateString()}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                       </table> 
//                 ):<div>No Records</div>}
//             </div>
//           )}
//         </>
//     )
// }

// export default View;




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const View = () => {
    const [salaries, setSalaries] = useState([]);
    const [filteredSalaries, setFilteredSalaries] = useState([]);
    const [noResults, setNoResults] = useState(false); // New state to track if there are no results
    const { id } = useParams();
    let sno = 1;
    const { user } = useAuth();

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(
                `https://gg-wb8q.onrender.com/api/salary/${id}/${user.role}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(response.data);
            if (response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
                setNoResults(false); // Reset noResults flag when data is fetched
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const filterSalaries = (q) => {
        const filteredRecords = salaries.filter((leave) =>
            leave.employeeId.employeeId.toLowerCase().includes(q.toLowerCase())
        );
        console.log(filteredRecords);
        setFilteredSalaries(filteredRecords);
        setNoResults(filteredRecords.length === 0); // If no records found, set noResults to true
    };

    return (
        <>
            {filteredSalaries === null ? (
                <div>Loading...</div>
            ) : (
                <div className="overflow-x-auto p-5">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Salary History</h2>
                    </div>
                    <div className="flex justify-end my-3">
                        <input
                            type="text"
                            placeholder="Search By Emp ID"
                            className="border px-2 rounded-md py-0.5 border-gray-300"
                            onChange={(e) => filterSalaries(e.target.value)}
                        />
                    </div>
                    {noResults ? (
                        <div>No results found</div> // Show when no results match
                    ) : filteredSalaries.length > 0 ? (
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">SNO</th>
                                    <th className="px-6 py-3">Emp ID</th>
                                    <th className="px-6 py-3">Salary</th>
                                    <th className="px-6 py-3">Allowance</th>
                                    <th className="px-6 py-3">Deduction</th>
                                    <th className="px-6 py-3">Total</th>
                                    <th className="px-6 py-3">Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalaries.map((salary) => (
                                    <tr
                                        key={salary.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-3">{sno++}</td>
                                        <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                                        <td className="px-6 py-3">{salary.basicSalary}</td>
                                        <td className="px-6 py-3">{salary.allowances}</td>
                                        <td className="px-6 py-3">{salary.deductions}</td>
                                        <td className="px-6 py-3">{salary.netSalary}</td>
                                        <td className="px-6 py-3">
                                            {new Date(salary.payDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>No Records</div>
                    )}
                </div>
            )}
        </>
    );
};

export default View;
