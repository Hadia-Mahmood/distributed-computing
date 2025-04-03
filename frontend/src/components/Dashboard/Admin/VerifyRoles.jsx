"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Pagination from "../Pagination";
import { useGetAllLandfills, useDeleteLandfill } from "@/hooks/landfillEntries";
import usePagination from "@/utils/usePagination";
import DataLoader from "@/components/Shared/DataLoader";
import { toast } from "react-toastify";

const VerifyRoles = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [openLandfillEntryModal, setOpenLandfillEntryModal] = useState(false);

  const paginate = usePagination();
  const { data, isLoading, isError } = useGetAllLandfills();

  const handleDeleteLandfill = async (id) => {
    try {
      await deleteLandfillMutation.mutateAsync(id);
      toast.success("Task deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error deleting task");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <DataLoader />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading tasks</div>;
  }

  const { currentPage, totalPages, visibleItems, goToPage } = paginate(
    data && data.breakdownTasks // Adjust based on your data structure
  );

  return (
    <div>
      {/* Table */}
      <div className="rounded-sm border border-stroke bg-white shadow-default font-poppins">
        <div className="py-4 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Breakdown Task Report
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4 px-4 sm:grid-cols-6 md:px-6 2xl:px-7">

          <div className="col-span-1 flex items-center">
            <p className="font-medium">Task ID</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium"> Name</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Total Amount</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Amount Raised</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Task Status</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium"> Proof</p>
          </div>
        </div>

        {/* Table Body */}
        <div className="h-[55vh] overflow-auto">
          {/* {visibleItems.map((task, index) => ( */}
            <div
              className="grid grid-cols-6 border-t border-stroke py-2 px-4 sm:grid-cols-6 md:px-6 2xl:px-7"
              // key={index}
            >
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {/* {task.priority} */}
                  1
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {/* {task.taskName} */}
                  Pay Bills
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {/* ${task.totalAmount} */}
                  $100
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {/* ${task.collectedAmount} */}
                  $50
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {/* {task.status} */}
                  In Progress
                </p>
              </div>


              <div className="col-span-1 flex items-center">
                
                  <p className="text-sm text-black dark:text-white">
                    Approved
                  </p>
                
              </div>

              
              {/* <div className="col-span-1 flex items-center">
                {task.proofStatus === "Approved" ? (
                  <a
                    href={`/proof/${task.id}`}
                    className="text-blue-500 underline text-sm"
                  > */}
                    {/* {task.proofStatus} */}
                    {/* Approved
                  </a>
                ) : (
                  <p className="text-sm text-black dark:text-white">
                    {task.proofStatus}
                  </p>
                )}
              </div> */}
            </div>
          {/* )) */}
          {/* } */}
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

export default VerifyRoles;
