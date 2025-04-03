"use client";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import styles from "./processApplication.module.css";

import { useGetApprovedApplications } from "@/hooks/organization-hook";
import Link from "next/link";
const ApprovedApplications = () => {
  const {
    data: applicationData,
    isLoading: applicationLoading,
    error: applicationError,
  } = useGetApprovedApplications();

  if (applicationLoading) return <div>Loading...</div>;
  if (applicationError) return <div>Error: {applicationError.message}</div>;

  // Ensure that applications exist before using them
  const applications = applicationData?.applications || [];

  const router = useRouter();
  // const mockData = {
  //   campaignPoints: [
      
  //     {
  //       _id: "6",
  //       name: "Educational Support for Underserved",
  //       image: { url: "/findBeneficiary/campaign-image6.jpg" },
  //       admin: "admin6",
  //       title: "Scholarships for Underprivileged Students",
  //       description: "Providing scholarships and educational support to students from underprivileged backgrounds.",
  //       target: "$60,000",
  //       deadline: "May 2025",
  //       amountCollected: "$18,000",
  //       owner: "admin6",
  //     },
  //     {
  //       _id: "1",
  //       name: "Clean Water for Villages",
  //       image: { url: "/findBeneficiary/campaign-image1.jpg" },
  //       admin: "admin1",
  //       title: "Water Access Initiative",
  //       description: "Providing clean and safe drinking water to rural villages.",
  //       target: "$50,000",
  //       deadline: "December 2024",
  //       amountCollected: "$12,000",
  //       owner: "admin1",
  //     },
      
      
  //     {
  //       _id: "2",
  //       name: " Provide Meals for the Homeless",
  //       image: { url: "/findBeneficiary/campaign-image2.jpg" },
  //       admin: "admin2",
  //       title: "Nourishing the Homeless",
  //       description: "Providing hot meals and basic nutrition to homeless individuals.",
  //       target: "$30,000",
  //       deadline: "March 2025",
  //       amountCollected: "$8,500",
  //       owner: "admin2",
  //     },
  //     {
  //       _id: "3",
  //       name: "Health Camps for Rural Areas",
  //       image: { url: "/findBeneficiary/campaign-image3.jpg" },
  //       admin: "admin3",
  //       title: "Free Health Checkups",
  //       description: "Organizing health camps to offer free medical checkups and medications.",
  //       target: "$25,000",
  //       deadline: "June 2024",
  //       amountCollected: "$6,500",
  //       owner: "admin3",
  //     },
  //     {
  //       _id: "4",
  //       name: "Support for Orphaned Children",
  //       image: { url: "/findBeneficiary/campaign-image4.jpg" },
  //       admin: "admin4",
  //       title: "Children's Education Fund",
  //       description: "Providing educational resources and support for orphaned children.",
  //       target: "$40,000",
  //       deadline: "September 2024",
  //       amountCollected: "$15,000",
  //       owner: "admin4",
  //     },
  //     {
  //       _id: "5",
  //       name: " Support Disaster Relief Efforts",
  //       image: { url: "/findBeneficiary/campaign-image5.jpg" },
  //       admin: "admin5",
  //       title: "Emergency Aid for Disaster Victims",
  //       description: "Delivering emergency aid and relief supplies to disaster-stricken areas.Help us in achieving this ",
  //       target: "$75,000",
  //       deadline: "November 2024",
  //       amountCollected: "$23,000",
  //       owner: "admin5",
  //     },
      
  //   ],
  // };

  return (
    <div className="w-full bg-[#f7f9f8] min-h-screen pt-10 md:pt-8 pb-5 md:pb-10 px-3 md:px-10">
      <h1 className="font-paralucent text-[27px] md:text-3xl lg:text-4xl mt-5 mb-16 lg:w-2/4 mx-auto text-left lg:text-center text-[#182822] leading-normal">
        TraceAid Approved  Applications
      </h1>
      <div className={styles.campaignContainer}>
        {applications.map((application) => (
          <div key={application._id} className={styles.campaignCard}>
            <img
              src={application.applicationPicture?.url || "/default-image.jpg"}
              alt={application.name}
              className={styles.campaignImage}
            />
            <div className={styles.content}>
              <h1>{application.applicationTitle}</h1>
             
              <p><strong>Description:</strong> {application.description}</p>
              <p><strong>Name:</strong> {application.userId?.name || "N/A"}</p>
              <p><strong>Target Amount:</strong> ${application.amountRequested}</p>
              <p><strong>Deadline:</strong> {new Date(application.deadline).toLocaleDateString()}</p>
              
              <button
                
                className={styles.viewButton}
              >
                <Link
                    href={`/dashboard/organization/progress-report?applicationId=${application._id}`}
                  >
                      Details
                 </Link>
                 
                <span className={styles.arrowIcon}>
                  <IoIosArrowRoundForward />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};
export default ApprovedApplications;

