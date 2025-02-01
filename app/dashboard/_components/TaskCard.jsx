"use client";
import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import Options from "../../../assets/TaskCard/options.png";
import MessageIcon from "../../../assets/TaskCard/messageicon.png";
import FolderIcon from "../../../assets/TaskCard/folder-2.png";

const TaskCard = ({ _id, taskName, description, priority, commentsCount, filesCount, collaborators }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: _id,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const priorityColors = {
    High: "bg-red-100 text-red-500",
    Mid: "bg-yellow-100 text-yellow-500",
    Low: "bg-green-100 text-green-500",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 bg-white shadow-lg rounded-xl space-y-2 cursor-grab"
    >
      <div className="flex justify-between relative">
        <span className={`px-2 py-1 text-sm font-semibold rounded ${priorityColors[priority]}`}>
          {priority}
        </span>
        <div>
          <button>
            <Image
              src={Options}
              alt="Options"
              className="w-[16px] h-[19px] object-contain mx-2 "
            />
          </button>
        </div>
      </div>

      <h3 className="text-[18px] font-bold">{taskName}</h3>
      <p className="text-[12px] text-[#787486]">{description}</p>
      <div className="flex justify-between items-center mt-2">
        <div className="flex -space-x-2">
          {collaborators.map((collab, index) => (
            <img
              key={index}
              src={collab.avatar}
              alt="avatar"
              className="w-[24px] h-[24px] rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
        <div className="flex text-gray-500 text-sm">
          <Image
            src={MessageIcon}
            alt="MessageIcon"
            className="w-[16px] h-[16px] mt-1 mx-2"
          />
          <p>{commentsCount} comments</p>
          <Image
            src={FolderIcon}
            alt="FolderIcon"
            className="w-[16px] h-[16px] mt-1 mx-2"
          />
          <p>{filesCount} files</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
