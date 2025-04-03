"use client";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useGetAllLandfillPoints } from "../../hooks/user-hook"; // Adjust the path as needed
import DataLoader from "../Shared/DataLoader";
import { useRouter } from "next/navigation";

const Landfills = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGetAllLandfillPoints();
  console.log(data);

  if (isLoading)
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <DataLoader />
      </div>
    );
  if (error)
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        Error: {error.message}
      </div>
    );

  return (
    <div className="w-full bg-[#f7f9f8] min-h-screen pt-16 md:pt-32 pb-10 md:pb-20 px-3 md:px-10">
      <h6 className="text-center font-bold text-[#f29620]">
        Safe And Trusted Waste Collection{" "}
      </h6>
      <h1 className="font-paralucent text-[27px] md:text-3xl lg:text-4xl mt-5 mb-16 lg:w-2/4 mx-auto text-left lg:text-center text-[#182822] leading-normal">
        Devoted & Trustworthy Waste Collection
      </h1>
      <div className="overflow-x-auto lg:overflow-hidden w-full flex lg:flex-wrap justify-start lg:justify-center items-start lg:gap-x-6 lg:gap-y-20">
        {data?.landfillPoints.map((point) => (
          <div
            key={point._id}
            className="flex-shrink-0 lg:shrink-unset lg:w-[28%] w-[85%] mr-6 lg:mr-unset"
          >
            <img
              src={point.image.url || "/default-image.jpg"}
              alt={point.name}
              className="w-full sm:h-[200px] h-[250px] rounded-lg object-cover"
            />
            <div className="p-4 md:p-7 relative rounded-lg w-[90%] -mt-28 bg-[#fff] font-poppins transition duration-500 ease-in-out shadow-sm hover:shadow-lg shadow-[#ddd9d9]">
              <h1 className="font-paralucent text-xl text-[#182822] hover:text-[#f29620] transition duration-500 ease-in-out cursor-pointer">
                {point.name}
              </h1>
              <p className="text-[#62706b] text-[13px] sm:text-sm my-3 sm:my-5">
                {point.district}
              </p>
              <button
                onClick={() => router.push(`/landfills/${point?.admin}`)}
                className="flex justify-center items-center gap-3 transition duration-500 ease-in-out hover:bg-[#257830] text-[#20332c] hover:text-[#fff] outline-none border-2 hover:border-[#257830] border-[#20332c] px-5 py-3 rounded-sm"
              >
                View
                <span className="p-0 rounded-full bg-[#20332c] hover:bg-[#fff] transition duration-500 text-[#fff] hover:text-[#257830] ">
                  <IoIosArrowRoundForward className="text-[27px] font-bold" />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landfills;
