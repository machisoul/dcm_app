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

export function ContentAnalysisView() {
  const [title, setTitle] = useState("")
  const [contentType, setContentType] = useState("")
  const [platform, setPlatform] = useState("")
  const [analysisGoal, setAnalysisGoal] = useState("")
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
          title: `[创作分析] ${title}`,
          description: `内容类型: ${contentType}\n平台: ${platform}\n分析目标: ${analysisGoal}\n\n${description}`,
          status: "todo",
          priority,
          label: "content-analysis",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create task")
      }

      // Reset form
      setTitle("")
      setContentType("")
      setPlatform("")
      setAnalysisGoal("")
      setDescription("")
      setPriority("medium")

      alert("创作分析任务创建成功！")
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
          <h2 className="text-2xl font-semibold tracking-tight">创作分析</h2>
          <p className="text-muted-foreground">创建新的创作分析任务</p>
        </div>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>新建创作分析任务</CardTitle>
          <CardDescription>
            填写以下信息以创建新的创作分析任务
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">任务标题</Label>
                <Input
                  id="title"
                  placeholder="例如：分析上月视频表现"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contentType">内容类型</Label>
                <Select
                  value={contentType}
                  onValueChange={setContentType}
                  disabled={loading}
                  required
                >
                  <SelectTrigger id="contentType">
                    <SelectValue placeholder="选择内容类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="短视频">短视频</SelectItem>
                    <SelectItem value="直播">直播</SelectItem>
                    <SelectItem value="图文">图文</SelectItem>
                    <SelectItem value="长视频">长视频</SelectItem>
                    <SelectItem value="综合">综合</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="全平台">全平台</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="analysisGoal">分析目标</Label>
                <Input
                  id="analysisGoal"
                  placeholder="例如：提升播放量、优化用户互动"
                  value={analysisGoal}
                  onChange={(e) => setAnalysisGoal(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">任务详情</Label>
                <Textarea
                  id="description"
                  placeholder="描述分析范围、关注指标、时间周期等..."
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
                  setContentType("")
                  setPlatform("")
                  setAnalysisGoal("")
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
