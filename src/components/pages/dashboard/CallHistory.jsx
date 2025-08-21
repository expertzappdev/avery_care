import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CallHistoryTable from "./CallHistoryTable";
import { fetchScheduledCallsRequest, clearCallMessages } from "../../../redux/callSlice.js";
import { toast } from "react-toastify";

export default function CallHistory() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { scheduledCalls, loading, error, message } = useSelector(
    (state) => state.call
  );

  const allFetchedCallsArray = scheduledCalls?.data || [];
  const totalCalls = scheduledCalls?.total || 0;
  const totalPages = Math.ceil(totalCalls / itemsPerPage);

  useEffect(() => {
    if (user?._id) {
      const filters = {
        page: currentPage,
        limit: itemsPerPage,
      };

      if (filterType === "pending") {
        filters.status = "pending";
      } else if (filterType === "completed") {
        filters.status = "completed";
      } else if (filterType === "failed") {
        filters.status = "failed";
      } else if (filterType === "recipientName" && search) {
        filters.recipientName = search;
      } else if (filterType === "scheduledAtBeetweenStartDate" && search) {
        filters.scheduledAtBeetweenStartDate = search;
      }

      dispatch(fetchScheduledCallsRequest(filters));
    }
  }, [dispatch, user, currentPage, itemsPerPage, search, filterType]);

  useEffect(() => {
    if (error) {
      toast.error(`❌ Error: ${error}`);
      dispatch(clearCallMessages());
    }
    if (message) {
      toast.success(`✅ ${message}`);
      dispatch(clearCallMessages());
    }
  }, [error, message, dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col sm:px-10 lg:px-12 pb-12 min-h-screen bg-white space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Call History</h1>
        <p className="text-gray-500">View and search through your past AI health calls.</p>
      </div>

      <div className="max-w-3xl w-full space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={filterType}
            onChange={handleFilterTypeChange}
            className="px-4 py-2 rounded-md bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-green-300 transition"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="recipientName">Recipient Name</option>
            {/* <option value="scheduledAtBeetweenStartDate">Date</option> */}
          </select>

          <div className="relative flex-grow">
            {/* {(filterType === "recipientName" || filterType === "scheduledAtBeetweenStartDate") && (
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
            )} */}
            <input
              type="text"
              placeholder={
                filterType === "recipientName"
                  ? "Search by Recipient Name"
                  : filterType === "datscheduledAtBeetweenStartDatee"
                  ? "Filter by Date (YYYY-MM-DD or August 2025)"
                  : "Search disabled for this filter"
              }
              value={search}
              onChange={handleSearchChange}
              disabled={filterType !== "recipientName" && filterType !== "scheduledAtBeetweenStartDate"}
              className={`w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-green-300 transition ${
                filterType !== "recipientName" && filterType !== "scheduledAtBeetweenStartDate"
                  ? "bg-gray-100 cursor-not-allowed"
                  : ""
              }`}
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl w-full">
        {loading && allFetchedCallsArray.length === 0 ? (
          <p className="text-gray-500">Loading call history...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <CallHistoryTable
            calls={allFetchedCallsArray}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            loading={loading}
          />
        )}
        {!loading && !error && allFetchedCallsArray.length === 0 && (
          <p className="text-gray-500 italic mt-4">
            No calls found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}
