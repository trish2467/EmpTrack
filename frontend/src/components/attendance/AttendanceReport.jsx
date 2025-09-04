import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceReport = () => {
    const [report, setReport] = useState({});
    const [limit, setLimit] = useState(5);
    const [skip, setSkip] = useState(0);
    const [dateFilter, setDateFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasMore, setHasMore] = useState(true);

    const fetchReport = async () => {
        try {
            setLoading(true);
            setError("");
            const query = new URLSearchParams({ limit, skip });
            if (dateFilter) {
                query.append("date", dateFilter);
            }
            const response = await axios.get(`https://gg-wb8q.onrender.com/api/attendance/report?${query.toString()}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (response.data.success) {
                const newData = response.data.groupData;
                if (skip === 0) {
                    setReport(newData);
                } else {
                    setReport((prevData) => ({ ...prevData, ...newData }));
                }
                // If less than limit, no more data
                const totalRecords = Object.values(newData).reduce((acc, arr) => acc + arr.length, 0);
                setHasMore(totalRecords === limit);
            }
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
        // eslint-disable-next-line
    }, [skip, dateFilter]);

    const handleLoadmore = () => {
        setSkip((prevSkip) => prevSkip + limit);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
            <div className="w-full max-w-5xl bg-white rounded-lg shadow-md p-8 mt-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <h2 className="text-3xl font-bold text-center md:text-left mb-4 md:mb-0">Attendance Report</h2>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <label className="font-semibold text-lg" htmlFor="dateFilter">Filter by Date:</label>
                        <input
                            id="dateFilter"
                            type="date"
                            className="border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={dateFilter}
                            onChange={(e) => {
                                setDateFilter(e.target.value);
                                setSkip(0);
                            }}
                        />
                    </div>
                </div>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                {loading ? (
                    <div className="text-center text-lg py-10">Loading...</div>
                ) : (
                    Object.entries(report).length === 0 ? (
                        <div className="text-center text-gray-500 py-10">No records found.</div>
                    ) : (
                        Object.entries(report).map(([date, record]) => (
                            <div className="mb-8" key={date}>
                                <h3 className="text-xl font-semibold mb-2 text-teal-700">{date}</h3>
                                <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">S No</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee ID</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Department</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-100">
                                            {record.map((data, i) => (
                                                <tr key={`${data.employeeId}-${i}`} className="hover:bg-gray-50">
                                                    <td className="px-4 py-2 whitespace-nowrap">{i + 1}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap">{data.employeeId}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap">{data.employeeName}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap">{data.departmentName}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap capitalize">{data.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))
                    )
                )}
                {hasMore && !loading && Object.entries(report).length > 0 && (
                    <div className="flex justify-center mt-6">
                        <button
                            className="px-6 py-2 bg-teal-600 text-white rounded font-semibold shadow hover:bg-teal-700 transition"
                            onClick={handleLoadmore}
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttendanceReport;

