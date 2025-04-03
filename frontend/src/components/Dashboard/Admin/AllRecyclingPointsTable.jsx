"use client";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Pagination from "../Pagination";
import usePagination from "@/utils/usePagination";
import { useState } from "react";
import RecyclingPointModal from "./RecyclingPointModal";
import {
  useGetAllRecyclingPoints,
  useDeleteRecyclingPoint,
} from "../../../hooks/recyclePointEntries";
import DataLoader from "@/components/Shared/DataLoader";
import { toast } from "react-toastify";

const AllRecyclingPointsTable = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [admin, setAdmin] = useState(null);
  const deleteRecyclingMutation = useDeleteRecyclingPoint();
  const [openRecyclingPointModal, setOpenRecyclingPointModal] = useState(false);
  const paginate = usePagination();
  const { data, isLoading, isError } = useGetAllRecyclingPoints();

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      // Find the last space before maxLength
      let lastSpaceIndex = description.lastIndexOf(" ", maxLength);
      // Truncate the description and add ellipsis
      return description.substring(0, lastSpaceIndex) + "...";
    }
  };

  const handleDeleteRecyclingPoint = async (id) => {
    try {
      await deleteRecyclingMutation.mutateAsync(id);
      toast.success("Recycling point deleted successfully");
      window.location.reload();
      // Handle success, e.g., show a success message or update state
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleEditRecyclingPoint = (id, admin) => {
    console.log("Itemmmmmmmmmmmmmm");
    // console.log(visibleItems);

    setOpenRecyclingPointModal(true);
    setAdmin(admin);
    setSelectedId(id);
    // You can use the complaintId here or pass it to the modal component
  };

  // console.log(data);
  // Check loading and error states
  if (isLoading) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <DataLoader />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading Recycling Points</div>;
  }

  const { currentPage, totalPages, visibleItems, goToPage } = paginate(
    data && data?.recyclingPoints
  );

  return (
    <div>
      {/* Table */}
      <div className="rounded-sm border border-stroke bg-white shadow-default  font-poppins ">
        <div className="py-4 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            All Recycling Points
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4 px-4  sm:grid-cols-6 md:px-6 2xl:px-7">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Image</p>
          </div>
          <div className=" hidden items-center sm:flex">
            <p className="font-medium">Name</p>
          </div>
          <div className=" flex items-center ">
            <p className="font-medium">District</p>
          </div>
          <div className=" flex items-center col-span-2">
            <p className="font-medium">ID</p>
          </div>
          <div className=" flex items-center">
            <p className="font-medium">Actions</p>
          </div>
        </div>

        {/* Table Body */}
        <div className="h-[55vh] overflow-auto">
          {visibleItems.map((product, key) => (
            <div
              className=" grid grid-cols-6 border-t border-stroke py-2 px-4  sm:grid-cols-6 md:px-6 2xl:px-7"
              key={key}
            >
              <div className="col-span-1 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="">
                    <img
                      src={product?.image?.url}
                      alt="logo"
                      className="w-20  rounded-xl"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-black dark:text-white">
                    {product.name}
                  </p>
                </div>
              </div>
              <div className="hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {product.district}
                </p>
              </div>
              <div className=" flex items-center col-span-2">
                <p className="text-sm text-black dark:text-white ">
                  {truncateDescription(product._id, 25)}
                </p>
              </div>
              <div className=" flex gap-3 justify-start items-center text-[20px]">
                <MdDelete
                  className="cursor-pointer"
                  onClick={() => handleDeleteRecyclingPoint(product._id)}
                />
              </div>
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
    </div>
  );
};

export default AllRecyclingPointsTable;
