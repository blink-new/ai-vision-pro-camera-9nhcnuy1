import { useState, useEffect } from 'react'
import { Camera, Settings, Zap, Brain, Target, Moon, Microscope, Film, Gauge, Sparkles, RotateCcw, SwitchCamera } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { StatsBar } from './components/StatsBar'
import { PhotoModeGrid } from './components/PhotoModeGrid'
import { AdvancedSettings } from './components/AdvancedSettings'
import { AIToolsGrid } from './components/AIToolsGrid'
import { FloatingParticles } from './components/FloatingParticles'
import { NeuralNetwork } from './components/NeuralNetwork'
import { ControlPanel } from './components/ControlPanel'

export type PhotoMode = 'auto' | 'portrait' | 'landscape' | 'night' | 'macro' | 'cinema' | 'slowmo' | 'action'
export type CameraType = 'back' | 'front'

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
  const [cameraType, setCameraType] = useState<CameraType>('back')
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

  const toggleCamera = () => {
    setCameraType(prev => prev === 'back' ? 'front' : 'back')
  }

  return (
    <div className="min-h-screen relative overflow-hidden" dir="rtl">
      {/* Background Effects */}
      <FloatingParticles />
      <NeuralNetwork />
      
      {/* Status Bar */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-orange to-neon-gold z-50 ${
          isProcessing ? 'opacity-100' : 'opacity-0'
        }`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isProcessing ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Camera Switch Buttons */}
      <motion.div 
        className="fixed top-8 left-8 flex gap-3 z-40"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.button
          onClick={toggleCamera}
          className={`
            w-16 h-16 rounded-2xl glass-effect border-2 transition-all duration-300
            flex items-center justify-center text-2xl font-bold
            ${cameraType === 'back' 
              ? 'border-neon-orange text-neon-orange shadow-lg shadow-neon-orange/30' 
              : 'border-white/20 text-white/70 hover:border-neon-orange/50'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📷
        </motion.button>
        
        <motion.button
          onClick={toggleCamera}
          className={`
            w-16 h-16 rounded-2xl glass-effect border-2 transition-all duration-300
            flex items-center justify-center text-2xl font-bold
            ${cameraType === 'front' 
              ? 'border-neon-gold text-neon-gold shadow-lg shadow-neon-gold/30' 
              : 'border-white/20 text-white/70 hover:border-neon-gold/50'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🤳
        </motion.button>

        {/* Camera Switch Icon */}
        <motion.button
          onClick={toggleCamera}
          className="w-16 h-16 rounded-2xl glass-effect border border-white/20 
                     flex items-center justify-center text-white hover:border-neon-cyan/50
                     hover:text-neon-cyan transition-all duration-300"
          whileHover={{ scale: 1.05, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
        >
          <SwitchCamera className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Camera Type Indicator */}
      <motion.div 
        className="fixed top-8 right-8 glass-effect rounded-2xl px-6 py-3 z-40"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            cameraType === 'back' ? 'bg-neon-orange' : 'bg-neon-gold'
          } animate-pulse`} />
          <span className="text-white font-medium">
            {cameraType === 'back' ? 'كاميرا خلفية' : 'كاميرا أمامية'}
          </span>
        </div>
      </motion.div>

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
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-orange to-neon-gold rounded-t-3xl" />
          
          <motion.h2 
            className="text-3xl font-bold mb-6 flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Brain className="text-4xl text-neon-orange" />
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
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-gold to-neon-emerald rounded-t-3xl" />
          
          <motion.h2 
            className="text-3xl font-bold mb-6 flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Settings className="text-4xl text-neon-gold" />
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
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-emerald to-neon-cyan rounded-t-3xl" />
          
          <motion.h2 
            className="text-3xl font-bold mb-6 flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Zap className="text-4xl text-neon-emerald" />
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
        cameraType={cameraType}
        onCameraToggle={toggleCamera}
      />
    </div>
  )
}

export default App