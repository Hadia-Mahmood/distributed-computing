"use client";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Pagination from "../Pagination";
import usePagination from "@/utils/usePagination";
import { useRef, useState } from "react";
import RecyclingOutputEntryModal from "./RecyclingOutputEntryModal";
import { useGetAllOutputEntries } from "@/hooks/recyclePointEntries";
import DataLoader from "@/components/Shared/DataLoader";
import UploadReportButton from "@/components/Shared/UploadReportButton";

const RecyclingOutputEntries = () => {
  const tableRef = useRef();
  const paginate = usePagination();
  const { data, isLoading, isError } = useGetAllOutputEntries();
  const [openRecyclingOutputEntryModal, setOpenRecyclingOutputEntryModal] =
    useState(false);

  const { currentPage, totalPages, visibleItems, goToPage } = paginate(
    data && data?.outputEntries
  );

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
        Error loading recycling output entries
      </div>
    );
  }

  return (
    <div>
      {/* Table */}
      <div
        ref={tableRef}
        className="rounded-sm border border-stroke bg-white shadow-default  font-poppins "
      >
        <div className="py-4 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            All Recycling Input Entries
          </h4>
          <UploadReportButton
            tableRef={tableRef}
            reportType="recyclingOutputEntries"
          />
        </div>
        <div className="grid grid-cols-7 border-t border-stroke py-4 px-4  sm:grid-cols-6 md:px-6 2xl:px-7">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Image</p>
          </div>
          <div className=" hidden items-center sm:flex">
            <p className="font-medium">Recyclable %</p>
          </div>
          <div className=" flex items-center">
            <p className="font-medium">Plastic %</p>
          </div>
          <div className=" flex items-center">
            <p className="font-medium">Glass %</p>
          </div>
          <div className=" flex items-center">
            <p className="font-medium">Metalloids %</p>
          </div>
          <div className=" flex items-center col-span-1">
            <p className="font-medium">Market Value</p>
          </div>
          {/* <div className=" flex items-center">
            <p className="font-medium">Actions</p>
          </div> */}
        </div>

        {/* Table Body */}
        <div className="h-[55vh] overflow-auto">
          {visibleItems.map((product, key) => (
            <div
              className=" grid grid-cols-7 border-t border-stroke py-2 px-4  sm:grid-cols-6 md:px-6 2xl:px-7"
              key={key}
            >
              <div className="col-span-1 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className=" w-20 h-12 rounded-md">
                    <img
                      src={product.image.url}
                      alt="logo"
                      className="w-full h-full rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {product.recyclablePercentage}
                </p>
              </div>
              {/* <div className=" flex items-center col-span-2">
                <p className="text-sm text-black dark:text-white ">
                  {product.sourceSubdivision}
                </p>
              </div> */}
              <div className=" flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.plasticPercentage}
                </p>
              </div>
              <div className=" flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.glassPercentage}
                </p>
              </div>
              <div className=" flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.Metalloids}
                </p>
              </div>
              <div className=" flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.marketValue}
                </p>
              </div>
              {/* <div className=" flex gap-3 justify-start items-center text-[20px]">
                <MdEdit
                  className="cursor-pointer"
                  onClick={() => setOpenRecyclingInputEntryModal(true)}
                />
                <MdDelete className="cursor-pointer" />
              </div> */}
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      {visibleItems?.length > 5 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={goToPage}
        />
      )}

      {/* Edit Modal */}

      {/* {openRecyclingOutputEntryModal && (
        <RecyclingOutputEntryModal
          setOpenRecyclingOutputEntryModal={setOpenRecyclingOutputEntryModal}
        />
      )} */}
    </div>
  );
};

export default RecyclingOutputEntries;
