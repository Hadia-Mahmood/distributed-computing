import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import ImageService from "../services/image-service";
import AuthService from "../services/auth-service";



  



const useUploadImage = (data) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return  ImageService.uploadImage(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("signup");
      },
    }
  );
};
// const useUploadImage = () => {
//   const queryClient = useQueryClient();

//   return useMutation(
//     (formData) => ImageService.uploadImage(formData), // Use the updated function
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("uploadedImages");
//       },
//     }
//   );
// };



export {useUploadImage,
};













