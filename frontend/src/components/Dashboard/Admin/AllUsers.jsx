"use client";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Pagination from "../Pagination";
import usePagination from "@/utils/usePagination";
import { useState } from "react";
import EditUserModal from "./EditUserModal";
import { useGetAllUsers } from "../../../hooks/auth-hook";
import DataLoader from "@/components/Shared/DataLoader";

const productData = [
  {
    image: "/home/waste.jpeg",
    district: "South",
    area: "Malir",
    description: "In Front of my house",
    resonse: "Processing",
    date: "12/20/2023",
  },
];

const AllUsers = () => {
  const [tableData, setTableData] = useState(productData);
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const paginate = usePagination();

  const { data, isLoading, isError } = useGetAllUsers();
  console.log(data);
  // Check loading and error states
  if (isLoading) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <DataLoader />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading complaints</div>;
  }

  const { currentPage, totalPages, visibleItems, goToPage } = paginate(
    data && data?.users
  );

  return (
    <div>
      {/* Table */}
      <div className="rounded-sm border border-stroke bg-white shadow-default  font-poppins ">
        <div className="py-4 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            All Users
          </h4>
        </div>

        <div className="grid grid-cols-7 border-t border-stroke py-4 px-4  sm:grid-cols-4 md:px-6 2xl:px-7">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Profile & District</p>
          </div>

          <div className="col-span-1 flex items-center">
            <p className="font-medium">User ID</p>
          </div>

          <div className=" flex items-center">
            <p className="font-medium">Email</p>
          </div>
          <div className=" flex items-center">
            <p className="font-medium">ETH Address</p>
          </div>
        </div>

        {/* Table Body */}
        <div className="h-[55vh] overflow-auto">
          {visibleItems.map((product, key) => (
            <div
              className=" grid grid-cols-7 border-t border-stroke py-2 px-4  sm:grid-cols-4 md:px-6 2xl:px-7"
              key={key}
            >
              <div className="col-span-1 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className=" ">
                    <img
                      src={product?.avatar?.url}
                      alt="Product"
                      className="w-20  rounded-xl"
                    />
                  </div>
                  <p className="text-sm text-black dark:text-white">
                    {product?.district}
                  </p>
                </div>
              </div>

              <div className=" flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product?._id}
                </p>
              </div>

              <div className=" flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product?.email}
                </p>
              </div>
              <div className=" flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product?.ethAddress}
                </p>
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

export default AllUsers;
