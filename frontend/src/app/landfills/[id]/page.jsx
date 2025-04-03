import SpecificLandfill from "@/components/Landfills/SpecificLandfill";
import React from "react";

const page = ({ params }) => {
  return (
    <div>
      <SpecificLandfill landfillID={params?.id} />
    </div>
  );
};

export default page;
