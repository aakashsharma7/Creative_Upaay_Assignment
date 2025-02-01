"use client"
import Image from "next/image";
import Logo from "../../../assets/Sidebar/colorfilter.png";
import ArrowLeft from "../../../assets/Sidebar/arrow-left.png";
import Category from "../../../assets/Sidebar/category.png";
import Settings from "../../../assets/Sidebar/setting-2.png";
import Profile from "../../../assets/Sidebar/profile-2user.png";
import Message from "../../../assets/Sidebar/message.png";
import Tasks from "../../../assets/Sidebar/task-square.png";
import AddSquare from "../../../assets/Sidebar/add-square.png";
import ThoughtsBox from "./ThoughtsBox";
import { useState } from "react";

const navItems = [
  { label: "Home", image: Category },
  { label: "Messages", image: Message },
  { label: "Tasks", image: Tasks },
  { label: "Members", image: Profile },
  { label: "Settings", image: Settings },
];

const projects = [
  { label: "Mobile App", color: "#7AC555" },
  { label: "Website Redesign", color: "#FFA500" },
  { label: "Design System", color: "#E4CCFD" },
  { label: "Wireframes", color: "#76A5EA" },
];

const Sidebar = ({ selectedProject }) => {
  const [isClosed, setIsClosed] = useState(false);

  const toggleSidebar = () => {
    setIsClosed((prevState) => !prevState);
  };

  return (
    <div
      className={`${
        isClosed ? "w-[95px]" : "w-64"
      } bg-white text-[#787486] h-screen space-y-2 border-r-2 border-[#DBDBDB] transition-all duration-300`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center">
          <Image
            src={Logo}
            alt="Logo"
            className={`mt-1 w-[24px] h-[24px] mx-1 `}
          />
          {!isClosed && (
            <h1 className="text-[20px] font-bold text-[#0D062D] p-2">Project M.</h1>
          )}
        </div>
        <div
          className="flex justify-center items-center cursor-pointer ml-4"
          onClick={toggleSidebar}
        >
          <Image
            src={ArrowLeft}
            alt="Arrow-Left"
            className={`w-[20px] h-[20px] transform mr-[-10px] ${
              isClosed ? "rotate-180" : ""
            }`}
          />
          <Image
            src={ArrowLeft}
            alt="Arrow-Left"
            className={`w-[20px] h-[20px] transform ${
              isClosed ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      <div className="border-b-2 border-[#DBDBDB]" />
      <nav className={`px-4 ${isClosed ? "space-y-6" : "space-y-4"}`}>
        {navItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-gray-400"
          >
            <Image src={item.image} alt={`${item.label} icon`} width={22} height={22} />
            {!isClosed && <p className="text-[16px]">{item.label}</p>}
          </div>
        ))}
        <div className="border-b-2 border-[#DBDBDB]" />
      </nav>
      <div className="px-4">
        <div className="flex justify-between">
          {!isClosed && (
            <h3 className="text-gray-400 text-[12px] font-semibold my-2">
              My Projects
            </h3>
          )}
          <Image
            src={AddSquare} 
            alt="AddSquare"
            className="w-[16px] h-[16px] my-2"
          />
        </div>

        <ul className="space-y-2 mt-2 mb-8">
          {projects.map((project, index) => (
            <li
              key={index}
              className={`flex items-center space-x-2 rounded-lg p-2 mr-8 cursor-pointer ${
                selectedProject === project.label
                  ? "bg-[#F0EFFD] text-[#0D062D] font-semibold"
                  : "text-gray-400 hover:bg-[#5030E514] hover:text-[#0D062D]"
              }`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: project.color }}
              ></div>
              {!isClosed && <p className="text-[16px]">{project.label}</p>}
            </li>
          ))}
        </ul>
      </div>
      {!isClosed && (
        <div className="mt-5">
          <ThoughtsBox />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
