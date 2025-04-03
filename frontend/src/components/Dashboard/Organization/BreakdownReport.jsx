 "use client";
import Pagination from "../Pagination";
import usePagination from "@/utils/usePagination";
import DataLoader from "@/components/Shared/DataLoader";
import { useGetProgressReport } from "../../../hooks/beneficiary-hook"; 
import Link from "next/link";
import styles from "./CampaignDetails.module.css";


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
  const amountRequired = 20;
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default font-poppins ">
        <div className="py-4 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Breakdown Task Report
          </h4>
        </div>

        <div className="min-h-[50px] grid grid-cols-7 border-t border-stroke py-4 px-4 sm:grid-cols-7 md:px-6 2xl:px-7">
          <div className="col-span-2 flex items-center"><p className="font-medium">Task ID</p></div>
          <div className="col-span-1 flex items-center"><p className="font-medium">Purpose</p></div>
          <div className="col-span-1 flex items-center"><p className="font-medium">Amount</p></div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Amount Raised</p>
           </div>
          <div className="col-span-1 flex items-center"><p className="font-medium">Status</p></div>
          <div className="col-span-1 flex items-center"><p className="font-medium">Proof</p></div>
        </div>
        <div className="h-[55vh]   overflow-auto" >
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
            
              <div className="col-span-1 flex items-center">
           
            {breakdown.breakdownStatus === "completed" ? (
  <Link
    href={`/dashboard/organization/proof-details?breakdownId=${breakdown.id}`}
    className="text-sm text-black hover:underline"
  >
    View
  </Link>
) : breakdown.breakdownStatus === "inactive" ? (
  <p className="text-sm text-gray-500">N/A</p>
) : breakdown.breakdownStatus === "active" && breakdown.amount === amountRequired ? (
  // <Link
  //   href={`/dashboard/beneficiary/unlock-milestone`}
  //   className="text-sm text-blue-600 hover:underline font-semibold"
  // >
  //   Upload Proof
  // </Link>
  <p className="text-sm text-gray-500">Proof not uploaded</p>
) : (
  <p className="text-sm text-gray-500">N/A</p>
)}
  
</div>

          </div>
          ))}
          
        </div>
        {/* Input Entries Section */}
<div className={styles.inputEntriesSection}>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
             Enhanced Transparency See Transaction Details
          </h1>

          <table className={styles.entriesTable}>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Donor Wallet Addresses</th>
                <th>Beneficiary Wallet Addresses</th>
                <th>Transaction Amount </th>
                <th>Task Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                (TxID)
                </td>
                <td>0x3e478h789j</td>
                <td>0x31k9idd33e</td>
                <td>$500</td>
                <td>Completed</td>
                <td>2024-07-11 15:00 </td>
              </tr>
            </tbody>
          </table>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button className={styles.blockchainButton}>
              View Blockchain Data
            </button>
          </div>
        </div>
    
{/* Input Entries Section */}
<div className={styles.inputEntriesSection}>
          <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
            Following are the Details Of Breakdown Aid And  Usage
          </h1>

          <table className={styles.entriesTable}>
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Name</th>
                <th>Total Amount</th>
                <th>Amount Raised </th>
                <th>Task Status</th>
                <th>Proof</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  1
                </td>
                <td>Pay Bills</td>
                <td>$100</td>
                <td>$50</td>
                <td>In Progress</td>
                <td>N/A</td>
              </tr>
            </tbody>
          </table>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button className={styles.blockchainButton}>
              View Blockchain Data
            </button>
          </div>
</div>
      </div>

      {breakdowns.length > 5 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={goToPage} />
      )}
    

    </div>
  );
};

export default BreakdownReport;
























