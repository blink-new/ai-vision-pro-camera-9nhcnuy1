import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Settings, Zap, RotateCcw, Download, Share2 } from 'lucide-react'
import type { PhotoMode } from '../App'

interface ControlPanelProps {
  isProcessing: boolean
  onCapture: () => void
  selectedMode: PhotoMode
}

export const ControlPanel = ({ isProcessing, onCapture, selectedMode }: ControlPanelProps) => {
  const modeIcons = {
    auto: '✨',
    portrait: '👤',
    landscape: '🌄',
    night: '🌙',
    macro: '🔬',
    cinema: '🎬',
    slowmo: '🎯',
    action: '⚡'
  }

  const controlButtons = [
    {
      icon: Settings,
      label: 'إعدادات',
      color: 'from-blue-500 to-purple-500',
      action: () => console.log('Settings')
    },
    {
      icon: RotateCcw,
      label: 'إعادة تعيين',
      color: 'from-yellow-500 to-orange-500',
      action: () => console.log('Reset')
    },
    {
      icon: Download,
      label: 'تحميل',
      color: 'from-green-500 to-emerald-500',
      action: () => console.log('Download')
    },
    {
      icon: Share2,
      label: 'مشاركة',
      color: 'from-pink-500 to-rose-500',
      action: () => console.log('Share')
    }
  ]

  return (
    <motion.div 
      className="fixed bottom-8 right-8 flex flex-col items-center gap-4 z-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      {/* Control Buttons */}
      <div className="flex flex-col gap-3">
        {controlButtons.map((button, index) => {
          const Icon = button.icon
          return (
            <motion.button
              key={index}
              className={`
                w-14 h-14 rounded-full bg-gradient-to-r ${button.color} 
                flex items-center justify-center text-white shadow-lg
                hover:shadow-xl transition-all duration-300
              `}
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
              }}
              whileTap={{ scale: 0.9 }}
              onClick={button.action}
              title={button.label}
            >
              <Icon className="w-6 h-6" />
            </motion.button>
          )
        })}
      </div>

      {/* Mode Indicator */}
      <motion.div 
        className="glass-effect rounded-full p-3 border border-white/20"
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-2xl">{modeIcons[selectedMode]}</div>
      </motion.div>

      {/* Main Capture Button */}
      <motion.button
        className={`
          w-20 h-20 rounded-full relative overflow-hidden
          ${isProcessing 
            ? 'bg-gradient-to-r from-orange-500 to-red-500' 
            : 'bg-gradient-to-r from-neon-blue to-neon-purple'
          }
          flex items-center justify-center text-white shadow-2xl
          transition-all duration-300
        `}
        whileHover={{ 
          scale: 1.1,
          boxShadow: isProcessing 
            ? '0 15px 40px rgba(255, 107, 107, 0.5)'
            : '0 15px 40px rgba(0, 212, 255, 0.5)'
        }}
        whileTap={{ scale: 0.95 }}
        onClick={onCapture}
        disabled={isProcessing}
      >
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Zap className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div
              key="camera"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <Camera className="w-8 h-8" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Processing animation */}
        {isProcessing && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-white/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Pulse effect when ready */}
        {!isProcessing && (
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.button>

      {/* Capture Status */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            className="glass-effect rounded-full px-4 py-2 text-sm text-white font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            جاري المعالجة...
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}