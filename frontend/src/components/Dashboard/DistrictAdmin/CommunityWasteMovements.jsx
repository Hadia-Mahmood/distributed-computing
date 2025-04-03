"use client";

import Input from "@/components/CC/Input";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useStateContext } from "@/app/StateContext";
import { usePostWaste } from "../../../hooks/community-waste-movements";
import { FaUpload } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import WasteManagementContractInteraction from "@/utils/wasteMangementContractInteraction";

import { FaSpinner } from "react-icons/fa";

const allowedSubDivision = {
  south: ["garden", "liyari", "saddar", "aram bagh", "civil line"],
  east: ["gulzar e hijri", "jamshed quarters", "ferozabad", "gulshan e iqbal"],
  west: ["orangi", "mangopir", "mominabad"],
  korangi: ["korangi", "landhi", "model colony", "shah faisal"],
  malir: ["airport", "gadap", "ibrahim hyderi", "murad memon", "shah mureed"],
  central: [
    "gulberg",
    "liaquatabad",
    "new karachi",
    "nazimabad",
    "north nazimabad",
  ],
  keamari: ["baldia", "site", "harbour", "mauripur"],
};

const CommunityWasteMovements = () => {
  const router = useRouter();
  const { user } = useStateContext();

  const [subDivisionOptions, setSubDivisionOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const initialData = {
    districtAdmin: user?.userId,
    date: "",
    notes: "",
    totalAmount: "",
    subdivision: "",
    area: "",
    image: "",
  };

  const [data, setData] = useState(initialData);

  const { mutate: addMutate } = usePostWaste(JSON.stringify(data));

  useEffect(() => {
    if (user?.district) {
      setSubDivisionOptions(
        allowedSubDivision[user?.district.toLowerCase()] || []
      );
    }
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log("handleInput");
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleAvatarChange = (event) => {
    console.log("handleImage");
    const { name, value } = event.target;
    if (name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        console.log("handleImage22");
        if (reader.readyState === 2) {
          setData({ ...data, [name]: reader.result });
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const removeAvatar = () => {
    setImage(null);
    // Update userData state if necessary
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response =
        await WasteManagementContractInteraction.RecordWasteCollection(
          data.date,
          data.totalAmount,
          data.area,
          data.notes
        );

      // If the transaction is successful, call the addMutate function
      addMutate(
        {},
        {
          onSuccess: (response) => {
            toast.success(response?.data?.message);
            setIsLoading(false);
            setData(initialData);
            setTimeout(() => {
              router.push(
                "/dashboard/district-admin/community-waste-movement-entries"
              );
            }, 1000);
          },
          onError: (response) => {
            toast.error(response.response.data.message);
            setIsLoading(false);
          },
        }
      );
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-5 md:p-10 bg-[#fff] rounded-md  font-poppins">
      <h1 className="font-bold text-3xl">Community Waste Movements</h1>
      <p className="text-sm mt-3 leading-6 text-[#62706b]">
        Please complete the form below, to request a quote, and we’ll be in
        touch. Or you can call us and our specialists will provide help!
      </p>
      <form className="w-full mt-10 " onSubmit={handleSubmit}>
        <div className="my-3">
          {image ? (
            <div className="">
              <div className="w-24 h-24 mx-auto relative">
                <img
                  src={image}
                  alt="Image"
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
                <p>Upload image of the location</p>
                <p className="text-xs mt-2">Click to browse image here</p>
              </div>
            </label>
          )}
          <input
            id="avatar-upload"
            name="image"
            required
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Input
            label="date"
            type="date"
            placeholder="Please write you details"
            name="date"
            onChange={handleInputChange}
            value={data.date}
            required
          />
          <Input
            label="notes"
            type="text"
            placeholder="Please write you details"
            name="notes"
            onChange={handleInputChange}
            value={data.notes}
            required
          />
          <Input
            label="totalAmount"
            type="text"
            placeholder="Please write you details"
            name="totalAmount"
            onChange={handleInputChange}
            value={data.totalAmount}
            required
          />
          {/* <Input
            label="subdivision"
            type="text"
            placeholder="Please write you details"
            name="subdivision"
            onChange={handleInputChange}
            value={data.subdivision}
            required
          /> */}
          <div>
            <label
              htmlFor="subdivision-select"
              className="font-semibold text-sm text-[#202725] mb-1"
            >
              Select Your SubDivision
            </label>
            <select
              id="subdivision-select"
              name="subdivision"
              required
              value={data.subdivision}
              onChange={handleSelectChange}
              className="outline-none text-sm  p-4 w-full rounded-md border-2 border-[#d9e4df] "
            >
              <option value="">Select SubDivision</option>
              {subDivisionOptions.map((subdivision, index) => (
                <option key={index} value={subdivision}>
                  {subdivision}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="area"
            type="text"
            placeholder="Please write you details"
            name="area"
            onChange={handleInputChange}
            value={data.area}
            required
          />
        </div>
        <div className="grid place-items-center mt-6">
          {isLoading ? (
            <button
              type="submit"
              className="mt-6 w-full flex justify-center items-center font-semibold text-sm gap-3 bg-[#20332c] transition duration-500 ease-in-out outline-none border-0 px-7 py-5 rounded-sm"
              disabled
            >
              <FaSpinner className="animate-spin mr-2 text-white" />
              <span className={"text-white"}>Loading...</span>
            </button>
          ) : (
            <button
              type="submit"
              // onClick={resetForm}
              className="mt-6 w-full flex justify-center items-center font-semibold text-sm gap-3 bg-[#20332c] transition duration-500 ease-in-out hover:bg-[#257830] text-[#fff] hover:text-[#fff] outline-none border-0 px-7 py-5 rounded-sm"
            >
              Submit
              <span className="p-0 rounded-full bg-[#fff] transition duration-500 text-[#20332c]">
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
  );
};

export default CommunityWasteMovements;
