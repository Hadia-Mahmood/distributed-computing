"use client";

import Input from "@/components/CC/Input";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useStateContext } from "@/app/StateContext";
import { FaUpload, FaSpinner } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

import { useNewLandfill } from "../../../hooks/landfillEntries";

const NewLandFill = () => {
  const router = useRouter();
  const { user } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    contact: "",
    occupation: "",
    reason: "",
    supportingDocs: "",
    image: "",
    amountRequested: "",
    monthlyIncome: "",
    sourceOfIncome: "",
    otherAidSources: "",
    bankDetails: {
      accountHolder: "",
      accountNumber: "",
      bankName: "",
      branchDetails: "",
    },
    declarationAgreed: false,
  });
  const { mutate: addMutate } = useNewLandfill(JSON.stringify(data));


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

  // Handle File Uploads
  const handleFileChange = (event) => {
    const { name } = event.target;
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setData({ ...data, [name]: reader.result });
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  const removeAvatar = () => {
    setImage(null);
    setData({ ...data, image: "" });
  };
  

  const [breakdown, setBreakdown] = useState([
    { purpose: "", amount: "", documents: [] },
  ]);
  
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
  
  // Handle file upload for breakdown
  const handleBreakdownFileChange = (index, event) => {
    const files = Array.from(event.target.files);
    const updatedBreakdown = [...breakdown];
    updatedBreakdown[index] = {
      ...updatedBreakdown[index],
      documents: files,
    };
    setBreakdown(updatedBreakdown);
  };
  
  // Add a new breakdown field
  const addBreakdownField = () => {
    setBreakdown([
      ...breakdown,
      { purpose: "", amount: "", documents: [] },
    ]);
  };
  
  // Remove a breakdown field
  const removeBreakdownField = (index) => {
    const updatedBreakdown = breakdown.filter((_, i) => i !== index);
    setBreakdown(updatedBreakdown);
  };
  
  const handleSubmit = async (event) => {
    console.log(data);
    event.preventDefault();
    setIsLoading(true);
    try {
      console.log("trying");

      addMutate(
        {},
        {
          onSuccess: (response) => {
            console.log("OnSuccess");

            toast.success(response?.data?.message);
            setIsLoading(false);
            router.push("/dashboard/admin/all-landfills");
          },
          onError: (response) => {
            toast.error(response.response.data.message);
            console.log("OnError");

            setIsLoading(false);
          },
        }
      );
    } catch (error) {
      toast.error(error.message);
      console.log("onerrrrror22");
      setIsLoading(false);
    }
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
          {image ? (
            <div className="">
              <div className="w-24 h-24 mx-auto relative">
                <img
                  src={image}
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
                <p>Upload Your Picture</p>
                <p className="text-xs mt-2">Click to browse the image</p>
              </div>
            </label>
          )}
          <input
            id="avatar-upload"
            name="image"
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
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
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
            <label className="font-semibold text-sm text-[#202725] mb-1">
              Reason for Assistance
            </label>
            <textarea
              name="reason"
              required
              placeholder="Explain why you need assistance"
              value={data.reason}
              onChange={handleInputChange}
              className="outline-none text-sm p-4 w-full rounded-md border-2 border-[#d9e4df] h-24"
            ></textarea>
          </div>
          <div className="col-span-2">
            <label htmlFor="docs-upload" className="font-semibold text-sm">
              Upload Supporting Documents
            </label>
            <input
              id="docs-upload"
              name="supportingDocs"
              required
              type="file"
              accept="application/pdf,image/*"
              onChange={handleFileChange}
              className="block mt-2"
            />
          </div>
        <div className="mt-6">
          <Input
            label="Total Amount Requested"
            type="number"
            name="amountRequested"
            required
            onChange={handleInputChange}
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
        label="Amount"
        type="number"
        name="amount"
        value={field.amount}
        onChange={(e) => handleBreakdownChange(index, e)}
        
      />
      
     

      {/* File upload for breakdown */}
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
            name="branchDetails"
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

export default NewLandFill;







  
  
