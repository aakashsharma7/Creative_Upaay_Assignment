import Connection from "@/database/config";
import Task from "@/models/task";

Connection();

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const priority = url.searchParams.get("priority");

    const query = priority && priority !== "All" ? { priority } : {}; 

    const tasks = await Task.find(query).exec();

    const organizedTasks = tasks.reduce((acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    }, {});

    return new Response(JSON.stringify(organizedTasks), { status: 200 });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return new Response(JSON.stringify({ message: "Error fetching tasks" }), { status: 500 });
  }
}
