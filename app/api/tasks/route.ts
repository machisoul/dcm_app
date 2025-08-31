import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"
import { taskSchema } from "@/app/dashboard/tasks/data/schema"

export async function GET() {
  try {
    const data = await fs.readFile(path.join(process.cwd(), "app/dashboard/tasks/data/tasks.json"))
    const tasks = JSON.parse(data.toString())
    const validatedTasks = z.array(taskSchema).parse(tasks)
    
    return NextResponse.json(validatedTasks)
  } catch (error) {
    console.error("Failed to load tasks:", error)
    return NextResponse.json({ error: "Failed to load tasks" }, { status: 500 })
  }
}
