"use client";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Pagination from "../Pagination";
import usePagination from "@/utils/usePagination";
import { useRef, useState } from "react";
import RecyclingInputEntryModal from "./RecyclingInputEntryModal";
import { useGetAllInputEntries } from "@/hooks/recyclePointEntries";
import DataLoader from "@/components/Shared/DataLoader";
import UploadReportButton from "@/components/Shared/UploadReportButton";

const RecyclingInputEntries = () => {
  const tableRef = useRef();
  const paginate = usePagination();
  const [openRecyclingInputEntryModal, setOpenRecyclingInputEntryModal] =
    useState(false);
  const { data, isLoading, isError } = useGetAllInputEntries();

  const { currentPage, totalPages, visibleItems, goToPage } = paginate(
    data && data?.inputEntries
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
        Error loading recycling input entries
      </div>
    );
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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
            reportType="recyclingInputEntries"
          />
        </div>

        <div className="grid grid-cols-7 border-t border-stroke py-4 px-4  sm:grid-cols-5 md:px-6 2xl:px-7">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Image</p>
          </div>
          <div className=" hidden items-center sm:flex">
            <p className="font-medium">Quantity (Trucks)</p>
          </div>
          <div className=" flex items-center">
            <p className="font-medium">Area</p>
          </div>
          <div className=" flex items-center">
            <p className="font-medium">District</p>
          </div>
          <div className=" flex items-center col-span-1">
            <p className="font-medium">ID</p>
          </div>
          {/* <div className=" flex items-center">
            <p className="font-medium">Actions</p>
          </div> */}
        </div>

        {/* Table Body */}
        <div className="h-[55vh] overflow-auto">
          {visibleItems.map((product, key) => (
            <div
              className=" grid grid-cols-7 border-t border-stroke py-2 px-4  sm:grid-cols-5 md:px-6 2xl:px-7"
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
                  {product.quantityReceived}
                </p>
              </div>
              {/* <div className=" flex items-center col-span-2">
                <p className="text-sm text-black dark:text-white ">
                  {product.sourceSubdivision}
                </p>
              </div> */}
              <div className=" flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.area}
                </p>
              </div>
              <div className=" flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.district}
                </p>
              </div>
              <div className=" flex items-center">
                <p className="text-sm text-meta-3">{product?._id}</p>
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

      {/* {openRecyclingInputEntryModal && (
        <RecyclingInputEntryModal
          setOpenRecyclingInputEntryModal={setOpenRecyclingInputEntryModal}
        />
      )} */}
    </div>
  );
};

export default RecyclingInputEntries;
