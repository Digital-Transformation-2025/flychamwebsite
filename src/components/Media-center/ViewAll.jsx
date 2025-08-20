import React from "react";

const ViewAllBtn = ({ onClick }) => {
  return (
    <div className="w-full flex justify-center ">
      <button
        onClick={onClick}
        className="
          px-6 py-2 
          border border-[#054E72] 
          text-[#054E72] 
          rounded-md 
          text-sm font-montserrat font-medium 
          hover:bg-[#054E72] hover:text-white 
          transition-colors duration-300
        "
      >
        View all
      </button>
    </div>
  );
};

export default ViewAllBtn;
