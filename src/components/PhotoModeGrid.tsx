import { motion } from 'framer-motion'
import { Sparkles, User, Mountain, Moon, Microscope, Film, Target, Zap } from 'lucide-react'
import type { PhotoMode } from '../App'

interface PhotoModeGridProps {
  selectedMode: PhotoMode
  onModeChange: (mode: PhotoMode) => void
}

const modes = [
  {
    id: 'auto' as PhotoMode,
    icon: Sparkles,
    title: 'تلقائي ذكي',
    description: 'يحلل المشهد تلقائياً ويختار الإعدادات المثلى',
    color: 'from-neon-orange to-neon-gold'
  },
  {
    id: 'portrait' as PhotoMode,
    icon: User,
    title: 'بورتريه AI',
    description: 'تقنية عزل الخلفية بالذكاء الاصطناعي',
    color: 'from-neon-gold to-neon-emerald'
  },
  {
    id: 'landscape' as PhotoMode,
    icon: Mountain,
    title: 'مناظر طبيعية',
    description: 'تحسين الألوان والتفاصيل للمناظر الطبيعية',
    color: 'from-neon-emerald to-neon-cyan'
  },
  {
    id: 'night' as PhotoMode,
    icon: Moon,
    title: 'ليلي متقدم',
    description: 'تقنية الرؤية الليلية المحسنة',
    color: 'from-neon-cyan to-neon-magenta'
  },
  {
    id: 'macro' as PhotoMode,
    icon: Microscope,
    title: 'ماكرو دقيق',
    description: 'تفاصيل فائقة الدقة للأشياء الصغيرة',
    color: 'from-neon-magenta to-neon-orange'
  },
  {
    id: 'cinema' as PhotoMode,
    icon: Film,
    title: 'سينمائي',
    description: 'جودة احترافية للأفلام والمحتوى',
    color: 'from-neon-orange to-neon-emerald'
  },
  {
    id: 'slowmo' as PhotoMode,
    icon: Target,
    title: 'حركة بطيئة',
    description: 'تصوير بطيء عالي الجودة',
    color: 'from-neon-cyan to-neon-gold'
  },
  {
    id: 'action' as PhotoMode,
    icon: Zap,
    title: 'رياضي',
    description: 'تتبع الحركة السريعة والرياضة',
    color: 'from-neon-emerald to-neon-magenta'
  }
]

export const PhotoModeGrid = ({ selectedMode, onModeChange }: PhotoModeGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {modes.map((mode, index) => {
        const Icon = mode.icon
        const isSelected = selectedMode === mode.id
        
        return (
          <motion.div
            key={mode.id}
            className={`
              relative p-6 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden
              ${isSelected 
                ? 'glass-effect border-2 border-neon-orange shadow-lg shadow-neon-orange/30' 
                : 'glass-effect border border-white/10 hover:border-neon-orange/50'
              }
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ 
              y: -5, 
              scale: 1.02,
              boxShadow: isSelected 
                ? '0 20px 40px rgba(251, 146, 60, 0.4)' 
                : '0 15px 30px rgba(251, 146, 60, 0.2)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onModeChange(mode.id)}
          >
            {/* Background gradient effect */}
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-0 transition-opacity duration-300`}
              animate={{ opacity: isSelected ? 0.15 : 0 }}
            />
            
            {/* Ripple effect on click */}
            <motion.div
              className="absolute inset-0 bg-neon-orange/20 rounded-2xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 0.3 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl animate-shimmer opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(251, 146, 60, 0.1), transparent)',
                backgroundSize: '200% 100%'
              }}
            />
            
            <div className="relative z-10 text-center">
              <motion.div
                className="mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Icon 
                  className={`w-12 h-12 mx-auto ${
                    isSelected ? 'text-neon-orange' : 'text-gray-300'
                  }`} 
                />
              </motion.div>
              
              <h3 className={`text-lg font-semibold mb-2 ${
                isSelected ? 'text-white' : 'text-gray-200'
              }`}>
                {mode.title}
              </h3>
              
              <p className="text-sm text-gray-400 leading-relaxed">
                {mode.description}
              </p>
            </div>
            
            {/* Selection indicator */}
            {isSelected && (
              <motion.div
                className="absolute top-2 right-2 w-3 h-3 bg-neon-orange rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Pulsing border for selected mode */}
            {isSelected && (
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-neon-orange"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}