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
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'portrait' as PhotoMode,
    icon: User,
    title: 'بورتريه AI',
    description: 'تقنية عزل الخلفية بالذكاء الاصطناعي',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'landscape' as PhotoMode,
    icon: Mountain,
    title: 'مناظر طبيعية',
    description: 'تحسين الألوان والتفاصيل للمناظر الطبيعية',
    color: 'from-green-500 to-blue-500'
  },
  {
    id: 'night' as PhotoMode,
    icon: Moon,
    title: 'ليلي متقدم',
    description: 'تقنية الرؤية الليلية المحسنة',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'macro' as PhotoMode,
    icon: Microscope,
    title: 'ماكرو دقيق',
    description: 'تفاصيل فائقة الدقة للأشياء الصغيرة',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'cinema' as PhotoMode,
    icon: Film,
    title: 'سينمائي',
    description: 'جودة احترافية للأفلام والمحتوى',
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'slowmo' as PhotoMode,
    icon: Target,
    title: 'حركة بطيئة',
    description: 'تصوير بطيء عالي الجودة',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'action' as PhotoMode,
    icon: Zap,
    title: 'رياضي',
    description: 'تتبع الحركة السريعة والرياضة',
    color: 'from-orange-500 to-red-500'
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
                ? 'glass-effect border-2 border-neon-blue shadow-lg shadow-neon-blue/30' 
                : 'glass-effect border border-white/10 hover:border-neon-blue/50'
              }
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ 
              y: -5, 
              scale: 1.02,
              boxShadow: isSelected 
                ? '0 20px 40px rgba(0, 212, 255, 0.4)' 
                : '0 15px 30px rgba(0, 212, 255, 0.2)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onModeChange(mode.id)}
          >
            {/* Background gradient effect */}
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-0 transition-opacity duration-300`}
              animate={{ opacity: isSelected ? 0.1 : 0 }}
            />
            
            {/* Ripple effect on click */}
            <motion.div
              className="absolute inset-0 bg-neon-blue/20 rounded-2xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 0.3 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            <div className="relative z-10 text-center">
              <motion.div
                className="mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Icon 
                  className={`w-12 h-12 mx-auto ${
                    isSelected ? 'text-neon-blue' : 'text-gray-300'
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
                className="absolute top-2 right-2 w-3 h-3 bg-neon-blue rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}