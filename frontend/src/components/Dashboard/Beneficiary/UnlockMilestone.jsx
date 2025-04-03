// "use client";
// import Input from "@/components/CC/Input";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { useStateContext } from "@/app/StateContext";
// import { FaUpload } from "react-icons/fa6";
// import { RxCross1 } from "react-icons/rx";
// import { FaSpinner } from "react-icons/fa";
// import { useUnlockMilestone } from "../../../hooks/beneficiary-hook";
// import axios from "axios";
 
// const FileUploadSection = ({ label, acceptedTypes, files, setFiles }) => {
//   const handleFileChange = (event) => {
//     const uploadedFiles = Array.from(event.target.files);
//     setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
//   };

//   const removeFile = (index) => {
//     setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="my-3">
//       {files.length > 0 ? (
//         <div className="space-y-2">
//           {files.map((file, index) => (
//             <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
//               <span className="text-gray-700">{file.name}</span>
//               <button
//                 type="button"
//                 onClick={() => removeFile(index)}
//                 className="text-red-500"
//               >
//                 <RxCross1 className="text-xl" />
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : ( 
//         <label htmlFor="file-upload" className="cursor-pointer">
//           <div className="w-full h-32 bg-gray-200 rounded-md flex flex-col items-center justify-center text-gray-700">
//             <FaUpload className="text-2xl" />
//             <p>{label}</p>
//             <p className="text-xs mt-2">Click to browse document</p>
//           </div>
//         </label>
//       )}
//       <input
//         id="file-upload"
//         type="file"
//         accept={acceptedTypes}
//         onChange={handleFileChange}
//         multiple
//         className="hidden"
//       />
//     </div>
//   );
// };


// const UnlockMilestone = () => {
//   const router = useRouter();
//   const { user } = useStateContext();
//   const [isLoading, setIsLoading] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [visualProofs, setVisualProofs] = useState([]);
//   const [data, setData] = useState({
//     userId:user?.userId,
//     usageSummary: "",
//     completionDate: "",
//     thirdPartyVerification:{
//       thirdPartyName: "",
//       thirdPartyContactNumber: "",
//       thirdPartyEmailAddress: "",
//     },
//   });

//   const { mutate: addMutate } = useUnlockMilestone(
//     JSON.stringify({...data  })
//   ); 

//   const handleThirdPartyVerification = (event) => {
//     const { name, value } = event.target;
//     setData({
//       ...data,
//       thirdPartyVerification: {
//         ...data.thirdPartyVerification,
//         [name]: value,
//       },
//     });
//   };


  


//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setData({
//       ...data,
//       [name]: value,
//     });
//   };


//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setIsLoading(true);
//     console.log(data);
//     addMutate(
//           {},
//           {
//             onSuccess: (response) => {
//               console.log("OnSuccess");
//               toast.success(response?.data?.message);
//               setIsLoading(false);
//               router.push("/dashboard/beneficiary");
//             },
//             onError: (error) => {
//               console.log("OnError", error);
//               toast.error(error.response?.data?.message || "Something went wrong");
//               setIsLoading(false);
//             },
//           });
//         } 
//       ;
      
//   return (
//     <div className="p-4 sm:p-5 md:p-10 bg-[#fff] rounded-md font-poppins">
//       <h1 className="font-bold text-3xl">Provide Aid Support Usage Details</h1>
//       <p className="text-sm mt-3 leading-6 text-[#62706b]">
//         Please complete the form below to unlock the next milestone.
//       </p>
//       <form className="w-full mt-10" onSubmit={handleSubmit}>
//         {/* Document Upload Section */}
//         <FileUploadSection
//           label="Upload Documents (Invoice, Receipt, Bank Statement.)"
//           acceptedTypes="application/pdf,image/*"
//           files={files}
//           setFiles={setFiles}
//         />
        
//          {/* Summary of Aid Usage */}
//          <div className="my-5">
//           <Input
//             label="Summary of Usage"
//             type="text"
//             placeholder="Explain how the aid was used"
//             name="usageSummary"
//             onChange={handleInputChange}
            
//             required={true}
//           />
//         </div>
       


        

//         {/* Completion Date */}
//         <div className="my-5">
//           <label className="font-semibold mb-2 block">Completion Date</label>
//           <input
//             type="date"
//             name="completionDate"
//             onChange={handleInputChange}
//             value={data.completionDate}
//             className="block w-full text-sm border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         {/* Third-Party Verification */}
//         <div className="my-5">
//           <h2 className="font-semibold text-lg mb-3">Third-Party Verification</h2>
//           <Input
//             label="Third-PartyName"
//             type="text"
//             placeholder="Enter Name"
//             name="name"
//             onChange={handleThirdPartyVerification}
            
//             required={true}
//           />
//           <Input
//             label="Third-PartyContactNumber"
//             type="number"
//             placeholder="Enter Contact Number"
//             name="contactNumber"
//             onChange={handleThirdPartyVerification}
            
//             required={true}
//           />
//           <Input
//             label="Third-PartyEmailAddress"
//             type="email"
//             placeholder="Enter Email Address"
//             name="email"
//             onChange={handleThirdPartyVerification}
            
//             required={true}
//           />
         
//         </div>

//         {/* Submit Button */}
//         <div className="grid place-items-center mt-6">
//           {isLoading ? (
//             <button
//               type="submit"
//               className="mt-6 w-full flex justify-center items-center font-semibold text-sm gap-3 bg-[#20332c] text-white px-7 py-5 rounded-sm"
//               disabled
//             >
//               <FaSpinner className="animate-spin mr-2" />
//               Submitting...
//             </button>
//           ) : (
//             <button
//               type="submit"
//               className="mt-6 w-full flex justify-center items-center font-semibold text-sm gap-3 bg-[#20332c] text-white px-7 py-5 rounded-sm hover:bg-[#257830]"
//             >
//               Submit Proof
//               <IoIosArrowRoundForward className="text-[27px] ml-2" />
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UnlockMilestone;












































//chatgpt ipfs working
"use client";
import Input from "@/components/CC/Input";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useStateContext } from "@/app/StateContext";
import { FaUpload } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { FaSpinner } from "react-icons/fa";
import { useUnlockMilestone } from "../../../hooks/beneficiary-hook";
import axios from "axios";

const UnlockMilestone = () => {
  const router = useRouter();
  const { user } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileHash, setFileHash] = useState(null); // Store IPFS hash
  const [data, setData] = useState({
    userId: user?.userId,
    usageSummary: "",
    completionDate: "",
    breakdownFileHash: "", // Field for IPFS hash
    thirdPartyVerification: {
      thirdPartyName: "",
      thirdPartyContactNumber: "",
      thirdPartyEmailAddress: "",
    },
  });

  const { mutate: addMutate } = useUnlockMilestone(

    JSON.stringify({ ...data })
  );

  const handleThirdPartyVerification = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      thirdPartyVerification: {
        ...data.thirdPartyVerification,
        [name]: value,
      },
    });
  };

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };



  const uploadFileToIPFS = async (file) => {
    try {
      const fileData = new FormData();
      fileData.append("file", file);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        fileData,
        {
          headers: {
            pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
            pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log("hash is ",IpfsHash);
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
      return null;
    }
  };



  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const ipfsHash = await uploadFileToIPFS(file);
    if (!ipfsHash) {
      toast.error("Failed to upload file to IPFS");
      return;
    }

    setFiles([file]);
    setFileHash(ipfsHash); // Store the IPFS hash
    setData({ ...data, breakdownFileHash: ipfsHash });
  };

  const handleSubmit = async (event) => {
    console.log("daataaa", data);
    event.preventDefault();
    setIsLoading(true);

    addMutate(
      {},
      {

        
        onSuccess: (response) => {
          toast.success(response?.data?.message);
          setIsLoading(false);
          console.log("daataaa", data);
          router.push("/dashboard/beneficiary");
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Something went wrong");
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div className="p-4 sm:p-5 md:p-10 bg-[#fff] rounded-md font-poppins">
      <h1 className="font-bold text-3xl">Provide Aid Support Usage Details</h1>
      <p className="text-sm mt-3 leading-6 text-[#62706b]">
        Please complete the form below to unlock the next milestone.
      </p>
      <form className="w-full mt-10" onSubmit={handleSubmit}>
        {/* Document Upload Section */}
        <div className="my-3">
          {files.length > 0 ? (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                >
                  <span className="text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFiles([]);
                      setFileHash(null);
                      setData({ ...data, breakdownFileHash: "" });
                    }}
                    className="text-red-500"
                  >
                    <RxCross1 className="text-xl" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="w-full h-32 bg-gray-200 rounded-md flex flex-col items-center justify-center text-gray-700">
                <FaUpload className="text-2xl" />
                <p>Upload Breakdown Document</p>
                <p className="text-xs mt-2">Click to browse document</p>
              </div>
            </label>
          )}
          <input
            id="file-upload"
            type="file"
            accept="application/pdf,image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Summary of Aid Usage */}
        <div className="my-5">
          <Input
            label="Summary of Usage"
            type="text"
            placeholder="Explain how the aid was used"
            name="usageSummary"
            // onChange={(e) =>
            //   setData({ ...data, usageSummary: e.target.value })
            // }
            onChange={handleInputChange}
            
            required={true}
          />
        </div>

        {/* Completion Date */}
        <div className="my-5">
          <label className="font-semibold mb-2 block">Completion Date</label>
          <input
            type="date"
            name="completionDate"
            // onChange={(e) =>
            //   setData({ ...data, completionDate: e.target.value })
            // }
            onChange={handleInputChange}
            value={data.completionDate}
            className="block w-full text-sm border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Third-Party Verification */}
        <div className="my-5">
          <h2 className="font-semibold text-lg mb-3">Third-Party Verification</h2>
          <Input
            label="Third-PartyName"
            type="text"
            placeholder="Enter Name"
            name="name"
            // onChange={(e) =>
            //   setData({
            //     ...data,
            //     thirdPartyVerification: {
            //       ...data.thirdPartyVerification,
            //       thirdPartyName: e.target.value,
            //     },
            //   })
            // }
            onChange={handleThirdPartyVerification}
            
            required={true}
          />
          <Input
            label="Third-PartyContactNumber"
            type="number"
            placeholder="Enter Contact Number"
            name="contactNumber"
            // onChange={(e) =>
            //   setData({
            //     ...data,
            //     thirdPartyVerification: {
            //       ...data.thirdPartyVerification,
            //       thirdPartyContactNumber: e.target.value,
            //     },
            //   })
            // }
            onChange={handleThirdPartyVerification}
            
            required={true}
          />
          <Input
            label="Third-PartyEmailAddress"
            type="email"
            placeholder="Enter Email Address"
            name="email"
            // onChange={(e) =>
            //   setData({
            //     ...data,
            //     thirdPartyVerification: {
            //       ...data.thirdPartyVerification,
            //       thirdPartyEmailAddress: e.target.value,
            //     },
            //   })
            // }
            onChange={handleThirdPartyVerification}
            
            required={true}
          />
        </div>

        {/* Submit Button */}
        <div className="grid place-items-center mt-6">
          {isLoading ? (
            <button type="submit" 
            className="mt-6 w-full flex justify-center items-center font-semibold text-sm gap-3 bg-[#20332c] text-white px-7 py-5 rounded-sm"
              disabled>
              <FaSpinner className="animate-spin mr-2" />
              Submitting...
            </button>
          ) : (
            <button type="submit" 
             className="mt-6 w-full flex justify-center items-center font-semibold text-sm gap-3 bg-[#20332c] text-white px-7 py-5 rounded-sm hover:bg-[#257830]"
            >
              Submit Proof
              <IoIosArrowRoundForward className="text-[27px] ml-2" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UnlockMilestone;















