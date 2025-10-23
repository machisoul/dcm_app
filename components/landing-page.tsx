'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LoginModal } from '@/components/login-modal'
import { useAuthContext } from '@/components/auth-provider'
import { GalleryVerticalEnd } from 'lucide-react'

export function LandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { isAuthenticated } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="/dcm_logo.JPG"
        >
          <source src="/videos/gaming-background.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
        </video>
        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <a href="/" className="flex items-center gap-2 font-medium text-white">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-5" />
          </div>
          <span className="text-xl font-bold">大聪明 MCN</span>
        </a>

        <Button
          onClick={() => setIsLoginModalOpen(true)}
          variant="outline"
          className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
        >
          登录
        </Button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-12 text-center min-h-[calc(100vh-80px)]">
        <div className="max-w-4xl space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
            欢迎来到游戏世界
          </h1>

          <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg max-w-2xl mx-auto">
            探索无限可能，访问海量游戏资源，开启你的精彩旅程
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg shadow-2xl"
            >
              立即开始
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm px-8 py-6 text-lg"
            >
              了解更多
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-2">海量资源</h3>
              <p className="text-white/80">访问丰富的游戏内容和资源库</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-2">实时更新</h3>
              <p className="text-white/80">获取最新的游戏资讯和更新</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-2">社区互动</h3>
              <p className="text-white/80">与玩家社区分享和交流</p>
            </div>
          </div>
        </div>
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  )
}
