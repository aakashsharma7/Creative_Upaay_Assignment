"use client"
import { useState } from "react";
import Filter from "../../../assets/TaskSection/filter.png"
import Image from "next/image";
import { ChevronDown } from "lucide-react";


const FilterDropdown = ({ filter, setFilter }) => {
    const [isOpen, setIsOpen] = useState(false); 

    const handleFilterChange = (value) => {
        setFilter(value);
        setIsOpen(false); 
    };

    return (
        <div className="relative w-full text-[#787486]">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full border rounded-md p-2 flex items-center justify-between"
            >
                <Image 
            src={Filter}
            alt="Filter"
            className="w-[16px] h-[16px] mt-1"
            />
            <p className="mt-0.5 font-semibold">{filter ? filter : "Filter"}</p>
            <ChevronDown size={20} />
            </button>

            {isOpen && (
                <ul className="absolute top-full left-0 w-full mt-1 bg-white border rounded-md shadow-md z-10">
                    <li
                        onClick={() => handleFilterChange("All")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                        All
                    </li>
                    <li
                        onClick={() => handleFilterChange("High")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                        High
                    </li>
                    <li
                        onClick={() => handleFilterChange("Mid")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                        Mid
                    </li>
                    <li
                        onClick={() => handleFilterChange("Low")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                        Low
                    </li>
                </ul>
            )}
        </div>
    );
};

export default FilterDropdown;
