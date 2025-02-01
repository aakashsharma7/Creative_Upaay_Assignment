import { NextResponse } from "next/server";
import Connection from "@/database/config";
import Task from "@/models/task";

Connection();

export async function POST(req) {
  try {
    const body = await req.json(); 
    const { taskName, description, priority, scheduledDate, status, collaborators } = body;
    if (!taskName || !description || !priority || !scheduledDate || !status || !collaborators) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const task = await Task.create({
      taskName,
      description,
      priority,
      scheduledDate,
      status,
      collaborators, 
    });

    return NextResponse.json({ message: "Task added successfully", task }, { status: 201 });
  } catch (error) {
    console.error("Error adding task:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
