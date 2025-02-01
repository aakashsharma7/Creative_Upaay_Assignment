"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select"; 
import "react-toastify/dist/ReactToastify.css";

const users = [
  { id: "1", name: "Aakash Sharma", avatar: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" },
  { id: "2", name: "Rani Sharma", avatar: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=" },
  { id: "3", name: "Himanshu Jain", avatar: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: "4", name: "Rachita Bhatt", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdflr0rt3RQ1QfegBnryx6c30jPdoLI9ATlFwrGaQaPnk78ZiiE2Vl-rAygmnqE_iFwuE&usqp=CAU" }
];


const Modal = ({ onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("To Do");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleTaskNameChange = (e) => setTaskName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);
  const handleDateChange = (e) => setDeadline(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

  const handleUserChange = (selectedOptions) => {
    setSelectedUsers(selectedOptions ? selectedOptions.map(option => ({
      id: option.value,
      name: option.label,
      avatar: option.avatar,
    })) : []);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      taskName,
      description,
      priority,
      scheduledDate: deadline,
      status,
      collaborators: selectedUsers,
    };

    try {
      const response = await fetch("/api/task/addnewtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error adding task:", errorData.message);
        return;
      }
      toast.success("Task added successfully!");
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("An error occurred while adding the task.");
    }
  };
  const userOptions = users.map(user => ({
    value: user.id,
    label: user.name,
    avatar: user.avatar
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-[600px] space-y-4">
        <h3 className="text-xl font-semibold">Add New Task</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={handleTaskNameChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter task name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter task description"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="flex justify-evenly">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Priority</label>
              <select
                value={priority}
                onChange={handlePriorityChange}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              >
                <option value="High">High</option>
                <option value="Mid">Mid</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={handleStatusChange}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Collaborators</label>
            <Select
              isMulti
              options={userOptions}
              value={userOptions.filter(option => selectedUsers.some(user => user.id === option.value))}
              onChange={handleUserChange}
              getOptionLabel={(e) => (
                <div className="flex items-center space-x-2">
                  <img src={e.avatar} alt={e.label} className="w-6 h-6 rounded-full" />
                  <span>{e.label}</span>
                </div>
              )}
              className="react-select"
              classNamePrefix="react-select"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={handleDateChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
