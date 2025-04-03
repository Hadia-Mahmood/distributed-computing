import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import LandfillEntry from "../services/landfillEntries";
import AuthService from "../services/auth-service";


const useDeleteLandfill = () => {
  console.log("HOOK")
  return useMutation((id) => LandfillEntry.deleteLandfillById(id));
};

const useDeleteLandfillEntry = () => {
  console.log("HOOK")
  return useMutation((id) => LandfillEntry.deleteLandfillEntryById(id));
};

const useInputEntry = (data) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return LandfillEntry.inputEntry(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("signup");
      },
    }
  );
};

const useNewLandfill = (data) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return LandfillEntry.NewLandfill(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("signup");
      },
    }
  );
};


const useNewUpdateUrl = (data) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return LandfillEntry.UpdateUrl(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("signup");
      },
    }
  );
};

const useAddResponseToLandfill = () => {
  const mutation = useMutation(({ id, data }) =>
    LandfillEntry.addResponseToLandfill(id, data)
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


const useGetAllLandfills = () => {
  console.log("DAAAAAAAATA222")
  return useQuery(["allLandfills"],
  LandfillEntry.getAllLandfills);
};

const useGetAllLandfillEntries = () => {
  console.log("Entriesss")
  return useQuery(["allLandfillEntries"],
  LandfillEntry.getAllLandfillEntries);
};

const useGetASpecificLandfillEntry = (landfillId) => {

  return useQuery(["allLandfillEntries", landfillId], () => LandfillEntry.getSpecificLandfillEntries(landfillId));
};


export { useNewLandfill,useGetASpecificLandfillEntry,  useGetAllLandfills , useInputEntry, useDeleteLandfill, useDeleteLandfillEntry, useAddResponseToLandfill, useGetAllLandfillEntries , useNewUpdateUrl};
