import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import WasteMovement from "../services/community-waste-mov-service";
import AuthService from "../services/auth-service";

const usePostWaste = (data) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return WasteMovement.postWaste(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("signup");
      },
    }
  );
};


const useGetWaste = (subdivision) => {
  return useQuery(["entry/get-entry-subdivision", subdivision], () =>
    WasteMovement.getWaste(subdivision)
  );
};

const useGetWasteDistrict = () => {
  return useQuery(["entry/get-entry-subdivision"], () =>
    WasteMovement.getWasteCollectionByDistrict()
  );
};

export { usePostWaste,useGetWaste , useGetWasteDistrict};
