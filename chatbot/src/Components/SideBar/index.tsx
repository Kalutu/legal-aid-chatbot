import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { CiChat1 } from "react-icons/ci";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { CiMemoPad } from "react-icons/ci";
import SideBarComponent from "../SideBarComponent";
import { SideBarItem } from "../../myTypes";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { logout } from "../../slices/authSlice";
import { User } from "../../myTypes";

const Sidebar: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const userString = localStorage.getItem("userInfo");
  const user: User | null = userString ? JSON.parse(userString) : null;
  const dispatch = useAppDispatch();
  const sidebarItems: SideBarItem[] = [
    {
      id: 0,
      title: "Dashboard",
      icon: <GoHome className="w-5 h-5  text-grey" />,
      link: "/dashboard",
      hidden: user && user.accounttype === "reporter" ? true : false,
    },
    {
      id: 1,
      title: "Chat",
      icon: <CiChat1 className="w-5 h-5 text-grey" />,
      link: `/chat/${user && user.chatId ? user.chatId : ""}`,
      hidden: user && user.accounttype === "admin" ? true : false, // New condition
    },

    {
      id: 2,
      title: "Reported Incidents",
      icon: <HiOutlineDocumentReport className="w-5 h-5  text-grey" />,
      link: "/reports",
      hidden: user && user.accounttype === "reporter" ? true : false,
    },
  ];
  return (
    <div className="hidden md:block w-[250px] border-r border-white border-opacity-10 bg-primary fixed min-h-screen py-[100px] px-4">
      {sidebarItems.map((sidebarItem) => (
        <SideBarComponent
          item={sidebarItem}
          setPage={setPage}
          key={sidebarItem.id}
        />
      ))}
      <div
        onClick={() => {
          dispatch(logout());
        }}
        className="absolute  bottom-0 mt-auto flex  flex-row items-center gap-4 justify-start p-[10px]"
      >
        <RiLogoutBoxLine className="text-danger" />
        <p className="text-danger">Sign out</p>
      </div>
    </div>
  );
};

export default Sidebar;
