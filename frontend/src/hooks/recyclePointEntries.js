import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import RecyclingEntry from "../services/recyclePointEntries";
import AuthService from "../services/auth-service";

const useDeleteRecyclingPoint = () => {
  console.log("HOOK")
  return useMutation((id) => RecyclingEntry.deleteRecyclingPointById(id));
};

const useAddResponseToRecyclingPoint = () => {
  const mutation = useMutation(({ id, data }) =>
    RecyclingEntry.addResponseToRecyclingPoint(id, data)
  );

  const addResponse = async (id, data) => {
    try {
      const response = await mutation.mutateAsync({ id, data });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    addResponse,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};

const useNewUpdateRUrl = (data) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return RecyclingEntry.UpdateUrl(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("signup");
      },
    }
  );
};

const useNewUpdateRUrlO = (data) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return RecyclingEntry.UpdateUrlO(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("signup");
      },
    }
  );
};

const useInputEntry = (data) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return RecyclingEntry.inputEntry(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("signup");
      },
    }
  );
};

const useNewRecyclingPoint = (data) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return RecyclingEntry.newRecyclingPoint(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("signup");
      },
    }
  );
};

const useOutputEntry = (data) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return RecyclingEntry.outputEntry(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("signup");
      },
    }
  );
};

const useGetAllRecyclingPoints = () => {
  console.log("DAAAAAAAATA222")
  return useQuery(["allRecyclingPoints"],
  RecyclingEntry.getAllRecyclingPoints);
};

const useGetAllInputEntries = () => {
  console.log("Entriesss")
  return useQuery(["allInputEntries"],
  RecyclingEntry.getAllInputEntries);
};

const useGetAllOutputEntries = () => {
  console.log("Entriesss")
  return useQuery(["allOutputEntries"],
  RecyclingEntry.getAllOutputEntries);
};
const useGetASpecificRecyclingIEntry = (landfillId) => {

  return useQuery(["allRecyclingEntries", landfillId], () => RecyclingEntry.getSpecificRecyclingIEntries(landfillId));
};

const useGetASpecificRecyclingOEntry = (landfillId) => {
  console.log("hookkkkk")
  return useQuery(["allRecyclingEntries2", landfillId], () => RecyclingEntry.getSpecificRecyclingOEntries(landfillId));
};

export {
  useInputEntry,
  useOutputEntry,
  useNewRecyclingPoint,
  useGetAllRecyclingPoints,
  useAddResponseToRecyclingPoint,
  useDeleteRecyclingPoint,
  useGetAllInputEntries,
  useGetAllOutputEntries,
  useGetASpecificRecyclingIEntry,
  useGetASpecificRecyclingOEntry,
  useNewUpdateRUrl,
  useNewUpdateRUrlO
};
