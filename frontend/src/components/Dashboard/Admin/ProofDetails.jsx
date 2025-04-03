"use client";

import React from "react";

const FileDisplaySection = ({ label, files }) => {
  return (
    <div className="my-3">
      {files.length > 0 ? (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
              <span className="text-gray-700">{file.name}</span>
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

const Proof_Details = () => {
  const data = {
    summary: "The aid was used to purchase medical supplies for beneficiaries.",
    completionDate: "2023-12-15",
    thirdPartyName: "John Doe",
    thirdPartyContactNumber: "1234567890",
    thirdPartyEmailAddress: "johndoe@example.com",
    signedLetter: { name: "SignedLetter.pdf" },
    files: [
      { name: "Invoice1.pdf" },
      { name: "Receipt2.png" },
    ],
    visualProofs: [
      { name: "BeforeImage.jpg" },
      { name: "AfterImage.jpg" },
    ],
  };

  return (
    <div className="p-4 sm:p-5 md:p-10 bg-[#fff] rounded-md font-poppins">
      <h1 className="font-bold text-3xl">Aid Support Usage Details</h1>
      <p className="text-sm mt-3 leading-6 text-[#62706b]">
        Below are the details regarding the aid support provided.
      </p>

      {/* Document Display Section */}
      <FileDisplaySection
        label="Uploaded Documents (Invoice, Receipt, Bank Statement, etc.)"
        files={data.files}
      />

      {/* Summary of Aid Usage */}
      <div className="my-5">
        <label className="font-semibold mb-2 block">Summary of Usage</label>
        <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.summary}</p>
      </div>

      {/* Visual Proof Display Section */}
      <FileDisplaySection
        label="Uploaded Visual Proof (Before & After Images)"
        files={data.visualProofs}
      />

      {/* Completion Date */}
      <div className="my-5">
        <label className="font-semibold mb-2 block">Completion Date</label>
        <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.completionDate}</p>
      </div>

      {/* Third-Party Verification */}
      <div className="my-5">
        <h2 className="font-semibold text-lg mb-3">Third-Party Verification</h2>
        <div className="mb-3">
          <label className="font-semibold block">Third-Party Name</label>
          <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.thirdPartyName}</p>
        </div>
        <div className="mb-3">
          <label className="font-semibold block">Third-Party Contact Number</label>
          <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.thirdPartyContactNumber}</p>
        </div>
        <div className="mb-3">
          <label className="font-semibold block">Third-Party Email Address</label>
          <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.thirdPartyEmailAddress}</p>
        </div>
        <div className="my-5">
          <label className="font-semibold mb-2 block">Signed Letter or Certificate</label>
          <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{data.signedLetter.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Proof_Details;
