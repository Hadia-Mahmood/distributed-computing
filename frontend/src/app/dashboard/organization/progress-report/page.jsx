"use client";
 
import { useSearchParams } from "next/navigation";
import CampaignDetails from "@/components/Dashboard/Organization/CampaignDetails";
import BreakdownReport from "@/components/Dashboard/Organization/BreakdownReport";
import React from "react";

const page = () => {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("applicationId"); // Get the ID from URL

  return (
    <div>
      <CampaignDetails applicationId={applicationId}  />
      <BreakdownReport applicationId={applicationId} />

    </div>
  );
};

export default page;

