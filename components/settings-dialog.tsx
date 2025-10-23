'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { IconTrash, IconEdit, IconCheck, IconX, IconPlus } from '@tabler/icons-react'

interface LargeModel {
  id: string
  name: string
  apiUrl: string
  apiKey: string
}

interface CrawlerCookie {
  id: string
  platform: string
  cookie: string
}

interface SettingsDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  // Large Models
  const [models, setModels] = useState<LargeModel[]>([])
  const [editingModelId, setEditingModelId] = useState<string | null>(null)
  const [newModel, setNewModel] = useState({ name: '', apiUrl: '', apiKey: '' })

  // Crawler Cookies
  const [cookies, setCookies] = useState<CrawlerCookie[]>([])
  const [editingCookieId, setEditingCookieId] = useState<string | null>(null)
  const [newCookie, setNewCookie] = useState({ platform: '', cookie: '' })

  // Load settings from localStorage on mount
  useEffect(() => {
    if (isOpen) {
      const savedModels = localStorage.getItem('dcm_large_models')
      const savedCookies = localStorage.getItem('dcm_crawler_cookies')

      if (savedModels) {
        try {
          setModels(JSON.parse(savedModels))
        } catch (error) {
          console.error('Failed to parse models:', error)
        }
      }

      if (savedCookies) {
        try {
          setCookies(JSON.parse(savedCookies))
        } catch (error) {
          console.error('Failed to parse cookies:', error)
        }
      }
    }
  }, [isOpen])

  // Large Model Operations
  const handleAddModel = () => {
    if (!newModel.name.trim() || !newModel.apiUrl.trim() || !newModel.apiKey.trim()) {
      alert('请填写所有字段')
      return
    }

    const model: LargeModel = {
      id: Date.now().toString(),
      name: newModel.name,
      apiUrl: newModel.apiUrl,
      apiKey: newModel.apiKey,
    }

    const updatedModels = [...models, model]
    setModels(updatedModels)
    localStorage.setItem('dcm_large_models', JSON.stringify(updatedModels))

    setNewModel({ name: '', apiUrl: '', apiKey: '' })
    alert('大模型添加成功')
  }

  const handleUpdateModel = (id: string, field: keyof Omit<LargeModel, 'id'>, value: string) => {
    const updatedModels = models.map(model =>
      model.id === id ? { ...model, [field]: value } : model
    )
    setModels(updatedModels)
    localStorage.setItem('dcm_large_models', JSON.stringify(updatedModels))
  }

  const handleDeleteModel = (id: string) => {
    if (confirm('确定要删除这个大模型配置吗？')) {
      const updatedModels = models.filter(model => model.id !== id)
      setModels(updatedModels)
      localStorage.setItem('dcm_large_models', JSON.stringify(updatedModels))
    }
  }

  // Cookie Operations
  const handleAddCookie = () => {
    if (!newCookie.platform.trim() || !newCookie.cookie.trim()) {
      alert('请填写平台名称和Cookie')
      return
    }

    const cookie: CrawlerCookie = {
      id: Date.now().toString(),
      platform: newCookie.platform,
      cookie: newCookie.cookie,
    }

    const updatedCookies = [...cookies, cookie]
    setCookies(updatedCookies)
    localStorage.setItem('dcm_crawler_cookies', JSON.stringify(updatedCookies))

    setNewCookie({ platform: '', cookie: '' })
    alert('Cookie添加成功')
  }

  const handleUpdateCookie = (id: string, field: keyof Omit<CrawlerCookie, 'id'>, value: string) => {
    const updatedCookies = cookies.map(cookie =>
      cookie.id === id ? { ...cookie, [field]: value } : cookie
    )
    setCookies(updatedCookies)
    localStorage.setItem('dcm_crawler_cookies', JSON.stringify(updatedCookies))
  }

  const handleDeleteCookie = (id: string) => {
    if (confirm('确定要删除这个Cookie吗？')) {
      const updatedCookies = cookies.filter(cookie => cookie.id !== id)
      setCookies(updatedCookies)
      localStorage.setItem('dcm_crawler_cookies', JSON.stringify(updatedCookies))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>系统设置</DialogTitle>
          <DialogDescription>
            管理大模型API和爬虫Cookie配置
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="models" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="models">大模型配置</TabsTrigger>
            <TabsTrigger value="cookies">爬虫Cookie</TabsTrigger>
          </TabsList>

          {/* Large Models Tab */}
          <TabsContent value="models" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>添加新的大模型</CardTitle>
                <CardDescription>
                  配置新的大模型API连接
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-model-name">模型名称</Label>
                    <Input
                      id="new-model-name"
                      placeholder="例如：GPT-4、Claude、通义千问"
                      value={newModel.name}
                      onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-model-url">API URL</Label>
                    <Input
                      id="new-model-url"
                      placeholder="https://api.example.com/v1"
                      value={newModel.apiUrl}
                      onChange={(e) => setNewModel({ ...newModel, apiUrl: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-model-key">API Key</Label>
                    <Input
                      id="new-model-key"
                      type="password"
                      placeholder="sk-..."
                      value={newModel.apiKey}
                      onChange={(e) => setNewModel({ ...newModel, apiKey: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleAddModel} className="w-full">
                  <IconPlus className="mr-2 h-4 w-4" />
                  添加大模型
                </Button>
              </CardContent>
            </Card>

            {models.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>已配置的大模型 ({models.length})</CardTitle>
                  <CardDescription>
                    管理已添加的大模型配置
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {models.map((model) => (
                    <div key={model.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          {editingModelId === model.id ? (
                            <>
                              <div className="space-y-1">
                                <Label>模型名称</Label>
                                <Input
                                  value={model.name}
                                  onChange={(e) => handleUpdateModel(model.id, 'name', e.target.value)}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label>API URL</Label>
                                <Input
                                  value={model.apiUrl}
                                  onChange={(e) => handleUpdateModel(model.id, 'apiUrl', e.target.value)}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label>API Key</Label>
                                <Input
                                  type="password"
                                  value={model.apiKey}
                                  onChange={(e) => handleUpdateModel(model.id, 'apiKey', e.target.value)}
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <div className="text-sm font-medium mb-1">模型名称</div>
                                <div className="text-sm text-muted-foreground">{model.name}</div>
                              </div>
                              <div>
                                <div className="text-sm font-medium mb-1">API URL</div>
                                <div className="text-sm text-muted-foreground break-all">{model.apiUrl}</div>
                              </div>
                              <div>
                                <div className="text-sm font-medium mb-1">API Key</div>
                                <div className="text-sm text-muted-foreground">••••••••</div>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          {editingModelId === model.id ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingModelId(null)}
                              title="完成编辑"
                            >
                              <IconCheck className="h-4 w-4 text-green-600" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingModelId(model.id)}
                              title="编辑"
                            >
                              <IconEdit className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteModel(model.id)}
                            title="删除"
                            className="text-destructive hover:text-destructive"
                          >
                            <IconTrash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Cookies Tab */}
          <TabsContent value="cookies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>添加新Cookie</CardTitle>
                <CardDescription>
                  为不同平台添加爬虫Cookie
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-platform">平台名称</Label>
                    <Input
                      id="new-platform"
                      placeholder="例如：抖音、小红书、B站"
                      value={newCookie.platform}
                      onChange={(e) => setNewCookie({ ...newCookie, platform: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-cookie">Cookie内容</Label>
                    <Textarea
                      id="new-cookie"
                      placeholder="粘贴完整的Cookie字符串..."
                      value={newCookie.cookie}
                      onChange={(e) => setNewCookie({ ...newCookie, cookie: e.target.value })}
                      rows={4}
                    />
                  </div>
                </div>

                <Button onClick={handleAddCookie} className="w-full">
                  <IconPlus className="mr-2 h-4 w-4" />
                  添加Cookie
                </Button>
              </CardContent>
            </Card>

            {cookies.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>已保存的Cookie ({cookies.length})</CardTitle>
                  <CardDescription>
                    管理已添加的平台Cookie
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cookies.map((cookie) => (
                    <div key={cookie.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          {editingCookieId === cookie.id ? (
                            <>
                              <div className="space-y-1">
                                <Label>平台名称</Label>
                                <Input
                                  value={cookie.platform}
                                  onChange={(e) => handleUpdateCookie(cookie.id, 'platform', e.target.value)}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label>Cookie</Label>
                                <Textarea
                                  value={cookie.cookie}
                                  onChange={(e) => handleUpdateCookie(cookie.id, 'cookie', e.target.value)}
                                  rows={3}
                                  className="font-mono text-xs"
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <div className="text-sm font-medium mb-1">平台名称</div>
                                <div className="text-sm text-muted-foreground">{cookie.platform}</div>
                              </div>
                              <div>
                                <div className="text-sm font-medium mb-1">Cookie</div>
                                <div className="text-sm text-muted-foreground font-mono break-all line-clamp-2">
                                  {cookie.cookie}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          {editingCookieId === cookie.id ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingCookieId(null)}
                              title="完成编辑"
                            >
                              <IconCheck className="h-4 w-4 text-green-600" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingCookieId(cookie.id)}
                              title="编辑"
                            >
                              <IconEdit className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCookie(cookie.id)}
                            title="删除"
                            className="text-destructive hover:text-destructive"
                          >
                            <IconTrash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
