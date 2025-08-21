import { useDispatch, useSelector } from "react-redux";
import { fetchSingleFamilyMemberRequest } from "../../../redux/userSlice";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdminToken } from "../../../utils/adminAuth";

const MemberDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { singleFamilyMember, loading, error } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate("/admin-login");
      return;
    }
    dispatch(fetchSingleFamilyMemberRequest({ id, token }));
  }, [id, dispatch, navigate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-5 sm:p-8 border border-gray-200 max-h-screen overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          Family Member Details
        </h2>

        {singleFamilyMember?.data?.familyMember ? (
          <div className="space-y-3">
            {[
              { label: "Name", value: singleFamilyMember.data.familyMember.name },
              { label: "Email", value: singleFamilyMember.data.familyMember.email },
              { label: "Phone Number", value: singleFamilyMember.data.familyMember.phoneNumber },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-xl"
              >
                <p className="text-lg font-semibold text-gray-800">{item.label}</p>
                <p className="text-gray-600 break-words">{item.value || "N/A"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No member data found.</p>
        )}

        <button
          onClick={() => navigate(-1)}
          className="w-full mt-6 bg-[#3FBF81] text-white font-semibold py-2 px-3 rounded-xl shadow-md hover:bg-[#3FBF84] transition-transform transform hover:scale-105"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default MemberDetail;



