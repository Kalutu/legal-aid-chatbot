import React from "react";
import { useNavigate } from "react-router-dom";
import { User, ComponentProps } from "../../myTypes";

const SideBarComponent: React.FC<ComponentProps> = ({ item, setPage }) => {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const userString = localStorage.getItem("userInfo");
  const user: User | null = userString ? JSON.parse(userString) : null;

  return (
    <div
      onClick={() => {
        setPage(item.id);
        navigate(item.link);
      }}
      className={`flex ${item.hidden ? "hidden" : ""}  ${
        item.link.slice(1) === location.slice(1) ||
        item.link.slice(1).includes(location.slice(1, 5))
          ? `bg-[#1f202c] text-dark `
          : ` text-grey `
      }cursor-pointer hover:text-dark gap-4 mt-2 rounded flex-row items-center justify-start p-[4px] hover:bg-secondary`}
    >
      {item.icon}
      <p className="slate"> {item.title}</p>
    </div>
  );
};

export default SideBarComponent;
