import React from "react";
import { useNavigate } from "react-router-dom";
import { TiMessageTyping } from "react-icons/ti";

const Button: React.FC = () => {
  const navigate = useNavigate();
  const action = () => {
    navigate("/chat/reporting");
  };

  return (
    <div
      onClick={() => {
        action();
      }}
      className=" relative ml-auto flex text-sm h-8 pl-2 pr-3 border border-white border-opacity-10 rounded-md gap-1 font-semibold   inline-flex items-center border justify-center select-none disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 cursor-pointer !font-normal"
    >
      <div className="absolute topline right-0 top-0 h-px w-[80%]"></div>

      <TiMessageTyping className="text-slate" />
      <p className="text-slate">Report</p>
    </div>
  );
};

export default Button;
