"use client";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ImageUploadSlotProps } from "../utils/interface";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CameraModal from "../securityForm/CameraModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import axios from "axios";

const UploadPopUpTwo = ({
  openClose,
  selectedItem,
  updateList,
  questionList,
  activeStage,
}: any) => {
  const [selectedCheckList, setSelectedCheckList] = useState<any>(selectedItem);
  const [popupOpen, setPopupOpen] = useState<any>({ msg: null, type: false });

  useEffect(() => {
    if (popupOpen?.type) {
      const timer = setTimeout(() => {
        setPopupOpen({ msg: null, type: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [popupOpen]);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        openClose(false);
      }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg w-[600px] relative"
      >
        <div
          className="absolute -top-12 right-0 cursor-pointer bg-white p-2 rounded-full hover:bg-gray-200 duration-1000 hover:rotate-180 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            openClose(false);
          }}
        >
          <CloseIcon />
        </div>

        {selectedItem?.code === "LAYERWISE_LOADING" &&
          (() => {
            const imageParts = [
              "First Layer",
              "Second Layer",
              "Third Layer",
              "Fourth Layer",
              "Post Layer",
            ];
            return (
              <div>
                <h2>{selectedItem?.point}</h2>
                <div className=" flex flex-wrap gap-x-10 gap-y-5 mt-3 justify-center">
                  {selectedItem?.images.map((part: any, index: any) => (
                    <ImageUploadSlot
                      key={index}
                      image={part?.imageURL || null}
                      label={part?.imgType || ""}
                      part={part}
                      updateList={updateList}
                      selectedCheckList={selectedCheckList}
                      setSelectedCheckList={setSelectedCheckList}
                      activeStage={activeStage}
                      selectedItem={selectedItem}
                      setPopupOpen={setPopupOpen}
                    />
                  ))}
                </div>
              </div>
            );
          })()}

        {selectedItem?.code === "LOADED_MATERIAL_MATCH" &&
          (() => {
            const imageParts = ["photo1", "photo2"];
            return (
              <div>
                <h2>{selectedItem?.point}</h2>
                <div className=" flex flex-wrap gap-x-10 gap-y-5 mt-3 justify-center">
                  {selectedItem?.images.map((part: any, index: any) => (
                    <ImageUploadSlot
                      key={index}
                      image={part?.imageURL || null}
                      label={part?.imgType || ""}
                      part={part}
                      updateList={updateList}
                      selectedCheckList={selectedCheckList}
                      setSelectedCheckList={setSelectedCheckList}
                      activeStage={activeStage}
                      selectedItem={selectedItem}
                      setPopupOpen={setPopupOpen}
                    />
                  ))}
                </div>
              </div>
            );
          })()}

        {selectedItem?.code === "FINAL_WEIGHT_VERIFICATION" &&
          (() => {
            const imageParts = ["photo1"];
            return (
              <div>
                <h2>{selectedItem?.point}</h2>
                <div className=" flex flex-wrap gap-x-10 gap-y-5 mt-3 justify-center">
                  {selectedItem?.images.map((part: any, index: any) => (
                    <ImageUploadSlot
                      key={index}
                      image={part?.imageURL || null}
                      label={part?.imgType || ""}
                      part={part}
                      updateList={updateList}
                      selectedCheckList={selectedCheckList}
                      setSelectedCheckList={setSelectedCheckList}
                      activeStage={activeStage}
                      selectedItem={selectedItem}
                      setPopupOpen={setPopupOpen}
                    />
                  ))}
                </div>
              </div>
            );
          })()}

        {selectedItem?.code === "TRUCK_SEAL_CHECK" &&
          (() => {
            const imageParts = ["photo1"];
            return (
              <div>
                <h2>{selectedItem?.point}</h2>
                <div className=" flex flex-wrap gap-x-10 gap-y-5 mt-3 justify-center">
                  {selectedItem?.images.map((part: any, index: any) => (
                    <ImageUploadSlot
                      key={index}
                      image={part?.imageURL || null}
                      label={part?.imgType || ""}
                      part={part}
                      updateList={updateList}
                      selectedCheckList={selectedCheckList}
                      setSelectedCheckList={setSelectedCheckList}
                      activeStage={activeStage}
                      selectedItem={selectedItem}
                      setPopupOpen={setPopupOpen}
                    />
                  ))}
                </div>
              </div>
            );
          })()}

        {selectedItem?.code === "UNLISTED_MATERIAL_CHECK" &&
          (() => {
            const imageParts = ["photo1"];
            return (
              <div>
                <h2>{selectedItem?.point}</h2>
                <div className=" flex flex-wrap gap-x-10 gap-y-5 mt-3 justify-center">
                  {selectedItem?.images.map((part: any, index: any) => (
                    <ImageUploadSlot
                      key={index}
                      image={part?.imageURL || null}
                      label={part?.imgType || ""}
                      part={part}
                      updateList={updateList}
                      selectedCheckList={selectedCheckList}
                      setSelectedCheckList={setSelectedCheckList}
                      activeStage={activeStage}
                      selectedItem={selectedItem}
                      setPopupOpen={setPopupOpen}
                    />
                  ))}
                </div>
              </div>
            );
          })()}
        
        {popupOpen.type && popupOpen.msg && (
            <div
              className={`${
                popupOpen.msg.includes("successfully")
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              } py-2 px-4 text-white rounded-md text-center w-full mt-3`}
            >
              {popupOpen.msg}
            </div>
          )}

        <button onClick={()=>{openClose(false)}} className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 duration-300 w-full">
          Submit
        </button>
      </div>
    </div>
  );
};
export default UploadPopUpTwo;

const ImageUploadSlot = ({
  key,
  image,
  label,
  part,
  updateList, // update function to update the list of questions []
  selectedCheckList, // selected check list item {}
  setSelectedCheckList, // set function to set the selected check list item {}
  activeStage,
  selectedItem,
  setPopupOpen
}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); 

//   const handleImageCapture = (capturedImage: string) => {
//     updateList((previous: any) => {
//       const updatedList = [...previous];
//       updatedList.forEach((item: any) => {
//         if (item.code === selectedCheckList.code) {
//           const labelExists = item.images.some(
//             (image: any) => image.type === label
//           );
//           if (!labelExists) {
//             item.images.push({
//               imageURL: capturedImage,
//               type: label,
//               comment: "",
//             });
//           }
//         }
//       });
//       return updatedList;
//     });
//     setSelectedCheckList((prev: any) => {
//       const updateObject = { ...prev };
//       const labelExists = updateObject.images.some(
//         (image: any) => image.type === label
//       );
//       if (!labelExists) {
//         updateObject.images.push({
//           imageURL: capturedImage,
//           type: label,
//           comment: "",
//         });
//       }
//       return updateObject;
//     });
//   };

//   const removeImage = (selectedCheckList: any, label: string) => {
//     updateList((previous: any) => {
//       const updatedList = [...previous];
//       updatedList.forEach((item: any) => {
//         if (item.code === selectedCheckList.code) {
//           item.images = item.images.filter(
//             (image: any) => image.type !== label
//           );
//         }
//       });
//       return updatedList;
//     });
//     setSelectedCheckList((prev: any) => {
//       const updateObject = { ...prev };
//       updateObject.images = updateObject.images.filter(
//         (image: any) => image.type !== label
//       );
//       return updateObject;
//     });
//   };


const handleRemoveClick = (e: any) => {
    e.stopPropagation(); // Prevents triggering the image click action
    setIsConfirmationOpen(true); // Open the confirmation popup
  };

  const handleConfirmRemove = () => {
    removeImage(selectedCheckList, label); // Confirm the image removal
    setIsConfirmationOpen(false); // Close the confirmation popup
  };

  const handleCancelRemove = () => {
    setIsConfirmationOpen(false); // Close the confirmation popup
  };

const handleImageCapture = (capturedImage: any) => {
    updateList((previous: any) => {
      const updatedList = [...previous];
      updatedList.forEach((item: any) => {
        if (item.code === selectedCheckList.code) {
          item.images.map((image: any) => {
            if (image.imgType === label) {
              image.imageURL = capturedImage;
            }
          });
        }
      });
      return updatedList;
    });
    setSelectedCheckList((prev: any) => {
      const updateObject = { ...prev };
      updateObject.images.map((image: any) => {
        if (image.imgType === label) {
          image.imageURL = capturedImage;
        }
      });
      return updateObject;
    });
  };

  const removeImage = async (selectedCheckList: any, label: string) => {
    const payloadRemove = {
      checkList_Id: selectedItem?._id,
      imgType: part?.imgType,
    };

    const config = {
      url: `https://dev-api.instavans.com/api/thor/v1/security/removeImage?checkList_Id=${selectedItem?._id}&imgType=${part?.imgType}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem(
          "accessToken"
        )} Shipper ${localStorage.getItem("default_unit")}`,
      },
    };

    try {
      const response: any = await axios(config);

      updateList((previous: any) => {
        const updatedList = [...previous];
        updatedList.forEach((item: any) => {
          if (item.code === selectedCheckList.code) {
            item.images.map((image: any) => {
              if (image.imgType === label) {
                image.imageURL = null;
              }
            });
          }
        });
        return updatedList;
      });
      setSelectedCheckList((prev: any) => {
        const updateObject = { ...prev };
        updateObject.images.map((image: any) => {
          if (image.imgType === label) {
            image.imageURL = null;
          }
        });
        return updateObject;
      });
    } catch (error) {
      console.log(error);
    }

    // updateList((previous: any) => {
    //   const updatedList = [...previous];
    //   updatedList.forEach((item: any) => {
    //     if (item.code === selectedCheckList.code) {
    //       item.images = item.images.filter(
    //         (image: any) => image.type !== label
    //       );
    //     }
    //   });
    //   return updatedList;
    // });
    // setSelectedCheckList((prev: any) => {
    //   const updateObject = { ...prev };
    //   updateObject.images = updateObject.images.filter(
    //     (image: any) => image.type !== label
    //   );
    //   return updateObject;
    // });
  };


  return (
    <>
      <div
        onClick={() => {
          setIsModalOpen(true);
        }}
        key={key}
        className=" relative text-[12px]  border-[1px] w-[130px] h-[130px] flex items-center justify-center flex-col cursor-pointer"
      >
        {image ? (
          <div className="relative w-full h-full">
            <img
              src={image}
              alt={label}
              className="w-full h-full object-cover"
            />
            <div
              onClick={(e) => {
                e.stopPropagation();
                // removeImage(selectedCheckList, label);
                handleRemoveClick(e);
              }}
              className="absolute cursor-pointer h-7 w-7 top-[-10px] right-[-10px] bg-red-50 rounded-full z-[1] flex items-center justify-center shadow-lg"
            >
              <DeleteIcon sx={{ fontSize: "20px", color: "red" }} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <CameraAltOutlinedIcon />
            <p className=" text-center px-5">
              Add <span style={{ color: "#2962FF" }}>{label}</span> of the
              Vehicle
            </p>
            { (selectedCheckList.code === "LAYERWISE_LOADING" && label === "First Layer") ||
              (selectedCheckList.code === "TRUCK_SEAL_CHECK" && label === "photo01") ||
              (selectedCheckList.code === "UNLISTED_MATERIAL_CHECK" && label === "photo1") ? 
              <span className="text-red-500 text-lg absolute -top-0 left-2">*</span> : null}
          </div>
        )}
      </div>

      {selectedCheckList?.code === "TRUCK_SEAL_CHECK" && (
        <div className=" content-center">
          <label className="text-[10px] font-sans">Seal Number (Optional)</label>
          <input
            type="number"
            placeholder="Enter Seal Number"
            className="border border-gray-300 rounded-sm px-2 py-1 w-full outline-none "
            value={
              selectedCheckList?.inputValue === 0
                ? ""
                : selectedCheckList?.inputValue
            }
            onChange={(e) => {
              setSelectedCheckList((prev: any) => {
                const updateObject = { ...prev };
                console.log(
                  "🚀 ~ file: uploadPopUpTwo.tsx:180 ~ updateObject:",
                  updateObject
                );
                updateObject.inputValue = e.target.value;
                return updateObject;
              });
              updateList((previous: any) => {
                const updatedList = [...previous];
                updatedList.forEach((item: any) => {
                  if (item.code === selectedCheckList.code) {
                    item.inputValue = e.target.value;
                  }
                });
                return updatedList;
              });
            }}
          />
        </div>
      )}

      {/* Confirmation Popup */}
      {isConfirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
            <h3 className="text-center text-lg">Are you sure you want to remove this image?</h3>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleConfirmRemove}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes, Remove
              </button>
              <button
                onClick={handleCancelRemove}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <CameraModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCapture={handleImageCapture}
          selectedItem={selectedItem}
          part={part}
          activeStage={activeStage}
          setPopupOpen={setPopupOpen}
        />
      )}
    </>
  );
};
