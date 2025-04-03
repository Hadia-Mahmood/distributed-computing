// "use client";
// import React, { useState } from "react";
// import { useGetApplicationById } from "../../../hooks/organization-hook"; 

// const FileDisplaySection = ({ label, files }) => {
//   return (
//     <div className="my-3">
//       {files.length > 0 ? (
//         <div className="space-y-2">
//           {files.map((file, index) => (
//             <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
//               <span className="text-gray-700">{file.name}</span>
//               <a
//                 href={file.url} // assuming files have a url
//                 className="text-blue-500 underline"
//                 download
//               >
//                 Download
//               </a>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="w-full h-32 bg-gray-200 rounded-md flex flex-col items-center justify-center text-gray-700">
//           <p>{label}</p>
//         </div>
//       )}
//     </div>
//   );
// };
// //breakdown table
// const RequestedAmountTable = ({ data }) => {
//   return (
//     <div className="my-5">
//       <table className="w-full table-auto">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="py-2 px-4 text-left">Purpose</th>
//             <th className="py-2 px-4 text-left">Amount</th>
//             <th className="py-2 px-4 text-left">Document</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index} className="border-t">
//               <td className="py-2 px-4">{item.purpose}</td>
//               <td className="py-2 px-4">{item.amount}</td>
//               <td className="py-2 px-4">
//                 <a href={item.documentUrl} className="text-blue-500 underline" download>
//                   Download
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const ApplicationFormDetails = ({applicationId}) => {
//   console.log("applicationId",applicationId );
//   const {
//     data: applicationData,
//     isLoading: applicationLoading,
//     error: applicationError,
//   } = useGetBreakdownProof(breakdownId);

//   console.log("applicationData", applicationData);

//   if (applicationLoading) return <div>Loading...</div>;
//   if (applicationError || !applicationData) return <div className="text-red-500">No proof found.</div>;

//   const [approvalType, setApprovalType] = useState("");
//   //mock data
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
//       <h1 className="font-bold text-3xl">Beneficiary Application Form</h1>
//       <p className="text-sm mt-3 leading-6 text-[#62706b]">
//         Below are the details regarding the aid support needed for donation assistance.
//       </p>

//       {/* Personal Information Group */}
//       <div className="my-5">
//         <h1 className="font-semibold text-lg mb-3">Personal Information</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="font-semibold block">Full Name</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.fullname}</p>
//           </div>
//           <div>
//             <label className="font-semibold block">Age</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.age}</p>
//           </div>
//           <div>
//             <label className="font-semibold block">Gender</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.gender}</p>
//           </div>
//           <div>
//             <label className="font-semibold block">Contact Number</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.contactNumber}</p>
//           </div>
//           <div>
//             <label className="font-semibold block">Address</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.address}</p>
//           </div>
//         </div>
//       </div>

//       {/* Occupation and Assistance Reason */}
//       <div className="my-5">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="font-semibold block">Occupation</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.occupation}</p>
//           </div>
//           <div>
//             <label className="font-semibold block">Reason for Assistance</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.reasonForAssistance}</p>
//           </div>
//         </div>
//       </div>

//       {/* Support Documents */}
//       <FileDisplaySection
//         label="Uploaded Support Documents"
//         files={data.supportDocuments}
//       />

// <h1 className="font-semibold text-lg mb-3">Amount Breakdown</h1>
       
//       <RequestedAmountTable data={data.requestedAmountBreakdown} />

//       {/* Total Amount Requested */}
//       <div className="my-5">
//         <label className="font-semibold mb-2 block">Total Amount Requested</label>
//         <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.totalAmountRequested}</p>
//       </div>

//       {/* Financial Information */}
//       <div className="my-5">
//       <h1 className="font-semibold text-lg mb-3">Financial Information</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="font-semibold mb-2 block">Monthly Income</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.monthlyIncome}</p>
//           </div>
//           <div>
//             <label className="font-semibold mb-2 block">Source of Income</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.sourceOfIncome}</p>
//           </div>
//           <div>
//             <label className="font-semibold mb-2 block">Other Aid Sources</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.otherAidSources}</p>
//           </div>
//         </div>
//       </div>

//       {/* Bank Account Details */}
//       <div className="my-5">
//         <h1 className="font-semibold text-lg mb-3">Bank Account Details</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="font-semibold mb-2 block">Account Holder's Name</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.bankAccountDetails.accountHolderName}</p>
//           </div>
//           <div>
//             <label className="font-semibold mb-2 block">Account Number</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.bankAccountDetails.accountNumber}</p>
//           </div>
//           <div>
//             <label className="font-semibold mb-2 block">Bank Name</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.bankAccountDetails.bankName}</p>
//           </div>
//           <div>
//             <label className="font-semibold mb-2 block">Branch/IFSC/Swift Code</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.bankAccountDetails.branchIfsc}</p>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex space-x-4 mt-6">
//         <button
//           className="bg-red-600 text-white px-4 py-2 rounded-md"
//           onClick={() => alert("Application Rejected")}
//         >
//           Reject Application
//         </button>
//         <div className="relative">
//           <button
//             className="bg-green-600 text-white px-4 py-2 rounded-md"
//             onClick={() => setApprovalType(approvalType ? "" : "pending")}
//           >
//             Approve Application
//             {approvalType && (
//               <span className="ml-2 text-sm font-semibold">{approvalType === "Emergency" ? "Emergency Case" : "Normal Case"}</span>
//             )}
//           </button>
//           {approvalType === "" && (
//             <div className="absolute bg-white border shadow-lg mt-1 rounded-md w-full">
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                 onClick={() => setApprovalType("Emergency")}
//               >
//                 Emergency Case
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                 onClick={() => setApprovalType("Normal")}
//               >
//                 Normal Case
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationFormDetails;







































"use client";
import React, { useState, useEffect } from "react";
import { useGetApplicationById } from "../../../hooks/organization-hook";
import { useApplicationApproval } from "../../../hooks/organization-hook";
import { useRouter } from "next/navigation"; 
import { toast } from "react-toastify";
const FileDisplaySection = ({ label, files }) => {
  return (
    <div className="my-3">
      {files.length > 0 ? (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
              <span className="text-gray-700">{file.name}</span>
              <a href={file.url} className="text-blue-500 underline" download>
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

// 

//   const { data: applicationData, isLoading, error } = useGetApplicationById(applicationId);
  
//   return (
//     <div className="my-5">
//       <table className="w-full table-auto">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="py-2 px-4 text-left">Purpose</th>
//             <th className="py-2 px-4 text-left">Amount</th>
//             <th className="py-2 px-4 text-left">Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index} className="border-t">
//               <td className="py-2 px-4">{item.purpose}</td>
//               <td className="py-2 px-4">${item.amount}</td>
//               <td className="py-2 px-4">{item.description}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
const RequestedAmountTable = ({ data }) => {
  const downloadFile = async (hash) => {
    const response = await fetch(`${hash}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "file"; // Change filename as needed
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  
  
  return (
    <div className="my-5">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Purpose</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Document</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">{item.purpose}</td>
              <td className="py-2 px-4">${item.amount}</td>
              <td className="py-2 px-4">{item.description}</td>
              <td className="py-2 px-4">
                 {/* <a href={item.documentHash} className="text-blue-500 underline" download>
                  Download
                 </a> */}
                 <a onClick={() => downloadFile(item.documentHash)} className="text-blue-500 underline cursor-pointer">
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

// const ApplicationFormDetails = ({ applicationId }) => {
//   const { data: applicationData, isLoading, error } = useGetApplicationById(applicationId);
//   const [approvalType, setApprovalType] = useState("");
//   const [data, setData] = useState({
//       applicationApproval: "",
//       applicationId: applicationId,
//     });
//   const { mutate: addMutate } = useApplicationApproval(
//       JSON.stringify({...data  })
//     );
//   const handleInputChange = (event) => {
//       const { name, value } = event.target;
//       setData({
//         ...data,
//         [name]: value,
//       });
//     };
  
//   const [loading, setIsLoading] = useState(false);
//   const handleSubmit = async (event) => {
//       event.preventDefault();
//       setIsLoading(true);
//       console.log(data);
//       addMutate(
//             {},
//             {
//               onSuccess: (response) => {
//                 console.log("OnSuccess");
//                 toast.success(response?.data?.message);
//                 setIsLoading(false);
//                 router.push("/dashboard/beneficiary");
//               },
//               onError: (error) => {
//                 console.log("OnError", error);
//                 toast.error(error.response?.data?.message || "Something went wrong");
//                 setIsLoading(false);
//               },
//             });
//           } 
//         ;
//   if (isLoading) return <div>Loading...</div>;
//   if (error || !applicationData) return <div className="text-red-500">No application found.</div>;

//   const application = applicationData.application;
  
//   return (
//     <div className="p-4 sm:p-5 md:p-10 bg-[#fff] rounded-md font-poppins">
//       <h1 className="font-bold text-3xl">Beneficiary Application Form</h1>
//       <p className="text-sm mt-3 leading-6 text-[#62706b]">
//         Below are the details regarding the aid support needed for donation assistance.
//       </p>
//       <div className="my-5">
//         <h1 className="font-semibold text-lg mb-3">Personal Information</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div><label className="font-semibold block">Full Name</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.name}</p></div>
//           <div><label className="font-semibold block">Age</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.age}</p></div>
//           <div><label className="font-semibold block">Gender</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.gender}</p></div>
//           <div><label className="font-semibold block">Contact Number</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.contact}</p></div>
//           <div><label className="font-semibold block">Address</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.address}</p></div>
//         </div>
//       </div>
//       {/* Occupation and Assistance Reason */}
//        <div className="my-5">
//          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//            <div>
//              <label className="font-semibold block">Occupation</label>
//              <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.occupation}</p>
//            </div>
//            <div>
//              <label className="font-semibold block">Reason for Assistance</label>
//              <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.description}</p>
//            </div>
//          </div>
//        </div>
//       <h1 className="font-semibold text-lg mb-3">Amount Breakdown</h1>
//       <RequestedAmountTable data={application.breakdowns} />
//       {/* Total Amount Requested */}
//          <label className="font-semibold mb-2 block">Total Amount Requested</label>
//        <div className="my-5">
//          <p className="text-gray-700 bg-gray-100 p-2 rounded-md">${application.amountRequested}</p>
//        </div>

//        {/* Financial Information */}
//        <div className="my-5">
//        <h1 className="font-semibold text-lg mb-3">Financial Information</h1>
//          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//            <div>
//              <label className="font-semibold mb-2 block">Monthly Income</label>
//              <p className="text-gray-700 bg-gray-100 p-2 rounded-md">${application.monthlyIncome}</p>
//            </div>
//            <div>
//              <label className="font-semibold mb-2 block">Source of Income</label>
//              <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.sourceOfIncome}</p>
//            </div>
//            <div>
//             <label className="font-semibold mb-2 block">Other Aid Sources</label>
//              <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.otherAidSources}</p>
//            </div>
//          </div>
//        </div>
//       <div className="my-5">
//         <h1 className="font-semibold text-lg mb-3">Bank Account Details</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div><label className="font-semibold block">Account Holder</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.bankDetails.accountHolder}</p></div>
//           <div><label className="font-semibold block">Account Number</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.bankDetails.accountNumber}</p></div>
//           <div><label className="font-semibold block">Bank Name</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.bankDetails.bankName}</p></div>
//           <div><label className="font-semibold block">Branch Code</label>
//             <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.bankDetails.branchCode}</p></div>
//         </div>
//       </div>
//       <div className="flex space-x-4 mt-6">
//         <button className="bg-red-600 text-white px-4 py-2 rounded-md" onClick={() => alert("Application Rejected")}>Reject Application</button>
//         <div className="relative">
//           <button className="bg-green-600 text-white px-4 py-2 rounded-md" onClick={() => setApprovalType(approvalType ? "" : "pending")}>
//             Approve Application
//             {approvalType && <span className="ml-2 text-sm font-semibold">{approvalType === "Emergency" ? "Emergency Case" : "Normal Case"}</span>}
//           </button>
//           {approvalType === "" && (
//             <div className="absolute bg-white border shadow-lg mt-1 rounded-md w-full">
//               <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => setApprovalType("Emergency")}>Emergency Case</button>
//               <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => setApprovalType("Normal")}>Normal Case</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationFormDetails;


const ApplicationFormDetails = ({ applicationId }) => {
  const router = useRouter();
  const { data: applicationData, isLoading, error } = useGetApplicationById(applicationId);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    applicationApproval: "",
    applicationId: applicationId,
  });

  const { mutate: addMutate } = useApplicationApproval(JSON.stringify(data));

  const handleSubmit = (status) => {
    setLoading(true);
    setData({ ...data, applicationApproval: status });

    addMutate(
      { applicationApproval: status },
      {
        onSuccess: (response) => {
          toast.success(response?.data?.message);
          setLoading(false);
          router.push("/dashboard/organization/process-application");
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Something went wrong");
          setLoading(false);
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !applicationData) return <div className="text-red-500">No application found.</div>;

  const application = applicationData.application;
  console.log("application",application);
  return (
    <div className="p-4 sm:p-5 md:p-10 bg-[#fff] rounded-md font-poppins">
      <h1 className="font-bold text-3xl">Beneficiary Application Form</h1>
      <p className="text-sm mt-3 leading-6 text-[#62706b]">
        Below are the details regarding the aid support needed for donation assistance.
      </p>

      {/* Personal Information */}
      <div className="my-5">
        <h1 className="font-semibold text-lg mb-3">Personal Information</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="font-semibold block">Full Name</label><p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.name}</p></div>
          <div><label className="font-semibold block">Age</label><p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.age}</p></div>
          <div><label className="font-semibold block">Gender</label><p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.gender}</p></div>
          <div><label className="font-semibold block">Contact Number</label><p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.contact}</p></div>
          <div><label className="font-semibold block">Address</label><p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.address}</p></div>
        </div>
      </div>

      {/* Occupation and Reason for Assistance */}
      <div className="my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block">Occupation</label>
            <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.occupation}</p>
          </div>
          <div>
            <label className="font-semibold block">Reason for Assistance</label>
            <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.description}</p>
          </div>
        </div>
      </div>

      {/* Amount Breakdown */}
      <h1 className="font-semibold text-lg mb-3">Amount Breakdown</h1>
      <RequestedAmountTable data={application.breakdowns} />

      {/* Total Amount Requested */}
      <label className="font-semibold mb-2 block">Total Amount Requested</label>
      <div className="my-5">
        <p className="text-gray-700 bg-gray-100 p-2 rounded-md">${application.amountRequested}</p>
      </div>

      {/* Financial Information */}
      <div className="my-5">
        <h1 className="font-semibold text-lg mb-3">Financial Information</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold mb-2 block">Monthly Income</label>
            <p className="text-gray-700 bg-gray-100 p-2 rounded-md">${application.monthlyIncome}</p>
          </div>
          <div>
            <label className="font-semibold mb-2 block">Source of Income</label>
            <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.sourceOfIncome}</p>
          </div>
          <div>
            <label className="font-semibold mb-2 block">Other Aid Sources</label>
            <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.otherAidSources}</p>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="my-5">
        <h1 className="font-semibold text-lg mb-3">Bank Account Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="font-semibold block">Account Holder</label><p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.bankDetails.accountHolder}</p></div>
          <div><label className="font-semibold block">Account Number</label><p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.bankDetails.accountNumber}</p></div>
          <div><label className="font-semibold block">Bank Name</label><p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.bankDetails.bankName}</p></div>
          <div><label className="font-semibold block">Branch Code</label><p className="text-gray-700 bg-gray-100 p-2 rounded-md">{application.bankDetails.branchCode}</p></div>
        </div>
      </div>

      {/* Approval Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={() => handleSubmit("no")}
          disabled={loading}
        >
          {loading ? "Processing..." : "Reject Application"}
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md"
          onClick={() => handleSubmit("yes")}
          disabled={loading}
        >
          {loading ? "Processing..." : "Approve Application"}
        </button>
      </div>
    </div>
  );
};

export default ApplicationFormDetails;

