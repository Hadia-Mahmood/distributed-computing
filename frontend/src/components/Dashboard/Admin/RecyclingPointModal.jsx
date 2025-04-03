import {React,useState} from "react";
import Modal from "../Modal";
import { IoIosArrowRoundForward } from "react-icons/io";
import Input from "@/components/CC/Input";
import TextArea from "@/components/CC/TextArea";
import { useAddResponseToRecyclingPoint } from "../../../hooks/recyclePointEntries";
import { FaUpload } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { FaSpinner } from "react-icons/fa";
const RecyclingPointModal = ({ setOpenRecyclingPointModal, id, admin }) => {
  // const router = useRouter();
  const [image, setImage] = useState(null);
  const [isLooading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({
    admin: admin,
    name: "",
    district: "",
    sourceSubdivision: "",
    image: "",
  });
  const { addResponse, isLoading, isError, error } =
    useAddResponseToRecyclingPoint();

  const handleAvatarChange = (event) => {
    console.log("handleAvatar");
    const { name, value } = event.target;
    if (name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        console.log("handleAvatar22");
        if (reader.readyState === 2) {
          setInfo({ ...info, [name]: reader.result });
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      setInfo({ ...info, [name]: value });
    }
  };

  const removeAvatar = () => {
    setImage(null);
    // Update userData state if necessary
  };

  const handleAddResponse = async (event) => {
    event.preventDefault();
    console.log("lANDFILL__ID");
    setIsLoading(true);
    console.log(id);
    try {
      await addResponse(id, info);
      setIsLoading(false);
      setOpenRecyclingPointModal(false);
      // Optionally, you can add a redirect or any other logic here after successful response
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding response:", error);
    }
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setInfo({ ...info, [name]: value });
  // };
  const handleInputChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;
      setInfo({ ...info, [name]: value });
    }
  };
  return (
    <Modal onClose={setOpenRecyclingPointModal}>
      <div
        style={{
          boxShadow:
            "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 2px 3px 21.2px 0px rgba(0, 0, 0, 0.25)",
        }}
        className=" h-[90vh] overflow-y-auto p-4 sm:p-5 md:p-10 bg-[#fff] rounded-md  border-2 border-[#000] font-urbanist w-[97%] sm:w-[65%] md:w-[55%] lg:w-[80%] mx-auto"
      >
        <h1 className="font-bold text-3xl">Review Incentive</h1>
        <p className="text-sm mt-3 leading-6 text-[#62706b]">
          Please complete the form below, to request a quote, and we’ll be in
          touch. Or you can call us and our specialists will provide help!
        </p>
        <form className="w-full mt-10 " onSubmit={handleAddResponse}>
          <div className="my-3">
            {image ? (
              <div className="">
                <div className="w-24 h-24 mx-auto relative">
                  <img
                    src={image}
                    alt="Avatar"
                    className="rounded-full w-full h-full  "
                  />
                  <button
                    onClick={removeAvatar}
                    className="absolute  top-0 right-0 p-[5px] bg-gray-200 rounded-full"
                  >
                    <RxCross1 className="text-[#000] text-[14px] " />
                  </button>
                </div>
              </div>
            ) : (
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="w-full h-32 bg-gray-200 rounded-md flex flex-col items-center  justify-center text-gray-700">
                  <FaUpload className="text-2xl" />
                  <p>Upload your image</p>
                  <p className="text-xs mt-2">
                    Click to browse your image here
                  </p>
                </div>
              </label>
            )}
            <input
              id="avatar-upload"
              required
              name="image"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <Input
              label="District"
              name="district"
              value={info.district}
              onChange={handleInputChange}
              type="text"
              placeholder="Please write you details"
            />
            <Input
              name="name"
              label="Name"
              type="text"
              value={info.name}
              onChange={handleInputChange}
              placeholder="Please write you details"
            />
            <Input
              name="sourceSubdivision"
              label="sourceSubdivision"
              type="text"
              value={info.sourceSubdivision}
              onChange={handleInputChange}
              placeholder="Please write you details"
            />
          </div>

          <div className="grid place-items-center mt-6">
          {isLooading ? (
            <FaSpinner className="animate-spin" /> // Show spinner if isLoading is true
          ) : (
            <button
              type="submit"
              className="mt-6 w-full flex justify-center items-center font-semibold text-sm gap-3 bg-[#20332c] transition duration-500 ease-in-out hover:bg-[#257830] text-[#fff] hover:text-[#fff] outline-none border-0 px-7 py-5 rounded-sm"
            >
              Edit
              <span className="p-0 rounded-full bg-[#fff]  transition duration-500 text-[#20332c] ">
                <IoIosArrowRoundForward className="text-[27px] font-bold" />
              </span>{" "}
              <style jsx>{`
                button:hover span {
                  background-color: #fff;
                  color: #257830;
                }
              `}</style>
            </button>
          )}
        </div>
        </form>
      </div>
    </Modal>
  );
};

export default RecyclingPointModal;
