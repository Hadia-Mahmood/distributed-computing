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

// FileUploadSection Component for handling multiple file uploads and removals
const FileUploadSection = ({ label, acceptedTypes, files, setFiles }) => {
  const handleFileChange = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="my-3">
      {files.length > 0 ? (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
              <span className="text-gray-700">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
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
            <p>{label}</p>
            <p className="text-xs mt-2">Click to browse document</p>
          </div>
        </label>
      )}
      <input
        id="file-upload"
        type="file"
        accept={acceptedTypes}
        onChange={handleFileChange}
        multiple
        className="hidden"
      />
    </div>
  );
};

const NewRecyclingPoint = () => {
  const router = useRouter();
  const { user } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [visualProofs, setVisualProofs] = useState([]);
  const [data, setData] = useState({
    summary: "",
    completionDate: "",
    thirdPartyContact: "",
    signedLetter: null,
  });
  
  const handleFileUpload = (event, setter) => {
    const uploadedFiles = Array.from(event.target.files);
    setter((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const handleRemoveFile = (index, setter, filesArray) => {
    setter(filesArray.filter((_, i) => i !== index));
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        files,
        visualProofs,
      };
      // Replace with your mutation logic
      console.log("Submitting:", payload);
      toast.success("Proof submitted successfully!");
      setIsLoading(false);
      router.push("/dashboard/admin/assign-roles");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-5 md:p-10 bg-[#fff] rounded-md font-poppins">
      <h1 className="font-bold text-3xl">Provide Aid Support Usage Details</h1>
      <p className="text-sm mt-3 leading-6 text-[#62706b]">
        Please complete the form below to unlock the next milestone.
      </p>
      <form className="w-full mt-10" onSubmit={handleSubmit}>
        {/* Document Upload Section */}
        <FileUploadSection
          label="Upload Documents (Invoice, Receipt, Bank Statement.)"
          acceptedTypes="application/pdf,image/*"
          files={files}
          setFiles={setFiles}
        />

         {/* Summary of Aid Usage */}
         <div className="my-5">
          <Input
            label="Summary of Usage"
            type="text"
            placeholder="Explain how the aid was used"
            name="summary"
            onChange={handleInputChange}
            value={data.summary}
            required={true}
          />
        </div>
       
        {/* Visual Proof Upload Section */}
        <div className="my-5">
          <label className="font-semibold mb-2 block">
            Upload Visual Proof (Before & After Images)
          </label>
          <input
            type="file"
            multiple
            onChange={(e) => handleFileUpload(e, setVisualProofs)}
            className="block w-full text-sm text-gray-500"
          />
          <div className="mt-2">
            {visualProofs.map((file, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="text-gray-700">{file.name}</p>
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveFile(index, setVisualProofs, visualProofs)
                  }
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        

        {/* Completion Date */}
        <div className="my-5">
          <label className="font-semibold mb-2 block">Completion Date</label>
          <input
            type="date"
            name="completionDate"
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
            name="thirdPartyName"
            onChange={handleInputChange}
            value={data.thirdPartyName}
            required={true}
          />
          <Input
            label="Third-PartyContactNumber"
            type="number"
            placeholder="Enter Contact Number"
            name="thirdPartyContactNumber"
            onChange={handleInputChange}
            value={data.thirdPartyContactNumber}
            required={true}
          />
          <Input
            label="Third-PartyEmailAddress"
            type="email"
            placeholder="Enter Email Address"
            name="thirdPartyEmailAddress"
            onChange={handleInputChange}
            value={data.thirdPartyEmailAddress}
            required={true}
          />
          <div className="mt-5">
            <label className="font-semibold mb-2 block">
              Upload Signed Letter or Certificate
            </label>
            <input
              type="file"
              onChange={(e) =>
                setData({ ...data, signedLetter: e.target.files[0] })
              }
              className="block w-full text-sm text-gray-500"
              required
            />
            {data.signedLetter && (
              <div className="flex items-center justify-between mt-2">
                <p className="text-gray-700">{data.signedLetter.name}</p>
                <button
                  type="button"
                  onClick={() =>
                    setData({ ...data, signedLetter: null })
                  }
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="grid place-items-center mt-6">
          {isLoading ? (
            <button
              type="submit"
              className="mt-6 w-full flex justify-center items-center font-semibold text-sm gap-3 bg-[#20332c] text-white px-7 py-5 rounded-sm"
              disabled
            >
              <FaSpinner className="animate-spin mr-2" />
              Submitting...
            </button>
          ) : (
            <button
              type="submit"
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

export default NewRecyclingPoint;


















