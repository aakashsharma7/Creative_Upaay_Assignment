import { ObjectId } from "mongodb";
import Connection from "@/database/config"; 
import Task from "@/models/task"; 

Connection();

export async function PUT(request) {
  try {
    
    const { taskId, newStatus } = await request.json();

    
    const objectId = new ObjectId(taskId);

    
    const updatedTask = await Task.findByIdAndUpdate(
      objectId, 
      { status: newStatus }, 
      { new: true } 
    );

    if (!updatedTask) {
      return new Response(
        JSON.stringify({ message: "Task not found" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(updatedTask), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating task status:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update task status" }),
      { status: 500 }
    );
  }
}
