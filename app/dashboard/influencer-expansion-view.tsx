"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function InfluencerExpansionView() {
  const [title, setTitle] = useState("")
  const [influencer, setInfluencer] = useState("")
  const [platform, setPlatform] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `[达人拓展] ${title}`,
          description: `达人: ${influencer}\n平台: ${platform}\n\n${description}`,
          status: "todo",
          priority,
          label: "influencer-expansion",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create task")
      }

      // Reset form
      setTitle("")
      setInfluencer("")
      setPlatform("")
      setDescription("")
      setPriority("medium")

      alert("达人拓展任务创建成功！")
    } catch (error) {
      console.error("Failed to create task:", error)
      alert("创建任务失败，请重试。")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full flex-1 flex-col gap-8 p-8 md:flex">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">达人拓展</h2>
          <p className="text-muted-foreground">创建新的达人拓展任务</p>
        </div>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>新建达人拓展任务</CardTitle>
          <CardDescription>
            填写以下信息以创建新的达人拓展任务
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">任务标题</Label>
                <Input
                  id="title"
                  placeholder="例如：联系抖音达人合作"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="influencer">达人名称</Label>
                <Input
                  id="influencer"
                  placeholder="达人的名称或账号"
                  value={influencer}
                  onChange={(e) => setInfluencer(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="platform">平台</Label>
                <Select
                  value={platform}
                  onValueChange={setPlatform}
                  disabled={loading}
                  required
                >
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="选择平台" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="抖音">抖音</SelectItem>
                    <SelectItem value="快手">快手</SelectItem>
                    <SelectItem value="小红书">小红书</SelectItem>
                    <SelectItem value="B站">B站</SelectItem>
                    <SelectItem value="微博">微博</SelectItem>
                    <SelectItem value="其他">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">任务详情</Label>
                <Textarea
                  id="description"
                  placeholder="描述拓展计划、合作内容、预期目标等..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                  rows={5}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="priority">优先级</Label>
                <Select
                  value={priority}
                  onValueChange={setPriority}
                  disabled={loading}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="选择优先级" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">低</SelectItem>
                    <SelectItem value="medium">中</SelectItem>
                    <SelectItem value="high">高</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setTitle("")
                  setInfluencer("")
                  setPlatform("")
                  setDescription("")
                  setPriority("medium")
                }}
                disabled={loading}
              >
                清空
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "创建中..." : "创建任务"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
