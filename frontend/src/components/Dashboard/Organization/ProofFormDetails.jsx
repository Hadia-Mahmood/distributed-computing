"use client";
import React, { useState } from "react";
import { useGetBreakdownProofById } from "../../../hooks/organization-hook";
import { useRouter } from "next/navigation"; 
import { toast } from "react-toastify";
import { useProofStatus } from "../../../hooks/organization-hook";
const FileDisplaySection = ({ label, files }) => {
  return (
    <div className="my-3">
      {files.length > 0 ? (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
              <span className="text-gray-700">{file.name}</span>
              <a
                href={file.url} // assuming files have a url
                className="text-blue-500 underline"
                download
              >
                Download
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-32 bg-gray-200 rounded-md flex flex-col items-center justify-center text-gray-700">
          <p>{label}</p>
        </div>
      )}
    </div>
  );
};

const RequestedAmountTable = ({ data }) => {
  return (
    <div className="my-5">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Purpose</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Document</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">{item.purpose}</td>
              <td className="py-2 px-4">{item.amount}</td>
              <td className="py-2 px-4">
                <a href={item.documentUrl} className="text-blue-500 underline" download>
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// const ProofFormDetails = ({breakdownProofId}) => {
//   const [approvalType, setApprovalType] = useState("");
  
//   const { data: breakdownProofData, isLoading, error } = useGetApplicationById(breakdownProofId);
//   const data = {
//     image: "profile-image.jpg", // Assuming this is the image
//     fullname: "Jane Doe",
//     age: 30,
//     gender: "Female",
//     contactNumber: "9876543210",
//     address: "123 Main St, City, Country",
//     occupation: "Teacher",
//     reasonForAssistance: "Need assistance for medical bills.",
//     supportDocuments: [
//       { name: "MedicalBill.pdf", url: "/path/to/MedicalBill.pdf" },
//       { name: "Receipt.png", url: "/path/to/Receipt.png" },
//     ],
//     requestedAmountBreakdown: [
//       { purpose: "Medical Bills", amount: "$500", documentUrl: "/path/to/MedicalBill.pdf" },
//       { purpose: "Living Expenses", amount: "$300", documentUrl: "/path/to/Receipt.png" },
//     ],
//     bankAccountDetails: {
//       accountHolderName: "Jane Doe",
//       accountNumber: "1234567890",
//       bankName: "City Bank",
//       branchIfsc: "CITY0001234",
//     },
//     monthlyIncome: "$1500",
//     sourceOfIncome: "Teaching",
//     otherAidSources: "Local charity, community support",
//     totalAmountRequested: "$800",
//   };

//   return (
//     <div className="p-4 sm:p-5 md:p-10 bg-[#fff] rounded-md font-poppins">
//       <h1 className="font-bold text-3xl">Aid Support Usage Details </h1>
//       <p className="text-sm mt-3 leading-6 text-[#62706b]">
//         Below are the details regarding the aid support provided for donation assistance.
//       </p>

      
//       {/* Support Documents */}
//       <FileDisplaySection
//         label="Uploaded Support Documents"
//         files={data.supportDocuments}
//       />
//       {/* Occupation and Assistance Reason */}
//       <div className="my-5">
//         <div className="grid grid-cols-1 ">
          
//           <div>
//             <label className="font-semibold block">Summary Of Usage</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.reasonForAssistance}</p>
//           </div>
//         </div>
//       </div>

      
//       <div>
//             <label className="font-semibold block">Completion Date</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">2024-07-11</p>
//           </div>



      

//       {/* third party verification */}
//       <div className="my-5">
//       <h1 className="font-bold text-2xl">Third Party Verification </h1>
       
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="font-semibold mb-2 block"> Third-Party Name</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.bankAccountDetails.accountHolderName}</p>
//           </div>
//           <div>
//             <label className="font-semibold mb-2 block">Third-Party Contact Number</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.bankAccountDetails.accountNumber}</p>
//           </div>
//           <div>
//             <label className="font-semibold mb-2 block">Third-Party Email Address</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.bankAccountDetails.bankName}</p>
//           </div>
         
            
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex space-x-4 mt-6">
//         <button
//           className="bg-red-600 text-white px-4 py-2 rounded-md"
//           onClick={() => alert("Proof Rejected")}
//         >
//           Reject Proof
//         </button>
//         <button
//           className="bg-green-600 text-white px-4 py-2 rounded-md"
//           onClick={() => alert("Proof Approved")}
//         >
//           Approve Proof
//         </button>
        
//       </div>
//     </div>
//   );
// };

// export default ProofFormDetails;

const ProofFormDetails = ({ breakdownProofId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [data, setData] = useState({
      proofStatus: "",
      breakdownProofId: breakdownProofId,
    });
  
  const { mutate: addMutate } = useProofStatus(JSON.stringify(data));

   const handleSubmit = (status) => {
      setLoading(true);
      setData({ ...data, proofStatus: status });
  
      addMutate(
        { proofStatus: status },
        {
          onSuccess: (response) => {
            toast.success(response?.data?.message);
            setLoading(false);
            router.push("/dashboard/organization/process-proofs");
          },
          onError: (error) => {
            toast.error(error.response?.data?.message || "Something went wrong");
            setLoading(false);
          },
        }
      );
    };
  // Fetch Breakdown Proof Data
  const { data: breakdownProofData, isLoading, error } = useGetBreakdownProofById(breakdownProofId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const {
    breakdownId,
    proofStatus,
    proofDocumentEncryption,
    usageSummary,
    completionDate,
    thirdPartyVerification,
    breakdownFileHash,
    createdAt,
    updatedAt,
  } = breakdownProofData?.breakdownProof || {};

  
  return (
    <div className="p-4 sm:p-5 md:p-10 bg-[#fff] rounded-md font-poppins">
      <h1 className="font-bold text-3xl">Aid Support Usage Details </h1>
      <p className="text-sm mt-3 leading-6 text-[#62706b]">
        Below are the details regarding the aid support provided for donation assistance.
      </p>

      {/* Support Documents */}
      <FileDisplaySection
        label="Uploaded Support Documents"
        files={[
          { name: "Proof Document", url: breakdownFileHash || "/mock-document.pdf" },
        ]}
      />

      {/* Breakdown Details */}
      <div className="my-5">
        <div className="grid grid-cols-1">
          <div>
            <label className="font-semibold block">Summary Of Usage</label>
            <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{usageSummary || "No summary available"}</p>
          </div>
        </div>
      </div>

      {/* Completion Date */}
      <div>
        <label className="font-semibold block">Completion Date</label>
        <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{new Date(completionDate).toLocaleDateString()}</p>
      </div>

      {/* Third-Party Verification */}
      <div className="my-5">
        <h1 className="font-bold text-2xl">Third-Party Verification </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold mb-2 block">Third-Party Name</label>
            <p className="text-gray-700 bg-gray-100 p-2 rounded-md">
              {thirdPartyVerification?.name || "N/A"}
            </p>
          </div>
          <div>
            <label className="font-semibold mb-2 block">Third-Party Contact Number</label>
            <p className="text-gray-700 bg-gray-100 p-2 rounded-md">
              {thirdPartyVerification?.contactNumber || "N/A"}
            </p>
          </div>
          <div>
            <label className="font-semibold mb-2 block">Third-Party Email Address</label>
            <p className="text-gray-700 bg-gray-100 p-2 rounded-md">
              {thirdPartyVerification?.email || "N/A"}
            </p>
          </div>
        </div>
      </div>

    {/* Approval Buttons */}
    <div className="flex space-x-4 mt-6">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={() => handleSubmit("rejected")}
          disabled={loading}
        >
          {loading ? "Processing..." : "Reject Proof"}
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md"
          onClick={() => handleSubmit("approved")}
          disabled={loading}
        >
          {loading ? "Processing..." : "Approve Proof"}
        </button>
      </div>
    </div>
  );
};

export default ProofFormDetails;
