"use client"

import { useEffect, useState } from "react";
import { z } from "zod";

import { columns } from "@/components/columns";
import { DataTable } from "@/app/dashboard/tasks/data-table";
import { taskSchema } from "@/app/dashboard/tasks/data/schema";

export function TasksView() {
  const [tasks, setTasks] = useState<z.infer<typeof taskSchema>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const tasksData = await response.json();
        setTasks(tasksData);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex-1 flex-col gap-8 p-8 md:flex">
        <div className="flex items-center justify-center">
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex-1 flex-col gap-8 p-8 md:flex">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">Here&apos;s a list of your tasks for this month.</p>
        </div>
      </div>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
