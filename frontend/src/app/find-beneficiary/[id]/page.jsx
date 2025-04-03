import SpecificRecyclingPoint from "@/components/RecyclingPoints/SpecificRecyclingPoint";
import React from "react";

const page = ({ params }) => {
  return (
    <div>
      <SpecificRecyclingPoint recyclingPointID={params?.id} />
    </div>
  ); 
};

export default page; 
