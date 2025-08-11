'use client'
import StepItem from "./StepItem";
import Lottie from "lottie-react";
import planeAnim from "../../assets/plane.json";
import { X } from "@phosphor-icons/react";
import stepsConnecter from "@/assets/images/stepsConnecter.png"
import stepsConnectorInActive from "@/assets/images/stepsConnectorInActive.png"
import Image from "next/image";
const StepBar = ({ onClose, stepsData, formikValues, handleClick }) => {
  const activeTab = formikValues.type;




  return (
    <div className="relative mb-4 overflow-visible">
      <div className="flex items-center bg-white px-6 py-4 rounded-2xl shadow-md gap-6 overflow-x-auto">
        <div className="flex items-center gap-6 w-full">
          {stepsData.map((step, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 cursor-pointer"
              onClick={() => handleClick(step.id)}
            >
              <StepItem
                {...step}
                isCompleted={step.id < activeTab}
                isActive={step.id === activeTab}
              />

              {/* Connector */}
              {step.id < stepsData.length - 1 || step.id === activeTab ? (
                <div className="w-20 flex justify-center items-center gap-3">
                  {step.id === activeTab ? (
                    <Lottie animationData={planeAnim} loop className="w-full h-full" />
                  ) : step.id < activeTab ? (
                    // Filled bullets for completed steps
                    // [...Array(5)].map((_, i) => (
                    //   <div key={i} className="w-1 h-1 bg-main rounded-full" />
                    // ))
                    <Image src={stepsConnecter} alt="step-container" />
                  ) : (
                    // Gray bullets for upcoming steps
                    <Image src={stepsConnectorInActive} alt="step-bullets" />

                  )}
                </div>
              ) : null}


            </div>
          ))}

          {/* Plane animation after last step */}
          {/* {activeTab === stepsData.length - 1 && (
            <div className=" w-15 flex justify-center">
              <Lottie animationData={planeAnim} loop className="w-full h-full" />
            </div>
          )} */}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="cursor-pointer absolute right-[-40px] top-[0px] w-8 h-8 rounded-full bg-[#f5f5f430] bg-opacity-80 flex items-center justify-center transition backdrop-blur-sm z-20"
      >
        <X size={16} weight="bold" className="text-white" />
      </button>


    </div>
  );
};

export default StepBar;
