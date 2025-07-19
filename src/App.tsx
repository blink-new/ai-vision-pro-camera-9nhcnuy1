import { useState, useEffect } from 'react'
import { Camera, Settings, Zap, Brain, Target, Moon, Microscope, Film, Gauge, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { StatsBar } from './components/StatsBar'
import { PhotoModeGrid } from './components/PhotoModeGrid'
import { AdvancedSettings } from './components/AdvancedSettings'
import { AIToolsGrid } from './components/AIToolsGrid'
import { FloatingParticles } from './components/FloatingParticles'
import { NeuralNetwork } from './components/NeuralNetwork'
import { ControlPanel } from './components/ControlPanel'

export type PhotoMode = 'auto' | 'portrait' | 'landscape' | 'night' | 'macro' | 'cinema' | 'slowmo' | 'action'

export interface CameraSettings {
  resolution: 'hd' | '4k' | '8k' | '12k'
  fps: '24' | '30' | '60' | '120' | '240'
  aiLevel: 'off' | 'basic' | 'advanced' | 'neural'
  colorMode: 'standard' | 'vibrant' | 'cinema' | 'natural'
  features: {
    hdr: boolean
    stabilization: boolean
    raw: boolean
    faceDetection: boolean
    autoFocus: boolean
    noiseReduction: boolean
  }
}

function App() {
  const [selectedMode, setSelectedMode] = useState<PhotoMode>('auto')
  const [isProcessing, setIsProcessing] = useState(false)
  const [settings, setSettings] = useState<CameraSettings>({
    resolution: '8k',
    fps: '60',
    aiLevel: 'neural',
    colorMode: 'vibrant',
    features: {
      hdr: true,
      stabilization: true,
      raw: true,
      faceDetection: true,
      autoFocus: true,
      noiseReduction: true
    }
  })

  const handleCapture = () => {
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
    }, 2000)
  }

  const handleModeChange = (mode: PhotoMode) => {
    setSelectedMode(mode)
  }

  const handleSettingsChange = (newSettings: Partial<CameraSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  return (
    <div className="min-h-screen relative overflow-hidden" dir="rtl">
      {/* Background Effects */}
      <FloatingParticles />
      <NeuralNetwork />
      
      {/* Status Bar */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue to-neon-purple z-50 ${
          isProcessing ? 'opacity-100' : 'opacity-0'
        }`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isProcessing ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="text-6xl md:text-8xl font-black mb-4 text-gradient animate-glow"
            whileHover={{ scale: 1.05 }}
          >
            🎯 AI Vision Pro
          </motion.div>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 font-light mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            نظام التصوير الذكي الثوري | تقنية الذكاء الاصطناعي المتقدمة
          </motion.p>
          
          <StatsBar />
        </motion.header>

        {/* Photography Modes Section */}
        <motion.section 
          className="glass-effect rounded-3xl p-8 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          whileHover={{ y: -2 }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-t-3xl" />
          
          <motion.h2 
            className="text-3xl font-bold mb-6 flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Brain className="text-4xl text-neon-blue" />
            أوضاع التصوير الذكي المتطورة
          </motion.h2>
          
          <PhotoModeGrid 
            selectedMode={selectedMode}
            onModeChange={handleModeChange}
          />
        </motion.section>

        {/* Advanced Settings Section */}
        <motion.section 
          className="glass-effect rounded-3xl p-8 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          whileHover={{ y: -2 }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-purple to-neon-green rounded-t-3xl" />
          
          <motion.h2 
            className="text-3xl font-bold mb-6 flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Settings className="text-4xl text-neon-purple" />
            الإعدادات المتقدمة
          </motion.h2>
          
          <AdvancedSettings 
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
        </motion.section>

        {/* AI Tools Section */}
        <motion.section 
          className="glass-effect rounded-3xl p-8 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          whileHover={{ y: -2 }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-green to-neon-blue rounded-t-3xl" />
          
          <motion.h2 
            className="text-3xl font-bold mb-6 flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Zap className="text-4xl text-neon-green" />
            أدوات الذكاء الاصطناعي المتطورة
          </motion.h2>
          
          <AIToolsGrid />
        </motion.section>
      </div>

      {/* Floating Control Panel */}
      <ControlPanel 
        isProcessing={isProcessing}
        onCapture={handleCapture}
        selectedMode={selectedMode}
      />
    </div>
  )
}

export default App