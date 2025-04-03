"use client";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import styles from "./Contributions.module.css";

const AllContributions = () => {
  const router = useRouter();
  const mockData = {
    campaignPoints: [
      
      {
        _id: "3",
        name: "Health Camps for Rural Areas",
        image: { url: "/findBeneficiary/campaign-image3.jpg" },
        admin: "admin3",
        title: "Free Health Checkups",
        description: "Organizing health camps to offer free medical checkups and medications to people from underprivileged backgrounds..",
        target: "$25,000",
        deadline: "June 2024",
        amountCollected: "$6,500",
        owner: "admin3",
      },
      
      {
        _id: "5",
        name: "Support For Disaster Relief Efforts",
        image: { url: "/findBeneficiary/campaign-image5.jpg" },
        admin: "admin5",
        title: "Emergency Aid for Disaster Victims",
        description: "Delivering emergency aid and relief supplies to disaster-stricken areas to people from underprivileged backgrounds..",
        target: "$75,000",
        deadline: "November 2024",
        amountCollected: "$23,000",
        owner: "admin5",
      },
      {
        _id: "6",
        name: "Educational Support for Underserved",
        image: { url: "/findBeneficiary/campaign-image6.jpg" },
        admin: "admin6",
        title: "Scholarships for Underprivileged Students",
        description: "Providing scholarships and educational support to students from underprivileged backgrounds.",
        target: "$60,000",
        deadline: "May 2025",
        amountCollected: "$18,000",
        owner: "admin6",
      },
    ],
  };
  

  return (
    <div className="w-full bg-[#f7f9f8] min-h-screen pt-10 md:pt-8 pb-5 md:pb-10 px-3 md:px-10">
      
      <h1 className="font-paralucent text-[27px] md:text-3xl lg:text-4xl mt-5 mb-16 lg:w-2/4 mx-auto text-left lg:text-center text-[#182822] leading-normal">
       My Contributions
      </h1>
      <div className={styles.campaignContainer}>
        {mockData.campaignPoints.map((campaign) => (
          <div key={campaign._id} className={styles.campaignCard}>
            <img
              src={campaign.image.url || "/default-image.jpg"}
              alt={campaign.name}
              className={styles.campaignImage}
            />
            <div className={styles.content}>
              <h1>{campaign.name}</h1>
              <p>{campaign.district}</p>
              <div className={styles.campaignDetails}>

                <p><strong>Description:</strong> {campaign.description}</p>
                <p><strong>Target:</strong> {campaign.target}</p>
                <p><strong>Deadline:</strong> {campaign.deadline}</p>
                <p><strong>Amount Collected:</strong> {campaign.amountCollected}</p>
              </div>
              <button
  onClick={() => {
    const query = new URLSearchParams({ ...campaign }).toString();
    router.push(`/reports/${campaign._id}?${query}`);
  }}
  className={styles.viewButton}
>
  View
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
export default AllContributions;

