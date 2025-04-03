"use client";

import React, { useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Pagination from "../Pagination";
import usePagination from "@/utils/usePagination";
import EditComplainModal from "./EditComplainModal";
import {
  useGetComplaintsInDistrict,
  useDeleteComplaint,
} from "../../../hooks/complain-hook";
import DataLoader from "@/components/Shared/DataLoader";
import UploadReportButton from "@/components/Shared/UploadReportButton";
import { toast } from "react-toastify";
import { useStateContext } from "@/app/StateContext";
import {  useQueryClient } from "@tanstack/react-query";

const ComplainsTable = () => {
  const { user } = useStateContext();
  const queryClient = useQueryClient();

  const paginate = usePagination();
  const tableRef = useRef();
  const deleteComplaintMutation = useDeleteComplaint();
  const district = user?.district
  const [openEditComplainModal, setOpenEditComplainModal] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [selectedLatitude, setSelectedLatitude] = useState(null);
  const [selectedLongitude, setSelectedLongitude] = useState(null);
  const [selectedimage, setSelectedimage] = useState(null);
  const { data, isLoading, isError } = useGetComplaintsInDistrict(
    user?.district
  );

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.substring(0, maxLength) + "...";
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDeleteComplaint = async (complaintId) => {
    try {
      await deleteComplaintMutation.mutateAsync(complaintId);
      await queryClient.invalidateQueries(['complaint/get-complaints-district', district]);
      toast.success("Complaint deleted successfully");
    } catch (error) {
      toast.error("Failed to delete complaint");
    }
  };

  const handleEditComplaint = (complaintId, latitude, longitude , image) => {
    setOpenEditComplainModal(true);
    setSelectedComplaintId(complaintId);
    setSelectedLatitude(latitude);
    setSelectedLongitude(longitude);
    setSelectedimage(image)
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

  const { currentPage, totalPages, visibleItems, goToPage } = paginate(
    data && data?.complaints
  );

  return (
    <div>
      {/* Table */}
      <div
        ref={tableRef}
        className="rounded-sm border border-stroke bg-white shadow-default  font-poppins "
      >
        <div className="py-4 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            All complaints for the {user?.district} district
          </h4>
          <UploadReportButton
            tableRef={tableRef}
            reportType="districtAdminComplaints"
          />
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
            <p className="font-medium">Description</p>
          </div>
          <div className=" flex items-center">
            <p className="font-medium">Response</p>
          </div>
          <div className=" flex items-center">
            <p className="font-medium">Date</p>
          </div>
          <div className=" flex items-center">
            <p className="font-medium">Actions</p>
          </div>
        </div>

        {/* Table Body */}
        <div className="h-[55vh] overflow-auto">
          {visibleItems &&
            visibleItems.map((item, key) => (
              <div
                className=" grid grid-cols-7 border-t border-stroke py-2 px-4  sm:grid-cols-8 md:px-6 2xl:px-7"
                key={key}
              >
                <div className="col-span-1 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className=" w-20 h-12 rounded-md">
                      <img
                        src={item?.image?.url}
                        alt="item"
                        className="w-full h-full rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="hidden col-span- items-center sm:flex">
                  <p className="text-sm text-black dark:text-white">
                    {item?.district}
                  </p>
                </div>
                <div className="hidden items-center sm:flex">
                  <p className="text-sm text-black dark:text-white">
                    {truncateDescription(item?.area, 10)}
                  </p>
                </div>
                <div className=" flex items-center col-span-2">
                  <p className="text-sm text-black dark:text-white ">
                    {truncateDescription(item?.description, 25)}
                  </p>
                </div>
                <div className=" flex items-center">
                  <p className="text-sm text-black dark:text-white">
                  {truncateDescription(item?.status, 25)}
                  </p>
                </div>
                <div className=" flex items-center">
                  <p className="text-sm text-meta-3">{formatDate(item.date)}</p>
                </div>
                <div className=" flex gap-3 justify-start items-center text-[20px]">
                  <MdEdit
                    className="cursor-pointer"
                    onClick={() =>
                      handleEditComplaint(
                        item._id,
                        item.latitude,
                        item.longitude,
                        item.image.url
                      )
                    }
                    // onClick={() => setOpenEditComplainModal(true)}
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

      {/* Edit Modal */}

      {openEditComplainModal && (
        <EditComplainModal
          setOpenEditComplainModal={setOpenEditComplainModal}
          complaintId={selectedComplaintId}
          latitude={selectedLatitude}
          longitude={selectedLongitude}
          imagee = {selectedimage}
        />
      )}
    </div>
  );
};
/*
                  <MdDelete
                    className="cursor-pointer"
                    onClick={() => handleDeleteComplaint(item._id)}
                  />
*/
export default ComplainsTable;
