import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { deleteScheduledCallRequest } from '../../../redux/userSlice';
import { fetchScheduledCallsRequest,updateScheduledCallsSearchQuery } from '../../../redux/userSlice';
const HistoryCall = () => {
    const dispatch = useDispatch();
    const {
        scheduledCalls,
        totalScheduledCalls,
        page,
        limit,
        loading,
        error,
        scheduledCallsSearchQuery,
    } = useSelector((state) => state.users);
    const [localSearchQuery, setLocalSearchQuery] = useState(scheduledCallsSearchQuery);
   const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        const startDate = thirtyDaysAgo.toISOString().split('T')[0];
        const endDate = today.toISOString().split('T')[0];
     useEffect(() => {
        // Dispatch an action to set a default date range
        dispatch(updateScheduledCallsSearchQuery({
             scheduledAtBeetweenStartDate: startDate,
            scheduledAtBeetweenEndDate: endDate,// The current date
        }));
         dispatch(fetchScheduledCallsRequest({
         scheduledAtBeetweenStartDate: startDate,
            scheduledAtBeetweenEndDate: endDate,
    }));
    }, [dispatch]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalSearchQuery((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    useEffect(() => {
  setLocalSearchQuery(scheduledCallsSearchQuery);
}, [scheduledCallsSearchQuery]);
    const handleFormSubmit = (e) => {
  //       e.preventDefault();
  //        dispatch(updateScheduledCallsSearchQuery({
  //   ...localSearchQuery,
  //   page: 1, // reset to first page when applying new filter
  //   limit,
  // }));
    dispatch(fetchScheduledCallsRequest({
    ...localSearchQuery,
    page: 1,
    limit,
  }));
    };
   const handleClearFilters = () => {
  const clearedValues = {
    recipientName: '',
    scheduledByName: '',
    scheduledToName: '',
    recipientNumber: '',
    scheduledAtBeetweenStartDate: '',
    scheduledAtBeetweenEndDate: '',
    minDuration: '',
    maxDuration: '',
    status: '',
    triesLeft: '',
  };
  setLocalSearchQuery(clearedValues);
  dispatch(updateScheduledCallsSearchQuery({
    ...clearedValues,
    page: 1,
    limit,
  }));
  dispatch(fetchScheduledCallsRequest({
    ...clearedValues,
    page: 1,
    limit,
  }));
};
    const totalPages = Math.ceil(totalScheduledCalls / limit);
  const handlePageChange = (newPage) => {
  dispatch(updateScheduledCallsSearchQuery({
    ...scheduledCallsSearchQuery,
    page: newPage,
    limit,
  }));
  dispatch(fetchScheduledCallsRequest({
    ...scheduledCallsSearchQuery,
    page: newPage,
    limit,
  }));
};
    // Use a nullish coalescing operator to ensure scheduledCalls is always an array
    const callsToRender = scheduledCalls ?? [];
     const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
           dispatch(deleteScheduledCallRequest(id));
        }
      };
    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">All Call History</h2>
            {/* Search + Filters Form */}
            <form onSubmit={handleFormSubmit} className="mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        name="recipientName"
                        placeholder="Search by recipient name..."
                        value={localSearchQuery.recipientName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                </div>
                  <div className="relative w-full md:w-1/3">
    <input
      type="text"
      name="recipientNumber"
      placeholder="Search by recipient number..."
      value={localSearchQuery.recipientNumber}
      onChange={handleInputChange}
      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
    />
    <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
  </div>
                <div className="flex flex-wrap justify-between gap-3 w-full md:w-auto">
                    <select
                        name="status"
                        value={localSearchQuery.status}
                        onChange={handleInputChange}
                        className="w-full md:w-auto text-sm px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none"
                    >
                        <option value="">All Status</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="FAILED">Failed</option>
                        <option value="PENDING">Pending</option>
                    </select>
                </div>
                <div className="flex justify-end gap-3 w-full md:w-auto">
                    <button type="button" onClick={handleClearFilters} className="px-4 py-2 text-sm bg-gray-300 rounded-md shadow-sm hover:bg-gray-400">Clear</button>
                    <button type="submit" className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600">Search</button>
                </div>
            </form>
            {/* --- Loading State --- */}
            {loading && <div className="text-center py-8">Loading call history...</div>}
            {/* --- Table for md+ screens --- */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-3 text-left">Recipient</th>
                             <th className="p-3 text-left">PhoneNumber</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Time</th>
                            <th className="p-3 text-left">Scheduled By</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Conditional rendering of table body content */}
                        {callsToRender.length > 0 ? (
                            callsToRender.map((call) => (
                                <tr key={call._id} className="border-t border-gray-200">
                                    <td className="p-3 font-medium">
                                        {call.recipientName}
                                    </td>
                                      <td className="p-3 font-medium">
                                       {call.recipientNumber}
                                    </td>
                                    <td className="p-3 whitespace-nowrap">
                                        {new Date(call.scheduledAt).toLocaleDateString()}
                                        {/* <br />
                                        <span className="text-xs">{new Date(call.scheduledAt).toLocaleTimeString()}</span> */}
                                    </td>
                                    {/* <td className="p-3">{call.durationInSeconds ? `${call.durationInSeconds}s` : '-'}</td> */}
                                  <td className="p-3">{new Date(call.scheduledAt).toLocaleTimeString()}</td>
                                    <td className="p-3">{call.scheduledBy?.name || 'N/A'}</td>
                                     <td className="p-3">
                                        <span className={` text-s font-medium ${call.status === 'COMPLETED' ? 'text-gray-700' : call.status === 'FAILED' ? ' text-gray-700' : ' text-gray-700'}`}>
                                            {call.status}
                                        </span>
                                    </td>
                                    <td className="p-3 space-x-2 text-gray-500">
                                        <DeleteOutlineOutlinedIcon
                                            sx={{ fontSize: 24 }}
                                            className="cursor-pointer text-red-500 hover:text-red-700"
                                            onClick={() => handleDelete(call._id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center p-4 text-gray-500">
                                    No call history found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* --- Mobile card view --- */}
            <div className="md:hidden space-y-4">
                {callsToRender.length > 0 ? (
                    callsToRender.map((call) => (
                        <div key={call._id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                            {/* ... existing mobile card view content ... */}
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-4">
                        No call history found.
                    </div>
                )}
            </div>
            {/* --- Pagination Controls --- */}
            {!loading && !error && totalScheduledCalls > limit && (
                <div className="flex justify-between items-center mt-6">
                    {/* ... pagination content ... */}
                </div>
            )}
        </div>
    );
};
export default HistoryCall;