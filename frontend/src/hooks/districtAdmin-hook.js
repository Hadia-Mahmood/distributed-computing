
import { useQuery } from "@tanstack/react-query";
import DistrictAdminService from "../services/districtAdmin-service"; // Adjust the path as needed

const useMonthlyWastePercentages = (district) => {
  return useQuery(["/getMonthlyWastePercentages", district], () =>
    DistrictAdminService.getMonthlyWastePercentages(district)
  );
};
  const useGetWasteCollectionBySubdivision = (districtAdmin) => {
    return useQuery(["/getWasteCollectionBySubdivision/:districtAdmin", districtAdmin], () =>
      DistrictAdminService.getWasteCollectionBySubdivision(districtAdmin)
    );
};

const useGetMonthlyComplaintsSummary = (district) => {
    return useQuery(["/getMonthlyComplaintsSummary/:district", district], () =>
      DistrictAdminService.getMonthlyComplaintsSummary(district)
    );
};

const useGetTotalWasteLast7Days = (district) => {
    return useQuery(["/getTotalWasteLast7Days/:district", district], () =>
      DistrictAdminService.getTotalWasteLast7Days(district)
    );
};

const useGetWasteRecycledByDistrict = (district) => {
    return useQuery(["/getWasteRecycledByDistrict/:district", district], () =>
      DistrictAdminService.getWasteRecycledByDistrict(district)
    );
};

const useGetTotalWasteReceived = (district) => {
    return useQuery(["/getTotalWasteReceived/:district", district], () =>
      DistrictAdminService.getTotalWasteReceived(district)
    );
};

const useGetComplaintsSummary = (district) => {
    return useQuery(["/complaint/getComplaintsSummary/:district", district], () =>
      DistrictAdminService.getComplaintsSummary(district)
    );
};

const useGetTopViewedThreads = () => {
    return useQuery(["/thread/get-top-threads"], () =>
      DistrictAdminService.getTopViewedThreads()
    );
};



export {useMonthlyWastePercentages, useGetTopViewedThreads,useGetComplaintsSummary ,useGetTotalWasteReceived,useGetWasteCollectionBySubdivision, useGetMonthlyComplaintsSummary ,useGetTotalWasteLast7Days, useGetWasteRecycledByDistrict};
