"use client";
import { useGetASpecificRecyclingIEntry , useGetASpecificRecyclingOEntry } from "@/hooks/recyclePointEntries";
import usePagination from "@/utils/usePagination";
import React from "react";
import DataLoader from "../Shared/DataLoader";
import Pagination from "../Dashboard/Pagination";
import Link from "next/link";

const SpecificRecyclingPoint = ({ recyclingPointID }) => {

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const paginate = usePagination();

  const { data, isLoading, isError } =
    useGetASpecificRecyclingIEntry(recyclingPointID);

    const { data : data2, isLoading : isLoading2, isError : isError2 } =
    useGetASpecificRecyclingOEntry(recyclingPointID);

  const { currentPage, totalPages, visibleItems, goToPage } = paginate(
    data && data?.entries
  );
  console.log("visible")
  console.log(visibleItems)
  //console.log(data2)

  const { currentPage : currentPage2, totalPages :totalPages2 , visibleItems : visibleItems2, goToPage  :  goToPage2} = paginate(
    data2 && data2?.entries
  );
  console.log(visibleItems2)
  const url = "https://ipfs.io/ipfs/" + data?.url
  console.log(url)


  const url1 = "https://ipfs.io/ipfs/" + data2?.url
  console.log(url1)

  const handleButtonClick = () => {
    window.open(url, "_blank"); 
  };

  const handleButtonClick1 = () => {
    window.open(url1, "_blank"); 
  };
  if (isLoading) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <DataLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        Error loading complaints
      </div>
    );
  }

  if (visibleItems?.length === 0) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        No recycling points available for {recyclingPointID} district.
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-10 pb-20 bg-[#f7f9f8]">
      <h6 className="text-center font-bold text-[#f29620]">
        Safe And Trusted Waste Collection Service
      </h6>
      <h1 className="font-paralucent text-[27px] md:text-3xl lg:text-4xl mt-3 mb-5 lg:w-2/4 mx-auto text-center text-[#182822] leading-normal">
        Following  are the Input entries of this Recycling Point 
      </h1>

      <div className="w-[90%] md:w-[80%] mx-auto overflow-x-auto lg:overflow-hidden">
        <div className="rounded-sm border border-stroke bg-white shadow-default   font-poppins ">
          <div className="py-4 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              INput Entries
            </h4>
            <Link
              href="#"
              className="bg-[#f29620] text-[#fff] py-2 px-3 rounded-md text-sm"
            >

                           <button onClick={handleButtonClick} >
              View Blockchain Data
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-7 border-t border-stroke py-4 px-4  sm:grid-cols-8 md:px-6 2xl:px-7">
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Image</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">District</p>
            </div>
            <div className=" hidden items-center sm:flex">
              <p className="font-medium">Area</p>
            </div>
            <div className=" flex items-center col-span-2">
              <p className="font-medium">Subdivison</p>
            </div>
            <div className=" flex items-center">
              <p className="font-medium">Quantity</p>
            </div>
            <div className=" flex items-center">
              <p className="font-medium">Date</p>
            </div>

          </div>

          {/* Table Body */}
          <div className="h-auto overflow-auto">
            {visibleItems &&
              visibleItems.map((item, key) => (
                <div
                  key={key}
                  className=" grid grid-cols-7 border-t border-stroke py-2 px-4  sm:grid-cols-8 md:px-6 2xl:px-7"
                >
                  <div className="col-span-1 flex items-center">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className=" w-20 h-12 rounded-md">
                        { <img
                        src={item?.image?.url}
                        alt="item"
                        className="w-full h-full rounded-md"
                      /> }

                      </div>
                    </div>
                  </div>
                  <div className="hidden col-span- items-center sm:flex">
                    <p className="text-sm text-black dark:text-white">
                     {item?.district}
                    </p>
                  </div>
                  <div className="hidden items-center sm:flex">
                    <p className="text-sm text-black dark:text-white">{item?.area}</p>
                  </div>
                  <div className=" flex items-center col-span-2">
                    <p className="text-sm text-black dark:text-white ">
                    {item?.sourceSubdivision}
                    </p>
                  </div>
                  <div className=" flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {item?.quantityReceived}
                    </p>
                  </div>
                  <div className=" flex items-center">
                    <p className="text-sm text-meta-3">{formatDate(item?.dateAndTime)}</p>
                  </div>

                </div>
              ))}
          </div>
        </div>

        {visibleItems?.length > 5 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={goToPage}
          />
        )}
      </div>

      <h1 className="mt-6 font-paralucent text-[27px] md:text-3xl lg:text-4xl mt-3 mb-5 lg:w-2/4 mx-auto text-center text-[#182822] leading-normal">
      Following  are the Output entries of this Recycling Point 
      </h1>
      <div className="w-[90%] md:w-[80%] mx-auto overflow-x-auto lg:overflow-hidden">
        <div className="rounded-sm border border-stroke bg-white shadow-default   font-poppins ">
          <div className="py-4 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Output Entries
            </h4>
            <Link
              href="#"
              className="bg-[#f29620] text-[#fff] py-2 px-3 rounded-md text-sm"
            >
                           <button onClick={handleButtonClick1} >
              View Blockchain Data
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-7 border-t border-stroke py-4 px-4  sm:grid-cols-8 md:px-6 2xl:px-7">
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Image</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Plastic %</p>
            </div>
            <div className=" hidden items-center sm:flex">
              <p className="font-medium">Glass % </p>
            </div>
            <div className=" flex items-center col-span-2">
              <p className="font-medium">Metalloids %</p>
            </div>
            <div className=" flex items-center">
              <p className="font-medium">Recylable %</p>
            </div>
            <div className=" flex items-center">
              <p className="font-medium">Date</p>
            </div>

          </div>

          {/* Table Body */}
          <div className="h-auto overflow-auto">
            {visibleItems2 &&
              visibleItems2.map((item, key) => (
                <div
                  key={key}
                  className=" grid grid-cols-7 border-t border-stroke py-2 px-4  sm:grid-cols-8 md:px-6 2xl:px-7"
                >
                  <div className="col-span-1 flex items-center">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className=" w-20 h-12 rounded-md">
                        { <img
                        src={item?.image?.url}
                        alt="item"
                        className="w-full h-full rounded-md"
                      /> }
                      </div>
                    </div>
                  </div>
                  <div className="hidden col-span- items-center sm:flex">
                    <p className="text-sm text-black dark:text-white">
                    {item?.
plasticPercentage}
                    </p>
                  </div>
                  <div className="hidden items-center sm:flex">
                    <p className="text-sm text-black dark:text-white">
                    {item?.
glassPercentage} </p>
                  </div>
                  <div className=" flex items-center col-span-2">
                    <p className="text-sm text-black dark:text-white ">
                    {item?.
Metalloids}
                    </p>
                  </div>
                  <div className=" flex items-center">
                    <p className="text-sm text-black dark:text-white">
                    {item?.recyclablePercentage}
                    </p>
                  </div>
                  <div className=" flex items-center">
                    <p className="text-sm text-meta-3">{formatDate(item?.createdAt)}</p>
                  </div>

                </div>
              ))}
          </div>
        </div>

        {visibleItems?.length > 5 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={goToPage}
          />
        )}
      </div>
    </div>
  );
};

export default SpecificRecyclingPoint;
