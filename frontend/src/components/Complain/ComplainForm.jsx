"use client";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { useComplain } from "../../hooks/complain-hook";
import Input from "../CC/Input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useStateContext } from "@/app/StateContext";
import { FaChevronDown, FaUpload } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { FaSpinner } from "react-icons/fa";
import dynamic from "next/dynamic";

import "@tensorflow/tfjs-backend-cpu";
import * as tf from "@tensorflow/tfjs-core";

import * as tflite from "@tensorflow/tfjs-tflite";
import "./complain.css";
const MapComponent = dynamic(
  () => import("@/components/Complain/mapComponent"),
  {
    ssr: false,
  }
);

const MAX_DETECTIONS = 5;
const THRESHOLD = 0.4;
const MODEL_PATH = "/model/waste.tflite";
const classLabels = {
  0: "Open Litter",
  1: "Overflow Dustbin",
  2: "Plastic Waste",
  3: "Biodegradable Waste",
  4: "Medical Waste",
};

const classColors = {
  "Open Litter": "#F44336",
  "Overflow Dustbin": "#388E3C",
  "Plastic Waste": "#2979FF",
  "Biodegradable Waste": "#E040FB",
  "Medical Waste": "#FF6D00",
};

const ComplainForm = () => {
  tflite.setWasmPath("tflite_wasm/");
  const router = useRouter();
  const allowedSubDivision = {
    south: ["garden", "liyari", "saddar", "aram bagh", "civil line"],
    east: [
      "gulzar e hijri",
      "jamshed quarters",
      "ferozabad",
      "gulshan e iqbal",
    ],
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

  const [detectionDimension, setDetectionDimension] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const { user } = useStateContext();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const savedLatitude = localStorage.getItem("latitude");
    setLatitude(savedLatitude);
    const savedLongitude = localStorage.getItem("longitude");
    setLongitude(savedLongitude);
  }, []);

  const [userData, setUserData] = useState({
    userId: user?.userId,
    district: "",
    area: "",
    description: "",
    latitude: parseFloat(localStorage.getItem("latitude")),
    longitude: parseFloat(localStorage.getItem("longitude")),
    image: "",
    subDivision: "",
    status : ""
  });

  const { mutate: addMutate } = useComplain(JSON.stringify(userData));

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const subDivisions = allowedSubDivision[userData.district];

  console.log({ imageeeeeoutside: userData.image });

  const handleSubmit = async (event) => {
    event.preventDefault();
    detectionDimension.predictionName === undefined
    ? setUserData(prevData => ({
      ...prevData,
      status: "discarded"
    }))
    : setUserData(prevData => ({
      ...prevData,
      status: "pending"
    }))
    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    setIsLoading(true);
    addMutate(
      {},
      {
        onSuccess: (response) => {
          toast.success(response?.data?.message);
          router.push("/");
          setIsLoading(false);
        },
        onError: (response) => {
          console.error("An error occurred bro:");
          console.log(response);
          toast.error(response.message);
          setIsLoading(false);
        },
      }
    );
  };

  const handleAvatarChange = (event) => {
    console.log("handleImage");
    const { name, value } = event.target;
    if (name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.onload = async () => {
          try {
            const parentElement = document.getElementById("image-container");
            console.log(parentElement);
            const boxContainer1 = document.createElement("div");
            parentElement.style.position = "relative";
            boxContainer1.classList.add("box-container");

            let predictionImage =
              document.getElementsByClassName("image-prediction")[0];
            console.log({ predictionImage });

            const tensor = tf.browser.fromPixels(img);
            const resizedImage = tf.image.resizeBilinear(tensor, [448, 448]);
            const objectDetector = await tflite.loadTFLiteModel(MODEL_PATH);
            const input = tf.cast(tf.expandDims(resizedImage), "int32");

            let result = await objectDetector.predict(input);
            let boxes = Array.from(await result[Object.keys(result)[0]].data());
            let classes = Array.from(
              await result[Object.keys(result)[1]].data()
            );
            let scores = Array.from(
              await result[Object.keys(result)[2]].data()
            );
            let n = Array.from(await result[Object.keys(result)[3]].data());
            console.log("nnnn")
            console.log(n)
            const detections = [];

            for (let i = 0; i < n; i++) {
              const boundingBox = boxes.slice(i * 4, (i + 1) * 4);
              const classIndex = classes[i];
              const className = classLabels[classIndex];
              const score = scores[i];
              detections.push({ boundingBox, className, score, index: i });
            }

            // Sort the results in the order of confidence to get top results.
            detections.sort((a, b) => b.score - a.score);

            const numDetectionsToShow = Math.min(
              MAX_DETECTIONS,
              detections.length
            );

            for (let i = 0; i < numDetectionsToShow; i++) {
              const detection = detections[i];
              const { boundingBox, className, score, index } = detection;
              const y_min = Math.floor(boundingBox[0] * 450);
              const y_max = Math.floor(boundingBox[2] * 450);
              const x_min = Math.floor(boundingBox[1] * 450);
              const x_max = Math.floor(boundingBox[3] * 450);
              console.log(score)
              console.log(THRESHOLD)
              if(score < THRESHOLD){
                console.log("here")
                
              }
              //const container = img.parentNode;
              if (score > THRESHOLD) {
                const color = classColors[className];

                

                setDetectionDimension({
                  y_min,
                  x_min,
                  predictionValue: score,
                  predictionName: className,
                  width: x_max - x_min,
                  height: y_max - y_min,
                });
              }
            }
          } catch (error) {
            console.error("Error while processing image:", error);
          }
        };
        img.src = reader.result;

        setUserData((prevUserData) => ({
          ...prevUserData,
          image: reader.result,
        }));
        setImage(reader.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  return (
    <div
      style={{
        boxShadow: "0px 5px 43px 0px rgba(17, 29, 25, 0.12)",
      }}
      className=" sm:p-10 px-4 py-7 w-full font-poppins "
    >
      <h1 className="font-bold text-2xl">Make a request</h1>
      <p className="text-sm mt-3 leading-6 text-[#62706b]">
        Please complete the form below, to request a quote, and we’ll be in
        touch. Or you can call us and our specialists will provide help!
      </p>
      <form className="w-full  mt-10 " onSubmit={handleSubmit}>
        <div id="image-container" className="relative sm:m-10">
          <div id="my-3">
            {image ? (
              <div id="image-container-prediction" className="relative w-full">
                <div
                  style={{
                    top: `${detectionDimension.y_min}px`,
                    left: `${detectionDimension.x_min}px`,
                    width: `${detectionDimension.width}px`,
                    height: `${detectionDimension.height}px`,
                  }}
                  className={`prediction_box absolute border-4 border-red-600`}
                >
                  <p className="absolute top-0 left-0 text-red-600 text-lg">
                    {`${
                      detectionDimension.predictionName === undefined
                        ? "No waste Detected "
                        : detectionDimension.predictionName
                    }
                   + ${
                     detectionDimension.predictionValue === undefined
                       ? " "
                       : detectionDimension.predictionValue
                   }`}
                  </p>
                </div>

                <img
                  src={image}
                  alt="image/logo"
                  className="image-prediction"
                />
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
              name="image"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="grid mt-3 sm:mt-0 md:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="district-select"
              className="font-semibold text-sm text-[#202725] mb-1"
            >
              Select Your District
            </label>

            <div className="relative inline-block w-full cursor-pointer">
              <select
                id="district-select"
                name="district"
                required
                value={userData.district}
                onChange={handleSelectChange}
                className="outline-none appearance-none text-sm  p-4 w-full rounded-md border-2 border-[#d9e4df] "
              >
                <option value="">Select District</option>
                {Object.keys(allowedSubDivision).map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 text-[16px] flex items-center px-2 text-[#202725]">
                <FaChevronDown />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="district-select"
              className="font-semibold text-sm text-[#202725] mb-1"
            >
              Select Your Sub Division
            </label>
            <div className="relative inline-block w-full cursor-pointer">
              <select
                id="subDivision-select"
                required
                name="subDivision"
                value={userData.subDivision}
                onChange={handleSelectChange}
                className="outline-none text-sm appearance-none  p-4 w-full rounded-md border-2 border-[#d9e4df]"
                disabled={!userData.district}
              >
                <option value="">Select SubDivision</option>
                {subDivisions &&
                  subDivisions.map((subDivision, index) => (
                    <option key={index} value={subDivision}>
                      {subDivision}
                    </option>
                  ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 text-[16px] flex items-center px-2 text-[#202725]">
                <FaChevronDown />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-3">
          <Input
            name="area"
            label="Enter Your Area"
            type="text"
            required
            value={userData.area}
            placeholder="Please enter your area"
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full my-3">
          <p className="font-semibold text-sm text-[#202725] mb-1">
            Write your query
          </p>
          <textarea
            name="description"
            onChange={handleInputChange}
            value={userData.description}
            required
            className="outline-none min-h-[150px] sm:min-h-[200px] text-sm  p-4 w-full rounded-md border-2 border-[#d9e4df] "
          />
        </div>

        <MapComponent />

        <div className="grid place-items-center ">
          {isLoading ? (
            <button
              type="submit"
              className=" mt-3 sm:mt-6 w-full flex justify-center items-center font-semibold text-sm gap-3 bg-[#20332c] transition duration-500 ease-in-out outline-none border-0 px-7 py-5 rounded-md sm:rounded-sm"
              // disabled
            >
              <FaSpinner className="animate-spin mr-2 text-white" />
              <span className={"text-white"}>Loading...</span>
            </button>
          ) : (
            <button
              type="submit"
              // onClick={resetForm}
              className="mt-3 sm:mt-6 w-full flex justify-center items-center font-semibold text-sm gap-3 bg-[#20332c] transition duration-500 ease-in-out hover:bg-[#257830] text-[#fff] hover:text-[#fff] outline-none border-0 px-7 py-5 rounded-md sm:rounded-sm"
            >
              Submit Complain
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

export default ComplainForm;
