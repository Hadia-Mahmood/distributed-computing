"use client";

import React from "react";

const CampaignDetails = () => {
  return (
    <div className="p-6 bg-white text-black min-h-screen">
      {/* Image and Timer Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="flex-1 ">
        <img
          src="/home/hero__slider1.jpg"  // Replace with your actual image path
          alt="Campaign"
          className="w-full h-[250px]"
          style={{ paddingLeft: '20px' }}
        />

        </div>
        <div className="w-full sm:w-1/3 flex flex-col items-center sm:items-end"   style={{ paddingRight: '20px' }}>
          <div className="text-center sm:text-right">
            <p className="text-xl font-bold">6</p>
            <p className="text-gray-600">Days Left</p>
          </div>
          <div className="mt-4 text-center sm:text-right">
            <p className="text-xl font-bold">0.01</p>
            <p className="text-gray-600">Raised of 0.1</p>
          </div>
          <div className="mt-4 text-center sm:text-right">
            <p className="text-xl font-bold">1</p>
            <p className="text-gray-600">Total Donors</p>
          </div>
        </div>
      </div>

      {/* Campaign Creator and Story Section */}
      <div className="mt-10 bg-gray-100 p-6 rounded-md">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Creator</h2>
          <p className="text-sm text-gray-600 mt-2">
            0x24Cd51cE62DA856f5692616930E073C32A222cC
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold">Story</h2>
          <p className="text-sm text-gray-600 mt-2">
          A donation is a gift for charity, humanitarian aid, or to benefit a cause. A donation may take various forms, including money, alms, services, or goods such as clothing, toys, food, or vehicles. A donation may satisfy medical needs such as blood or organs for transplant.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold">Donators</h2>
          <p className="text-sm text-gray-600 mt-2">
            1. 0x24Cd51cE62DA856f5692616930E073C32A222cC (0.01 ETH)
          </p>
        </div>
      </div>

      
    </div>
  );
};


export default CampaignDetails;
