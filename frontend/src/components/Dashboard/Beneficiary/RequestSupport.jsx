"use client";

import Input from "@/components/CC/Input";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useStateContext } from "@/app/StateContext";
import { FaUpload, FaSpinner } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useCreateApplication } from "../../../hooks/beneficiary-hook";
import axios from "axios";
 
// when beneficiary is sending application , i want to upload breakdown document in ipfs and return the hash of it , store this hash in database
const RequestSupport = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [applicationPicture, setApplicationPicture] = useState(null);
  const { user } = useStateContext();
  const [breakdown, setBreakdown] = useState([
    { purpose: "", amount: "", description: "" },
  ]);
  
  const [data, setData] = useState({
    name: "",
    age: "",
    userId: user?.userId,
    gender: "",
    applicationTitle: "",
    address: "",
    contact: "",
    occupation: "",
    description: "",
    deadline: "",
    applicationPicture: "",
    amountRequested: "",
    monthlyIncome: "",
    sourceOfIncome: "",
    otherAidSources: "",
    bankDetails: {
      accountHolder: "",
      accountNumber: "",
      bankName: "",
      branchCode: "",
    },
    
    declarationAgreed: false,
   
  });

 
  const uploadFileToIPFS = async (file) => {
    try {
      const fileData = new FormData();
      fileData.append("file", file);
  
      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
          "Content-Type": "multipart/form-data",
        },
      });
  
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
      return null;
    }
  };
  
  const { mutate: addMutate } = useCreateApplication(
    JSON.stringify({...data, breakdowns: breakdown  })
  );


  // Handle Form Input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleBankDetailsChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      bankDetails: {
        ...data.bankDetails,
        [name]: value,
      },
    });
  };



  const handleFileChange = (event) => {
    console.log("handle application picture Image");
    const { name, value } = event.target;
    if (name === "applicationPicture") {
      const reader = new FileReader();

      reader.onload = () => {
        console.log("handleImage22");
        if (reader.readyState === 2) {
          setData({ ...data, [name]: reader.result });
          setApplicationPicture(reader.result);
        }
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      setUserData({ ...data, [name]: value });
    }
  };

  const removeAvatar = () => {
    setApplicationPicture(null);
    setData({ ...data, image: "" });
  };
  

  
  // Handler to manage changes in the breakdown fields
  const handleBreakdownChange = (index, event) => {
    const { name, value } = event.target;
    const updatedBreakdown = [...breakdown];
    updatedBreakdown[index] = {
      ...updatedBreakdown[index],
      [name]: value,
    };
    setBreakdown(updatedBreakdown);
  };
  

  // here
  const handleBreakdownFileChange = async (index, event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const ipfsHash = await uploadFileToIPFS(file);
    if (!ipfsHash) {
      toast.error("Failed to upload file to IPFS");
      return;
    }
  
    const updatedBreakdown = [...breakdown];
    updatedBreakdown[index] = {
      ...updatedBreakdown[index],
      documentHash: ipfsHash, // Store only the IPFS hash
    };
  
    setBreakdown(updatedBreakdown);
  };
  

  
  
  const addBreakdownField = () => {
    setBreakdown([
      ...breakdown,
      {  purpose: "",
         amount: "",
         description: "",
         documents: [] },
    ]);
  };
  
  // Remove a breakdown field
  const removeBreakdownField = (index) => {
    const updatedBreakdown = breakdown.filter((_, i) => i !== index);
    setBreakdown(updatedBreakdown);
  };
  
 
 
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    // Ensure all breakdown documents are uploaded
    const updatedBreakdown = await Promise.all(
      breakdown.map(async (item) => {
        if (item.documents && item.documents.length > 0) {
          const uploadedFiles = await Promise.all(
            item.documents.map(async (file) => await uploadFileToIPFS(file))
          );
          return { ...item, documents: uploadedFiles };
        }
        return item;
      })
    );
  
    const applicationData = { ...data, breakdowns: updatedBreakdown };
  
    console.log("applicationData",applicationData);
    addMutate(applicationData, {
      onSuccess: (response) => {
        toast.success(response?.data?.message);
        setIsLoading(false);
        router.push("/dashboard/beneficiary");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
        setIsLoading(false);
      },
    });
  };
  

  return (
    <div className="p-4 sm:p-5 md:p-10 bg-[#fff] rounded-md font-poppins">
      <h1 className="font-bold text-3xl">Beneficiary Application Form</h1>
      <p className="text-sm mt-3 leading-6 text-[#62706b]">
        Please complete the form below to apply for donation assistance.
      </p>
      <form className="w-full mt-10" onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="my-3">
          {applicationPicture ? (
            <div className="">
              <div className="w-24 h-24 mx-auto relative">
                <img
                  src={applicationPicture}
                  alt="Image"
                  className="rounded-full w-full h-full"
                />
                <button
                  type="button"
                  onClick={removeAvatar}
                  className="absolute top-0 right-0 p-[5px] bg-gray-200 rounded-full"
                >
                  <RxCross1 className="text-[#000] text-[14px]" />
                </button>
              </div>
            </div>
          ) : (
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <div className="w-full h-32 bg-gray-200 rounded-md flex flex-col items-center justify-center text-gray-700">
                <FaUpload className="text-2xl" />
                <p>Upload Image</p>
                <p className="text-xs mt-2">Click to browse the image</p>
              </div>
            </label>
          )}
          <input
            id="avatar-upload"
            name="applicationPicture"
            required
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-5">
        <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            name="name"
            onChange={handleInputChange}
            value={data.name}
            required
          />
          <Input
            label="Age"
            type="number"
            placeholder="Enter your age"
            name="age"
            onChange={handleInputChange}
            value={data.age}
            required
          />
          <select
            name="gender"
            required
            value={data.gender}
            onChange={handleInputChange}
            className="col-span-2 border-2 rounded-md p-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <Input
            label="Contact Number"
            type="text"
            placeholder="Enter your contact number"
            name="contact"
            onChange={handleInputChange}
            value={data.contact}
            required
          />
          <Input
            label="Address"
            type="text"
            placeholder="Enter your address"
            name="address"
            onChange={handleInputChange}
            value={data.address}
            required
          />
          <Input
            label="Occupation"
            type="text"
            placeholder="Enter your occupation"
            name="occupation"
            onChange={handleInputChange}
            value={data.occupation}
          />
        </div>

        {/* Financial Information */}
        <div className="col-span-2">
            
            <label className="font-semibold text-sm text-[#202725] mb-2">
              Application Title
            </label>
            <textarea
              name="applicationTitle"
              required
              placeholder="Enter application title"
              value={data.applicationTitle}
              onChange={handleInputChange}
              className="outline-none text-sm p-4 w-full rounded-md border-2 border-[#d9e4df] h-24"
            ></textarea>
            <label className="font-semibold text-sm text-[#202725] mb-1">
              Reason for Assistance
            </label>
            <textarea
              name="description"
              required
              placeholder="Explain why you need assistance"
              value={data.description}
              onChange={handleInputChange}
              className="outline-none text-sm p-4 w-full rounded-md border-2 border-[#d9e4df] h-24"
            ></textarea>
          </div>
         
          <div className="grid grid-cols-2 gap-5">
          <Input
            label="Total Amount Requested"
            type="number"
            name="amountRequested"
            required
            onChange={handleInputChange}
          />
          <Input
            label="Deadline"
            type="date"
            placeholder="Enter deadline "
            name="deadline"
            onChange={handleInputChange}
            value={data.deadline}
            required
          />
          <Input
            label="Monthly Income"
            type="number"
            name="monthlyIncome"
            onChange={handleInputChange}
          />
          <Input
            label="Source of Income"
            type="text"
            name="sourceOfIncome"
            onChange={handleInputChange}
          />
          <Input
            label="Other Aid Sources"
            type="text"
            name="otherAidSources"
            onChange={handleInputChange}
          />
        </div>

        

        <div className="mt-6">
      <h2 className="font-bold text-lg">Breakdown of Requested Amount</h2>
    {breakdown.map((field, index) => (
    <div key={index} className="grid grid-cols-4 gap-4 mt-4">
      <Input
        label="Purpose"
        type="text"
        name="purpose"
        value={field.purpose}
        onChange={(e) => handleBreakdownChange(index, e)}
      />
      <Input
        label="Description"
        type="text"
        name="description"
        value={field.description}
        onChange={(e) => handleBreakdownChange(index, e)}
      />
      <Input
        label="Amount"
        type="number"
        name="amount"
        value={field.amount}
        onChange={(e) => handleBreakdownChange(index, e)}
        
      />
      
     
{/* here */}
      {/* File upload for breakdown to ipfs */}
      <input
        type="file"
        name="documents"
        accept="application/pdf,image/*"
        onChange={(e) => handleBreakdownFileChange(index, e)}
        style={{
          paddingTop: '0px',
          paddingBottom: '0px',
          paddingLeft: '0px',
          paddingRight: '0px',
          width: '400px',
          height: '54px',
          marginTop: '27px',
        }}
      />
      
       <button
  type="button"
  className="bg-red-500 text-white p-2 rounded-md"
  style={{
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    paddingRight: '0px',
    width: '200px',
    height: '54px',
    marginTop: '25px',
  }}
  onClick={() => removeBreakdownField(index)}
>
  Remove
</button>


      
    </div>
  ))}
  
  {/* Add Breakdown Field */}
  <button
    type="button"
    onClick={addBreakdownField}
    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
  >
    Add Field
  </button>
</div>
        {/* Bank Details */}
        <div className="mt-6">
          <h2 className="font-bold text-lg">Bank Account Details</h2>
          <Input
            label="Account Holder's Name"
            type="text"
            name="accountHolder"
            onChange={handleBankDetailsChange}
          />
          <Input
            label="Account Number"
            type="text"
            name="accountNumber"
            onChange={handleBankDetailsChange}
          />
          <Input
            label="Bank Name"
            type="text"
            name="bankName"
            onChange={handleBankDetailsChange}
          />
          <Input
            label="Branch/IFSC/Swift Code"
            type="text"
            name="branchCode"
            onChange={handleBankDetailsChange}
          />
        </div>

        {/* Declaration */}
        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="declarationAgreed"
              required
              onChange={(e) =>
                setData({ ...data, declarationAgreed: e.target.checked })
              }
            />
            <span className="ml-2 text-sm">
              I certify that the information provided is true and correct to
              the best of my knowledge. I understand that any false information
              may result in the rejection of my application or legal action.
            </span>
          </label>
        </div>

        {/* Submit */}
        <div className="grid place-items-center mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 px-4 py-2 rounded ${
              isLoading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestSupport;






// bilkul sahi without ipfs
// "use client";

// import Input from "@/components/CC/Input";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { useStateContext } from "@/app/StateContext";
// import { FaUpload, FaSpinner } from "react-icons/fa";
// import { RxCross1 } from "react-icons/rx";
// import { useCreateApplication } from "../../../hooks/beneficiary-hook";
// import axios from "axios";
 
// // when beneficiary is sending application , i want to upload breakdown document in ipfs and return the hash of it , store this hash in database
// const RequestSupport = () => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [applicationPicture, setApplicationPicture] = useState(null);
//   const { user } = useStateContext();
//   const [breakdown, setBreakdown] = useState([
//     { purpose: "", amount: "", description: "" },
//   ]);
  
//   const [data, setData] = useState({
//     name: "",
//     age: "",
//     userId: user?.userId,
//     gender: "",
//     applicationTitle: "",
//     address: "",
//     contact: "",
//     occupation: "",
//     description: "",
//     deadline: "",
//     applicationPicture: "",
//     amountRequested: "",
//     monthlyIncome: "",
//     sourceOfIncome: "",
//     otherAidSources: "",
//     bankDetails: {
//       accountHolder: "",
//       accountNumber: "",
//       bankName: "",
//       branchCode: "",
//     },
    
//     declarationAgreed: false,
   
//   });
//   const { mutate: addMutate } = useCreateApplication(
//     JSON.stringify({...data, breakdowns: breakdown  })
//   );


//   // Handle Form Input
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setData({ ...data, [name]: value });
//   };

//   const handleBankDetailsChange = (event) => {
//     const { name, value } = event.target;
//     setData({
//       ...data,
//       bankDetails: {
//         ...data.bankDetails,
//         [name]: value,
//       },
//     });
//   };



//   const handleFileChange = (event) => {
//     console.log("handle application picture Image");
//     const { name, value } = event.target;
//     if (name === "applicationPicture") {
//       const reader = new FileReader();

//       reader.onload = () => {
//         console.log("handleImage22");
//         if (reader.readyState === 2) {
//           setData({ ...data, [name]: reader.result });
//           setApplicationPicture(reader.result);
//         }
//       };

//       reader.readAsDataURL(event.target.files[0]);
//     } else {
//       setUserData({ ...data, [name]: value });
//     }
//   };

//   const removeAvatar = () => {
//     setApplicationPicture(null);
//     setData({ ...data, image: "" });
//   };
  

  
//   // Handler to manage changes in the breakdown fields
//   const handleBreakdownChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedBreakdown = [...breakdown];
//     updatedBreakdown[index] = {
//       ...updatedBreakdown[index],
//       [name]: value,
//     };
//     setBreakdown(updatedBreakdown);
//   };
//   const handleBreakdownFileChange = (index, event) => {
//     const files = Array.from(event.target.files);
//     // event.target.files[0];   take these files upload them o ipfs , get their hash in return , store hash in backend
//     const updatedBreakdown = [...breakdown];
//     updatedBreakdown[index] = {
//       ...updatedBreakdown[index],
//       documents: files,
//     };
//     setBreakdown(updatedBreakdown);
//   };
  
  
//   const addBreakdownField = () => {
//     setBreakdown([
//       ...breakdown,
//       {  purpose: "",
//          amount: "",
//          description: "",
//          documents: [] },
//     ]);
//   };
  
//   // Remove a breakdown field
//   const removeBreakdownField = (index) => {
//     const updatedBreakdown = breakdown.filter((_, i) => i !== index);
//     setBreakdown(updatedBreakdown);
//   };
  
 
//   const handleSubmit = async (event) => {
//     event.preventDefault();
    
//     console.log(data); // Ensure breakdown data is included before sending
//     setIsLoading(true);
  
   
//     addMutate(
//       {},
//       {
//         onSuccess: (response) => {
//           console.log("OnSuccess");
//           toast.success(response?.data?.message);
//           setIsLoading(false);
//           router.push("/dashboard/beneficiary");
//         },
//         onError: (error) => {
//           console.log("OnError", error);
//           toast.error(error.response?.data?.message || "Something went wrong");
//           setIsLoading(false);
//         },
//       });
//     } 
//   ;
  
  

//   return (
//     <div className="p-4 sm:p-5 md:p-10 bg-[#fff] rounded-md font-poppins">
//       <h1 className="font-bold text-3xl">Beneficiary Application Form</h1>
//       <p className="text-sm mt-3 leading-6 text-[#62706b]">
//         Please complete the form below to apply for donation assistance.
//       </p>
//       <form className="w-full mt-10" onSubmit={handleSubmit}>
//         {/* Personal Information */}
//         <div className="my-3">
//           {applicationPicture ? (
//             <div className="">
//               <div className="w-24 h-24 mx-auto relative">
//                 <img
//                   src={applicationPicture}
//                   alt="Image"
//                   className="rounded-full w-full h-full"
//                 />
//                 <button
//                   type="button"
//                   onClick={removeAvatar}
//                   className="absolute top-0 right-0 p-[5px] bg-gray-200 rounded-full"
//                 >
//                   <RxCross1 className="text-[#000] text-[14px]" />
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <label htmlFor="avatar-upload" className="cursor-pointer">
//               <div className="w-full h-32 bg-gray-200 rounded-md flex flex-col items-center justify-center text-gray-700">
//                 <FaUpload className="text-2xl" />
//                 <p>Upload Image</p>
//                 <p className="text-xs mt-2">Click to browse the image</p>
//               </div>
//             </label>
//           )}
//           <input
//             id="avatar-upload"
//             name="applicationPicture"
//             required
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//         </div>
        
//         <div className="grid grid-cols-2 gap-5">
//         <Input
//             label="Full Name"
//             type="text"
//             placeholder="Enter your full name"
//             name="name"
//             onChange={handleInputChange}
//             value={data.name}
//             required
//           />
//           <Input
//             label="Age"
//             type="number"
//             placeholder="Enter your age"
//             name="age"
//             onChange={handleInputChange}
//             value={data.age}
//             required
//           />
//           <select
//             name="gender"
//             required
//             value={data.gender}
//             onChange={handleInputChange}
//             className="col-span-2 border-2 rounded-md p-2"
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//           <Input
//             label="Contact Number"
//             type="text"
//             placeholder="Enter your contact number"
//             name="contact"
//             onChange={handleInputChange}
//             value={data.contact}
//             required
//           />
//           <Input
//             label="Address"
//             type="text"
//             placeholder="Enter your address"
//             name="address"
//             onChange={handleInputChange}
//             value={data.address}
//             required
//           />
//           <Input
//             label="Occupation"
//             type="text"
//             placeholder="Enter your occupation"
//             name="occupation"
//             onChange={handleInputChange}
//             value={data.occupation}
//           />
//         </div>

//         {/* Financial Information */}
//         <div className="col-span-2">
            
//             <label className="font-semibold text-sm text-[#202725] mb-2">
//               Application Title
//             </label>
//             <textarea
//               name="applicationTitle"
//               required
//               placeholder="Enter application title"
//               value={data.applicationTitle}
//               onChange={handleInputChange}
//               className="outline-none text-sm p-4 w-full rounded-md border-2 border-[#d9e4df] h-24"
//             ></textarea>
//             <label className="font-semibold text-sm text-[#202725] mb-1">
//               Reason for Assistance
//             </label>
//             <textarea
//               name="description"
//               required
//               placeholder="Explain why you need assistance"
//               value={data.description}
//               onChange={handleInputChange}
//               className="outline-none text-sm p-4 w-full rounded-md border-2 border-[#d9e4df] h-24"
//             ></textarea>
//           </div>
         
//           <div className="grid grid-cols-2 gap-5">
//           <Input
//             label="Total Amount Requested"
//             type="number"
//             name="amountRequested"
//             required
//             onChange={handleInputChange}
//           />
//           <Input
//             label="Deadline"
//             type="date"
//             placeholder="Enter deadline "
//             name="deadline"
//             onChange={handleInputChange}
//             value={data.deadline}
//             required
//           />
//           <Input
//             label="Monthly Income"
//             type="number"
//             name="monthlyIncome"
//             onChange={handleInputChange}
//           />
//           <Input
//             label="Source of Income"
//             type="text"
//             name="sourceOfIncome"
//             onChange={handleInputChange}
//           />
//           <Input
//             label="Other Aid Sources"
//             type="text"
//             name="otherAidSources"
//             onChange={handleInputChange}
//           />
//         </div>

        

//         <div className="mt-6">
//       <h2 className="font-bold text-lg">Breakdown of Requested Amount</h2>
//     {breakdown.map((field, index) => (
//     <div key={index} className="grid grid-cols-4 gap-4 mt-4">
//       <Input
//         label="Purpose"
//         type="text"
//         name="purpose"
//         value={field.purpose}
//         onChange={(e) => handleBreakdownChange(index, e)}
//       />
//       <Input
//         label="Description"
//         type="text"
//         name="description"
//         value={field.description}
//         onChange={(e) => handleBreakdownChange(index, e)}
//       />
//       <Input
//         label="Amount"
//         type="number"
//         name="amount"
//         value={field.amount}
//         onChange={(e) => handleBreakdownChange(index, e)}
        
//       />
      
     

//       {/* File upload for breakdown to ipfs */}
//       <input
//         type="file"
//         name="documents"
//         accept="application/pdf,image/*"
//         onChange={(e) => handleBreakdownFileChange(index, e)}
//         style={{
//           paddingTop: '0px',
//           paddingBottom: '0px',
//           paddingLeft: '0px',
//           paddingRight: '0px',
//           width: '400px',
//           height: '54px',
//           marginTop: '27px',
//         }}
//       />
      
//        <button
//   type="button"
//   className="bg-red-500 text-white p-2 rounded-md"
//   style={{
//     paddingTop: '0px',
//     paddingBottom: '0px',
//     paddingLeft: '0px',
//     paddingRight: '0px',
//     width: '200px',
//     height: '54px',
//     marginTop: '25px',
//   }}
//   onClick={() => removeBreakdownField(index)}
// >
//   Remove
// </button>


      
//     </div>
//   ))}
  
//   {/* Add Breakdown Field */}
//   <button
//     type="button"
//     onClick={addBreakdownField}
//     className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//   >
//     Add Field
//   </button>
// </div>
//         {/* Bank Details */}
//         <div className="mt-6">
//           <h2 className="font-bold text-lg">Bank Account Details</h2>
//           <Input
//             label="Account Holder's Name"
//             type="text"
//             name="accountHolder"
//             onChange={handleBankDetailsChange}
//           />
//           <Input
//             label="Account Number"
//             type="text"
//             name="accountNumber"
//             onChange={handleBankDetailsChange}
//           />
//           <Input
//             label="Bank Name"
//             type="text"
//             name="bankName"
//             onChange={handleBankDetailsChange}
//           />
//           <Input
//             label="Branch/IFSC/Swift Code"
//             type="text"
//             name="branchCode"
//             onChange={handleBankDetailsChange}
//           />
//         </div>

//         {/* Declaration */}
//         <div className="mt-6">
//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               name="declarationAgreed"
//               required
//               onChange={(e) =>
//                 setData({ ...data, declarationAgreed: e.target.checked })
//               }
//             />
//             <span className="ml-2 text-sm">
//               I certify that the information provided is true and correct to
//               the best of my knowledge. I understand that any false information
//               may result in the rejection of my application or legal action.
//             </span>
//           </label>
//         </div>

//         {/* Submit */}
//         <div className="grid place-items-center mt-6">
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`mt-4 px-4 py-2 rounded ${
//               isLoading
//                 ? "bg-gray-400 text-gray-700 cursor-not-allowed"
//                 : "bg-blue-500 text-white hover:bg-blue-600"
//             }`}
//           >
//             {isLoading ? "Submitting..." : "Submit Application"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RequestSupport;








































































































// // old chatgpt ipfs method no backend working 
// import axios from "axios";

// // Function to upload file to IPFS and return the hash
// const uploadToIPFS = async (file) => {
//   try {
//     const fileData = new FormData();
//     fileData.append("file", file);

//     const response = await axios({
//       method: "post",
//       url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//       data: fileData,
//       headers: {
//         pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
//         pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
//   } catch (error) {
//     console.error("Error uploading file to IPFS:", error);
//     return null;
//   }
// };

// // Handle Breakdown File Upload
// const handleBreakdownFileChange = async (index, event) => {
//   const file = event.target.files[0];
//   if (!file) return;

//   const ipfsHash = await uploadToIPFS(file);
//   if (!ipfsHash) {
//     toast.error("Failed to upload file to IPFS");
//     return;
//   }

//   const updatedBreakdown = [...breakdown];
//   updatedBreakdown[index] = {
//     ...updatedBreakdown[index],
//     documentHash: ipfsHash, // Store only the IPFS hash
//   };

//   setBreakdown(updatedBreakdown);
// };




// const handleSubmit = async (event) => {
//   event.preventDefault();

//   const finalData = { ...data, breakdowns: breakdown };

//   console.log("Final application data:", finalData);

//   try {
//     setIsLoading(true);
//     addMutate(JSON.stringify(finalData), {
//       onSuccess: (response) => {
//         toast.success(response?.data?.message);
//         setIsLoading(false);
//         router.push("/dashboard/beneficiary");
//       },
//       onError: (error) => {
//         toast.error(error.response?.data?.message || "Something went wrong");
//         setIsLoading(false);
//       },
//     });
//   } catch (error) {
//     toast.error("Unexpected error: " + error.message);
//     setIsLoading(false);
//   }
// };

























// // new ipfs , but not givibg ipfs hash return 
// const uploadFileToIPFS = async (file) => {
//   try {
//     const fileData = new FormData();
//     fileData.append("file", file);

//     const response = await axios({
//       method: "post",
//       url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//       data: fileData,
//       headers: {
//         pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
//         pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
//   } catch (error) {
//     console.error("Error uploading file to IPFS:", error);
//     return null;
//   }
// };

// const handleBreakdownFileChange = async (index, event) => {
//   const files = Array.from(event.target.files);
//   const updatedBreakdown = [...breakdown];

//   // Upload each file and store its hash
//   const uploadedFiles = await Promise.all(
//     files.map(async (file) => {
//       const ipfsUrl = await uploadFileToIPFS(file);
//       return ipfsUrl;
//     })
//   );

//   updatedBreakdown[index] = {
//     ...updatedBreakdown[index],
//     documents: uploadedFiles, // Store IPFS URLs
//   };

//   setBreakdown(updatedBreakdown);
// };
// const handleSubmit = async (event) => {
//   event.preventDefault();
//   setIsLoading(true);

//   // Ensure all breakdown documents are uploaded
//   const updatedBreakdown = await Promise.all(
//     breakdown.map(async (item) => {
//       if (item.documents && item.documents.length > 0) {
//         const uploadedFiles = await Promise.all(
//           item.documents.map(async (file) => await uploadFileToIPFS(file))
//         );
//         return { ...item, documents: uploadedFiles };
//       }
//       return item;
//     })
//   );

//   const applicationData = { ...data, breakdowns: updatedBreakdown };

//   addMutate(applicationData, {
//     onSuccess: (response) => {
//       toast.success(response?.data?.message);
//       setIsLoading(false);
//       router.push("/dashboard/beneficiary");
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || "Something went wrong");
//       setIsLoading(false);
//     },
//   });
// };
