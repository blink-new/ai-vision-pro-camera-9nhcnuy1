import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Settings, Zap, RotateCcw, Download, Share2, SwitchCamera, Video, Pause, Play } from 'lucide-react'
import type { PhotoMode, CameraType } from '../App'

interface ControlPanelProps {
  isProcessing: boolean
  onCapture: () => void
  selectedMode: PhotoMode
  cameraType: CameraType
  onCameraToggle: () => void
}

export const ControlPanel = ({ 
  isProcessing, 
  onCapture, 
  selectedMode, 
  cameraType, 
  onCameraToggle 
}: ControlPanelProps) => {
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
      color: 'from-neon-orange to-neon-gold',
      action: () => console.log('Settings')
    },
    {
      icon: Video,
      label: 'فيديو',
      color: 'from-neon-emerald to-neon-cyan',
      action: () => console.log('Video')
    },
    {
      icon: Download,
      label: 'تحميل',
      color: 'from-neon-cyan to-neon-magenta',
      action: () => console.log('Download')
    },
    {
      icon: Share2,
      label: 'مشاركة',
      color: 'from-neon-magenta to-neon-orange',
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
                hover:shadow-xl transition-all duration-300 relative overflow-hidden
              `}
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
              }}
              whileTap={{ scale: 0.9 }}
              onClick={button.action}
              title={button.label}
            >
              <Icon className="w-6 h-6 relative z-10" />
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          )
        })}
      </div>

      {/* Camera Switch Button */}
      <motion.button
        onClick={onCameraToggle}
        className={`
          w-16 h-16 rounded-full relative overflow-hidden
          ${cameraType === 'back' 
            ? 'bg-gradient-to-r from-neon-orange to-neon-gold' 
            : 'bg-gradient-to-r from-neon-gold to-neon-emerald'
          }
          flex items-center justify-center text-white shadow-2xl
          transition-all duration-500
        `}
        whileHover={{ 
          scale: 1.1,
          rotate: 180,
          boxShadow: cameraType === 'back'
            ? '0 15px 40px rgba(251, 146, 60, 0.5)'
            : '0 15px 40px rgba(245, 158, 11, 0.5)'
        }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={cameraType}
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            {cameraType === 'back' ? (
              <span className="text-2xl">📷</span>
            ) : (
              <span className="text-2xl">🤳</span>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Rotating border */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </motion.button>

      {/* Mode Indicator */}
      <motion.div 
        className="glass-effect rounded-full p-3 border border-white/20 relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-2xl relative z-10">{modeIcons[selectedMode]}</div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-orange/20 to-neon-gold/20 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Main Capture Button */}
      <motion.button
        className={`
          w-20 h-20 rounded-full relative overflow-hidden
          ${isProcessing 
            ? 'bg-gradient-to-r from-red-500 to-orange-500' 
            : 'bg-gradient-to-r from-neon-emerald to-neon-cyan'
          }
          flex items-center justify-center text-white shadow-2xl
          transition-all duration-300
        `}
        whileHover={{ 
          scale: 1.1,
          boxShadow: isProcessing 
            ? '0 15px 40px rgba(239, 68, 68, 0.5)'
            : '0 15px 40px rgba(16, 185, 129, 0.5)'
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

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 rounded-full animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            backgroundSize: '200% 100%'
          }}
        />
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

      {/* Camera Type Label */}
      <motion.div
        className="glass-effect rounded-full px-3 py-1 text-xs text-white/80 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {cameraType === 'back' ? 'خلفية' : 'أمامية'}
      </motion.div>
    </motion.div>
  )
}