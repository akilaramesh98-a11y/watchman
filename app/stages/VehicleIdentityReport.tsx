"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Button, Dialog, DialogTitle } from "@mui/material";
import Typography from "@mui/material/Typography";
import UploadIcon from "@mui/icons-material/Upload";
import { useRouter } from "next/navigation";
import Checkbox from "@mui/material/Checkbox";
import UploadPopUp from "../hooks/uploadPopUp";
import axios from "axios";
import { vehicleIDEValidation } from "../checkStage/vehicleIDE";
import { toast, ToastContainer } from "react-toastify";
import shipmentCheck from "../hooks/shipmentCheck";


export default function VehicleIdentityReport({
  activeStage,
  handleStepClick,
  driverDts
}: any) {
  const router = useRouter();
  const [checklists, setChecklists] = useState<any>(activeStage?.activeStage?.checklist || []);
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
  const [checkListItem, setCheckListItem] = useState<any>(null);
  
  const [isSkipped, setIsSkipped] = useState(false);

  const { checkShipment, ShipmentCheckDialog } = shipmentCheck({
    driverDts,
    activeStage,
    currentStageCode: "VIR",
    openClose: (open: boolean) => setIsSkipped(!open),
    onSkip: (lastShipment) => {
      handleStepClick(activeStage.activestep + 1);
    },
    onContinue: () => {
      handleStepClick(activeStage.activestep + 1);
    }
  });

  useEffect(() => {
    if(driverDts){
      checkShipment();
    }
  },[driverDts, activeStage])
  const [nextStep, setNextStep] = useState<any>(null);
  
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [successPopup, setSuccessPopup] = useState(false); // New state for success popup
  const [fadeOut, setFadeOut] = useState(false); // State for fade-out effect

  const handleNewVehicle = () => {
    router.push('/');
  }

  const handleSaveClick = async () => {
    const payload:any = [];
    checklists.map((item:any) => {
      payload.push({
        _id: item?._id,
        allowed: item?.allowed,
        date: item?.date,
        inputValue: item?.inputValue,
        subQuestions: item?.subQuestions
      });
    });
    const stageDataPayload = {
      securityCheck_id: driverDts?._id,
      stage_id: activeStage?.activeStage?._id,
      start_at: activeStage?.activeStage?.start_at || new Date(),
    }
    const config = {
      url: `https://dev-api.instavans.com/api/thor/v1/security/save_stage_individual`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem(
          "accessToken"
        )} Shipper ${localStorage.getItem("default_unit")}`,
      },
      data: {lists: payload, completed: false, stageData: stageDataPayload}, 
    };
    const response = await axios(config);
    try {
      if (response.data.statusCode === 200) {
        setNextStep(true);
        setSuccessPopup(true);
        setTimeout(() => setFadeOut(true), 2000); 
        setTimeout(() => {
          setSuccessPopup(false);
          setFadeOut(false); // Hide popup after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    const pass = vehicleIDEValidation(checklists);
    setSaveDisabled(!pass);
  },[checklists])

  return (
    <div className="w-full h-full relative">
      {ShipmentCheckDialog}
      {/* ------- Success Popup ------- */}
      {successPopup && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${
            fadeOut ? "opacity-0" : "opacity-100"
          } transition-opacity duration-1000`} // Smooth fade-out
          style={{ backdropFilter: "blur(4px)" }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-bold mb-2">Success!</h2>
            <p className="text-sm text-gray-600 mb-4">Data saved successfully!</p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSuccessPopup(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* ------- Checklist ------- */}
      <div className=" max-h-[calc(100vh-234px)] overflow-y-scroll mb-[60px] sm:mb-0">
        <div className="top md:flex md:flex-row-reverse gap-[24px]">
          <div className="right w-full">
            <div className="checkList bg-[#fcfcfc] p-[20px] h-full rounded-[12px]">
              <div className="body flex flex-col gap-[16px]">
                <div className="header">
                  <p className="text-[#131722] text-[18px] font-bold">
                    Vehicle Identity And Reporting
                  </p>
                </div>
                <div className=" h-[450px] overflow-y-scroll">
                  <table className="w-full">
                    <thead>
                      <tr className="text-sm font-semibold">
                        <th className="text-left">Check points</th>
                        <th>Yes</th>
                        <th>No</th>
                        <th>Images</th>
                        <th>Previews</th>
                      </tr>
                    </thead>

                    <tbody>
                      {checklists.map((item:any, index:number) => (
                        <tr key={index} className="border-b border-[#E6E8EC]">
                          <td className="py-[12px]">
                            <Typography
                              className="text-[#71747A]"
                              variant="caption"
                            >
                              {item.point}
                            </Typography>
                          </td>

                          <td className="text-center px-3">
                            {index == 0 && (
                              <Checkbox
                                size="small"
                                checked={item.allowed}
                                disabled={
                                  !item.images.some((image: any) => image.imgType === "Floor Body" && image.imageURL && typeof image.imageURL === 'string')
                                }
                                onChange={(e) => {
                                  setChecklists((prev: any) => {
                                    const newChecklists = [...prev];
                                    newChecklists[index].allowed =
                                      e.target.checked;
                                    return newChecklists;
                                  });
                                }}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            )}
                            {index == 3 && (
                              <Checkbox
                                size="small"
                                checked={item.allowed}
                                disabled={!item.images.some((image: any) => image.imageURL && typeof image.imageURL === 'string')}
                                onChange={(e) => {
                                  setChecklists((prev: any) => {
                                    const newChecklists = [...prev];
                                    newChecklists[index].allowed =
                                      e.target.checked;
                                    return newChecklists;
                                  });
                                }}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            )}
                            {index == 2 && (
                              <Checkbox
                                size="small"
                                checked={item.allowed}
                                onChange={(e) => {
                                  setChecklists((prev: any) => {
                                    const newChecklists = [...prev];
                                    newChecklists[index].allowed =
                                      e.target.checked;
                                    return newChecklists;
                                  });
                                }}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            )}
                            {index == 1 && (
                              <Checkbox
                                size="small"
                                checked={item.allowed}
                                onChange={(e) => {
                                  setChecklists((prev: any) => {
                                    const newChecklists = [...prev];
                                    newChecklists[index].allowed =
                                      e.target.checked;
                                    return newChecklists;
                                  });
                                }}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            )}
                            {index == 6 && (
                              <Checkbox
                                size="small"
                                checked={item.allowed}
                                onChange={(e) => {
                                  setChecklists((prev: any) => {
                                    const newChecklists = [...prev];
                                    newChecklists[index].allowed =
                                      e.target.checked;
                                    return newChecklists;
                                  });
                                }}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            )}
                          </td>

                          <td className="text-center px-3">
                            {index == 0 && (
                              <Checkbox
                                size="small"
                                checked={!item.allowed}
                                disabled={
                                  !item.images.some((image: any) => image.imgType === "Floor Body" && image.imageURL && typeof image.imageURL === 'string') 
                                }
                                onChange={(e) => {
                                  setChecklists((prev: any) => {
                                    const newChecklists = [...prev];
                                    newChecklists[index].allowed =
                                      !e.target.checked;
                                    return newChecklists;
                                  });
                                }}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            )}
                            {index == 3 && (
                              <Checkbox
                                size="small"
                                checked={!item.allowed}
                                disabled={!item.images.some((image: any) => image.imageURL && typeof image.imageURL === 'string')}
                                onChange={(e) => {
                                  setChecklists((prev: any) => {
                                    const newChecklists = [...prev];
                                    newChecklists[index].allowed =
                                      !e.target.checked;
                                    return newChecklists;
                                  });
                                }}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            )}
                            {index == 6 && (
                              <Checkbox
                                size="small"
                                checked={!item.allowed}
                                onChange={(e) => {
                                  setChecklists((prev: any) => {
                                    const newChecklists = [...prev];
                                    newChecklists[index].allowed =
                                      !e.target.checked;
                                    return newChecklists;
                                  });
                                }}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            )}
                            {index == 1 && (
                              <Checkbox
                                size="small"
                                checked={!item.allowed}
                                onChange={(e) => {
                                  setChecklists((prev: any) => {
                                    const newChecklists = [...prev];
                                    newChecklists[index].allowed =
                                      !e.target.checked;
                                    return newChecklists;
                                  });
                                }}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            )}
                            {index == 2 && (
                              <Checkbox
                                size="small"
                                checked={!item.allowed}
                                onChange={(e) => {
                                  setChecklists((prev: any) => {
                                    const newChecklists = [...prev];
                                    newChecklists[index].allowed =
                                      !e.target.checked;
                                    return newChecklists;
                                  });
                                }}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            )}
                          </td>

                          <td className="text-center">
                            <div className="flex items-center justify-center gap-2 px-3">
                              {index != 6 && (
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    style={{
                                      backgroundColor: "#E7E9FF",
                                      color: "#2962FF",
                                      fontSize: "10px",
                                      borderRadius: "12px",
                                      width: "64px",
                                      height: "24px",
                                    }}
                                    className="upload-button text-white px-2 py-1 rounded"
                                    onClick={() => {
                                      setIsUploadPopupOpen(true);
                                      setCheckListItem(item);
                                    }}
                                  >
                                    <UploadIcon
                                      style={{
                                        width: "12px",
                                        height: "12px",
                                        marginRight: "4px",
                                        marginBottom: "3px",
                                      }}
                                    />
                                    Upload
                                  </button>
                                </div>
                              )}
                              {index == 6 && item.allowed && (
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    style={{
                                      backgroundColor: "#E7E9FF",
                                      color: "#2962FF",
                                      fontSize: "10px",
                                      borderRadius: "12px",
                                      width: "64px",
                                      height: "24px",
                                    }}
                                    className="upload-button text-white px-2 py-1 rounded"
                                    onClick={() => {
                                      setIsUploadPopupOpen(true);
                                      setCheckListItem(item);
                                    }}
                                  >
                                    <UploadIcon
                                      style={{
                                        width: "12px",
                                        height: "12px",
                                        marginRight: "4px",
                                        marginBottom: "3px",
                                      }}
                                    />
                                    Upload
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="text-center mx-3">
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                              {index != 5 &&
                                item?.images?.map((img: any) => (
                                  <div className="w-[50px] h-[50px]">
                                    <img
                                      src={img?.imageURL}
                                      alt={img?.type}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              {index == 5 && (
                                <div className="flex items-center justify-center gap-2 flex-wrap">
                                  <div className="text-[10px] text-[#71747A]">{item.inputValue === 0 ? '': item.inputValue}</div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------- navigation bar ------- */}
      <div className="absolute bottom-0 bg-white rounded-[8px] w-full flex justify-between items-center p-1">
        <div className="flex gap-[20px] items-center">
        <button onClick={handleNewVehicle} className='bg-blue-600 text-white text-sm px-8 py-2 rounded-md cursor-pointer hover:bg-blue-500 duration-300 font-semibold'>New Vehicle</button>
        <button
          disabled={activeStage.activestep === 0}
          className={` ${
            activeStage.activestep === 0 ? "bg-gray-400" : "bg-blue-600"
          } text-white text-sm px-8 py-2 rounded-md cursor-pointer hover:bg-blue-500 duration-300 font-semibold`}
        >
          Back
        </button>
        </div>
        <div className="flex gap-[5px] items-center">
          <button
            onClick={() => {
              handleSaveClick();
            }}
            disabled={saveDisabled}
            className={` ${saveDisabled ? "bg-gray-400" : "bg-blue-600 hover:bg-[#2563EB]" } text-white text-sm px-8 py-2 rounded-md cursor-pointer duration-300 font-semibold`}
            style={{ marginRight: "15px" }}
          >
            Save
          </button>
          <button
            onClick={() => {
              handleStepClick(activeStage.activestep + 1);
            }}
            disabled={!nextStep}
            className={` ${!nextStep ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-500 "} text-white text-sm px-8 py-2 rounded-md cursor-pointer duration-300 font-semibold`}
          >
            Next
          </button>
        </div>
      </div>

      {/* ------- upload popup ------- */}
      {isUploadPopupOpen && (
        <UploadPopUp
          openClose={setIsUploadPopupOpen}
          selectedItem={checkListItem}
          updateList={setChecklists}
          questionList={checklists}
          activeStage={activeStage}
          driverDts={driverDts}
        />
      )}    
    </div>
  );
}
