"use client";
import React, { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";
import Design from "../../../assets/TaskSection/design.png";
import Menu from "../../../assets/TaskSection/menu.png";
import Image from "next/image";
import FilterDropdown from "./FilterButton";
import Calender from "../../../assets/TaskSection/calendar.png";
import Group from "../../../assets/TaskSection/group.png";
import { ChevronDown } from "lucide-react";

const TaskSection = () => {
  const [tasks, setTasks] = useState({
    "To Do": [],
    "In Progress": [],
    "Done": [],
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const queryParam = filter ? `${filter}` : "All";
        const response = await fetch(`/api/task/getalltask?priority=${queryParam}`);
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks({
          "To Do": data["To Do"] || [],
          "In Progress": data["In Progress"] || [],
          "Done": data["Done"] || [],
        });

        localStorage.setItem(
          "Tasks",
          JSON.stringify({
            "To Do": data["To Do"] || [],
            "In Progress": data["In Progress"] || [],
            "Done": data["Done"] || [],
          })
        );
      } catch (error) {
        console.error("Error fetching tasks:", error);
        const savedTasks = localStorage.getItem("kanbanTasks");
        if (savedTasks) setTasks(JSON.parse(savedTasks));
      }
    };

    fetchTasks();
  }, [filter]); 

  const handleDragEnd = async ({ active, over }) => {
    if (!over) return;

    const sourceColumn = Object.keys(tasks).find((key) =>
      tasks[key].some((task) => task._id === active.id)
    );
    const destinationColumn = over.id;

    if (sourceColumn && destinationColumn && sourceColumn !== destinationColumn) {
      const draggedTask = tasks[sourceColumn].find((task) => task._id === active.id);

      const updatedTasks = {
        ...tasks,
        [sourceColumn]: tasks[sourceColumn].filter((task) => task._id !== active.id),
        [destinationColumn]: [draggedTask, ...tasks[destinationColumn]],
      };

      setTasks(updatedTasks);
      localStorage.setItem("Tasks", JSON.stringify(updatedTasks));

      try {
        await fetch(`/api/task/updatetaskstatus`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskId: active.id,
            newStatus: destinationColumn,
          }),
        });
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between mb-8">
        <div className="flex justify-evenly space-x-5">
          <FilterDropdown filter={filter} setFilter={setFilter} />
          <button className="flex justify-between border py-1 px-4 rounded-md text-[#787486]">
            <Image
              src={Calender}
              alt="Calender"
              className="w-[16px] h-[16px] mt-2.5"
            />
            <p className="mt-1 mx-2 font-semibold">Today</p>
            <ChevronDown className="w-[38px] mt-1.5 ml-1" />
          </button>
        </div>
        <div className="flex justify-end space-x-5">
          <button className="flex justify-between border border-[#787486] py-1 px-4 rounded-md text-[#787486]">
            <Image
              src={Group}
              alt="Group"
              className="w-[16px] h-[16px] mt-2 mr-2"
            />
            <p className="mt-0.5 font-semibold">Share</p>
          </button>
          <div className="border-r border-[#787486] my-1" />
          <Image src={Design} alt="Design" className="w-[40px] h-[40px]" />
          <Image src={Menu} alt="Menu" className="w-[22px] h-[22px] mt-2" />
        </div>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {Object.keys(tasks).map((column) => (
            <SortableContext key={column} items={tasks[column]} strategy={rectSortingStrategy}>
              <TaskColumn
                id={column}
                title={column}
                tasks={tasks[column]}
                taskCount={tasks[column].length}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </>
  );
};

export default TaskSection;
