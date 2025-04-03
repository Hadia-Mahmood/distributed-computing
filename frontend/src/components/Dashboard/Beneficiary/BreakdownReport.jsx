"use client";
import Pagination from "../Pagination";
import usePagination from "@/utils/usePagination";
import DataLoader from "@/components/Shared/DataLoader";
import { useGetProgressReport } from "../../../hooks/beneficiary-hook"; 
import Link from "next/link";

// const BreakdownReport = ({ applicationId }) => {
//   console.log("applicationId",applicationId);
  
//   const paginate = usePagination();
//   const {
//     data: applicationData,
//     isLoading: applicationLoading,
//     error: applicationError,
//   } = useGetProgressReport(applicationId);

//   console.log("applicationData",applicationData);
  
  
//   if (applicationLoading) return <div>Loading...</div>;
//   if (applicationError) return <div className="text-red-500">No breakdown found.</div>;

  

//   if (isLoading) {
//     return (
//       <div className="w-full h-[70vh] flex justify-center items-center">
//         <DataLoader />
//       </div>
//     );
//   }

//   if (isError) {
//     return <div>Error loading tasks</div>;
//   }

//   const { currentPage, totalPages, visibleItems, goToPage } = paginate(
//     data && data.breakdownTasks // Adjust based on your data structure
//   );

//   return (
//     <div>
//       {/* Table */}
//       <div className="rounded-sm border border-stroke bg-white shadow-default font-poppins">
//         <div className="py-4 px-4 md:px-6 xl:px-7.5">
//           <h4 className="text-xl font-semibold text-black dark:text-white">
//             Breakdown Task Report
//           </h4>
//         </div>

//         <div className="grid grid-cols-6 border-t border-stroke py-4 px-4 sm:grid-cols-6 md:px-6 2xl:px-7">

//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Task ID</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium"> Name</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Total Amount</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Amount Raised</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Task Status</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium"> Proof</p>
//           </div>
//         </div>

//         {/* Table Body */}
//         <div className="h-[55vh] overflow-auto">
//           {/* {visibleItems.map((task, index) => ( */}
//             <div
//               className="grid grid-cols-6 border-t border-stroke py-2 px-4 sm:grid-cols-6 md:px-6 2xl:px-7"
//               // key={index}
//             >
//               <div className="col-span-1 flex items-center">
//                 <p className="text-sm text-black dark:text-white">
//                   {/* {task.priority} */}
//                   1
//                 </p>
//               </div>
//               <div className="col-span-1 flex items-center">
//                 <p className="text-sm text-black dark:text-white">
//                   {/* {task.taskName} */}
//                   Pay Bills
//                 </p>
//               </div>
//               <div className="col-span-1 flex items-center">
//                 <p className="text-sm text-black dark:text-white">
//                   {/* ${task.totalAmount} */}
//                   $100
//                 </p>
//               </div>
//               <div className="col-span-1 flex items-center">
//                 <p className="text-sm text-black dark:text-white">
//                   {/* ${task.collectedAmount} */}
//                   $50
//                 </p>
//               </div>
//               <div className="col-span-1 flex items-center">
//                 <p className="text-sm text-black dark:text-white">
//                   {/* {task.status} */}
//                   In Progress
//                 </p>
//               </div>


//               <div className="col-span-1 flex items-center">
                
//                   <p className="text-sm text-black dark:text-white">
//                     Approved
//                   </p>
                
//               </div>

              
              
//             </div>
          
//         </div>
//       </div>

//       {/* Pagination */}
//       {visibleItems?.length > 5 && (
//         <Pagination
//           totalPages={totalPages}
//           currentPage={currentPage}
//           onPageChange={goToPage}
//         />
//       )}
//     </div>
//   );
// };

// export default BreakdownReport;
const BreakdownReport = ({ applicationId }) => {
  const paginate = usePagination();
  const {
    data: applicationData,
    isLoading,
    error,
  } = useGetProgressReport(applicationId);

  if (isLoading) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <DataLoader />
      </div>
    );
  }

  if (error || !applicationData) {
    return <div className="text-red-500">No breakdown found.</div>;
  }

  const { breakdowns } = applicationData;
  const { currentPage, totalPages, visibleItems, goToPage } = paginate(breakdowns);
  const amountRequired = 2;
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default font-poppins">
        <div className="py-4 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Breakdown Task Report
          </h4>
        </div>

        <div className="grid grid-cols-7 border-t border-stroke py-4 px-4 sm:grid-cols-7 md:px-6 2xl:px-7">
          <div className="col-span-2 flex items-center"><p className="font-medium">Task ID</p></div>
          <div className="col-span-1 flex items-center"><p className="font-medium">Purpose</p></div>
          <div className="col-span-1 flex items-center"><p className="font-medium">Amount</p></div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Amount Raised</p>
           </div>
          <div className="col-span-1 flex items-center"><p className="font-medium">Status</p></div>
          <div className="col-span-1 flex items-center"><p className="font-medium">Proof</p></div>
        </div>
        <div className="h-[55vh] overflow-auto">
          {visibleItems.map((breakdown, index) => (
            <div
            className="grid grid-cols-7 border-t border-stroke py-2 px-4 sm:grid-cols-7 md:px-6 2xl:px-7"
            key={index}
          >
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black dark:text-white">{breakdown.id}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{breakdown.purpose}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">${breakdown.amount}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">${amountRequired}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{breakdown.breakdownStatus}</p>
            </div>
            {/* <div className="col-span-1 flex items-center">
              
                <Link
                    href={`/dashboard/beneficiary/proof-details?breakdownId=${breakdown.id}`}
                    className="text-sm text-black hover:underline"
                  >
                     View
                 </Link>
            </div> */}
            {/* <div className="col-span-1 flex items-center">
                {breakdown.breakdownStatus === "active" && breakdown.amount === amountRaised ? (
                  <Link
                  
                    href={`/dashboard/beneficiary/unlock-milestone`}
                    className="text-sm text-blue-600 hover:underline font-semibold"
                  >
                    Upload Proof
                  </Link>
                ) : (
                  <Link
                    href={`/dashboard/beneficiary/proof-details?breakdownId=${breakdown.id}`}
                    className="text-sm text-black hover:underline"
                  >
                    View
                  </Link>
                )}
              </div> */}
              <div className="col-span-1 flex items-center">
          
            {breakdown.breakdownStatus === "completed" ? (
  <Link
    href={`/dashboard/beneficiary/proof-details?breakdownId=${breakdown.id}`}
    className="text-sm text-black hover:underline"
  >
    View
  </Link>
) : breakdown.breakdownStatus === "inactive" ? (
  <p className="text-sm text-gray-500">N/A</p>
) : breakdown.breakdownStatus === "active" && breakdown.amount === amountRequired ? (
  <Link
    href={`/dashboard/beneficiary/unlock-milestone`}
    className="text-sm text-blue-600 hover:underline font-semibold"
  >
    Upload Proof
  </Link>
) : (
  <p className="text-sm text-gray-500">N/A</p>
)}

 
 
  {/* {breakdown.breakdownStatus === "active" && breakdown.amount === amountRaised ? (
    <Link
      href={`/dashboard/beneficiary/unlock-milestone`}
      className="text-sm text-blue-600 hover:underline font-semibold"
    >
      Upload Proof
    </Link>
   ) : breakdown.breakdownStatus === "active" || breakdown.amount !== amountRaised ? (
    <p className="text-sm text-gray-500">N/A</p>
  ) : breakdown.breakdownStatus === "inactive" || breakdown.amount !== amountRaised ? (
    <p className="text-sm text-gray-500">N/A</p>
  ) : (
    <Link
      href={`/dashboard/beneficiary/proof-details?breakdownId=${breakdown.id}`}
      className="text-sm text-black hover:underline"
    >
      View
    </Link>
  )} */}
</div>

          </div>
          ))}
        </div>
      </div>

      {breakdowns.length > 5 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={goToPage} />
      )}
    </div>
  );
};

export default BreakdownReport;
























