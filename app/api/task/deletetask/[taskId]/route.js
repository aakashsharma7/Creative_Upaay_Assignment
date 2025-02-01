import { NextResponse } from "next/server";
import Connection from "@/database/config"; 
import Task from "@/models/task"; 

Connection();

export async function DELETE(req, { params }) {
  const { taskId } = params; 

  try {
    if (!taskId) {
      return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
    }
    const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
