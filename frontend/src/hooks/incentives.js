import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Incentives from "../services/incentives";
import AuthService from "../services/auth-service";
import incentives from "../services/incentives";

const useGetSubdivisionsAndUserCounts = (district) => {
  console.log("Incentives");
  return useQuery(["get-subDivision/district", district], () =>
    Incentives.getSubdivisionsAndUserCounts(district)
  );
};

// const useUpdateIncentive = () => {
//   console.log("UPDATE HOOK")
//   const mutation = useMutation(({ incentiveData, id }) =>
//     Incentives.updateIncentive(incentiveData, id)
//   );

//   const response = async (incentiveData, id) => {
//     try {
//       console.log("responce sending hook")
//       const response = await mutation.mutateAsync({ incentiveData, id });
//       return response;
//     } catch (error) {
//       console.log("responce not sended hook")
//       throw new Error(error.message);
//     }
//   };

//   return {
//     response,
//     isLoading: mutation.isLoading,
//     isError: mutation.isError,
//     error: mutation.error,
//   };
// };

const useUpdateIncentive = (incentiveData, id) => {
  console.log("UPDATE HOOK");
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      console.log("insideeeeeee Hook")
      return Incentives.updateIncentive(incentiveData, id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("signup");
      },
    }
  );
};

const useCreateIncentive = (incentiveData) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return Incentives.createIncentive(incentiveData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("signup");
      },
    }
  );
};

const useGetSubdivisionComplaints = (district) => {
  console.log("Incentives");
  return useQuery(["/get-subDivision-complaints/district", district], () =>
    Incentives.getSubdivisionComplaints(district)
  );
};

const useGetIncentive = (id) => {
  console.log("Incentives");
  return useQuery(["/get-incentive/id", id], () =>
    Incentives.getTokenIncentive(id)
  );
};

// const useGetPredictData = (requestData) => {
//   console.log("Incentives")
//     return useQuery(["/predict", requestData], () =>
//     Incentives.getPredictData(requestData)
// );
// };

const useGetPredictData = (requestData) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return Incentives.getPredictData(requestData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("signup");
      },
    }
  );
};

export {
  useGetSubdivisionsAndUserCounts,
  useGetSubdivisionComplaints,
  useGetPredictData,
  useCreateIncentive,
  useGetIncentive,
  useUpdateIncentive,
};
