"use client";
import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import AddButton from "../../../assets/TaskSection/add-square.png";
import AddTaskModal from "./AddTaskModal";
import Image from "next/image";

const TaskColumn = ({ id, title, tasks, taskCount }) => {
  const { setNodeRef } = useDroppable({ id });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columnColors = {
    "To Do": "#5030E5",
    "In Progress": "#FFA500",
    "Done": "#8BC48A",
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div ref={setNodeRef} className="p-4 bg-[#F5F5F5] rounded-xl">
      <div className="flex items-center justify-between space-x-2">
        <div className="flex space-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full mt-3"
            style={{ backgroundColor: columnColors[title] }}
          ></div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="flex justify-center items-center bg-[#E0E0E0] text-[#625F6D] w-[20px] h-[20px] rounded-full text-[12px] mt-1">
            {taskCount}
          </div>
        </div>
        {title === "To Do" && (
          <Image
            src={AddButton}
            alt="AddButton"
            className="w-[24px] h-[24px] cursor-pointer hover:scale-125 duration-200"
            onClick={handleAddClick}
          />
        )}
      </div>
      <div
        className="h-2 mt-4 rounded-xl"
        style={{
          backgroundColor: columnColors[title],
          height: "3px",
        }}
      ></div>
      <div className="space-y-4 mt-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks</p>
        ) : (
          tasks.map((task) => <TaskCard key={task._id} {...task}/>)
        )}
      </div>
      {isModalOpen && <AddTaskModal onClose={handleCloseModal} />}
    </div>
  );
};

export default TaskColumn;
