import { motion } from 'framer-motion'
import { BarChart3, Zap, Brain, Palette, Wrench } from 'lucide-react'
import type { CameraSettings } from '../App'

interface AdvancedSettingsProps {
  settings: CameraSettings
  onSettingsChange: (settings: Partial<CameraSettings>) => void
}

interface RadioGroupProps {
  label: string
  icon: React.ReactNode
  options: { value: string; label: string }[]
  selectedValue: string
  onChange: (value: string) => void
}

interface CheckboxGroupProps {
  label: string
  icon: React.ReactNode
  options: { key: string; label: string; icon: string }[]
  values: Record<string, boolean>
  onChange: (key: string, value: boolean) => void
}

const RadioGroup = ({ label, icon, options, selectedValue, onChange }: RadioGroupProps) => (
  <motion.div 
    className="glass-effect rounded-2xl p-6 border border-white/5"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    whileHover={{ y: -2 }}
  >
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h3 className="text-xl font-semibold text-white">{label}</h3>
    </div>
    
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <motion.label
          key={option.value}
          className={`
            relative cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden
            ${selectedValue === option.value
              ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/30'
              : 'bg-white/5 border border-white/10 text-gray-300 hover:border-neon-blue/50 hover:text-white'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <input
            type="radio"
            name={label}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ translateX: selectedValue === option.value ? '100%' : '-100%' }}
            transition={{ duration: 0.6, repeat: selectedValue === option.value ? Infinity : 0, repeatDelay: 2 }}
          />
          
          <span className="relative z-10">{option.label}</span>
        </motion.label>
      ))}
    </div>
  </motion.div>
)

const CheckboxGroup = ({ label, icon, options, values, onChange }: CheckboxGroupProps) => (
  <motion.div 
    className="glass-effect rounded-2xl p-6 border border-white/5"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    whileHover={{ y: -2 }}
  >
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h3 className="text-xl font-semibold text-white">{label}</h3>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {options.map((option) => (
        <motion.label
          key={option.key}
          className={`
            relative cursor-pointer p-4 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden flex items-center gap-3
            ${values[option.key]
              ? 'bg-gradient-to-r from-neon-purple to-neon-green text-white shadow-lg shadow-neon-purple/30'
              : 'bg-white/5 border border-white/10 text-gray-300 hover:border-neon-purple/50 hover:text-white'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input
            type="checkbox"
            checked={values[option.key]}
            onChange={(e) => onChange(option.key, e.target.checked)}
            className="sr-only"
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ translateX: values[option.key] ? '100%' : '-100%' }}
            transition={{ duration: 0.6, repeat: values[option.key] ? Infinity : 0, repeatDelay: 2 }}
          />
          
          <span className="text-lg">{option.icon}</span>
          <span className="relative z-10">{option.label}</span>
        </motion.label>
      ))}
    </div>
  </motion.div>
)

export const AdvancedSettings = ({ settings, onSettingsChange }: AdvancedSettingsProps) => {
  const resolutionOptions = [
    { value: 'hd', label: 'HD (1080p)' },
    { value: '4k', label: '4K Ultra' },
    { value: '8k', label: '8K Pro' },
    { value: '12k', label: '12K Cinema' }
  ]

  const fpsOptions = [
    { value: '24', label: '24 FPS' },
    { value: '30', label: '30 FPS' },
    { value: '60', label: '60 FPS' },
    { value: '120', label: '120 FPS' },
    { value: '240', label: '240 FPS' }
  ]

  const aiLevelOptions = [
    { value: 'off', label: 'إيقاف' },
    { value: 'basic', label: 'بسيط' },
    { value: 'advanced', label: 'متقدم' },
    { value: 'neural', label: 'شبكة عصبية' }
  ]

  const colorModeOptions = [
    { value: 'standard', label: 'قياسي' },
    { value: 'vibrant', label: 'مشرق' },
    { value: 'cinema', label: 'سينمائي' },
    { value: 'natural', label: 'طبيعي' }
  ]

  const featureOptions = [
    { key: 'hdr', label: 'HDR المتقدم', icon: '🌈' },
    { key: 'stabilization', label: 'تثبيت بصري', icon: '🎯' },
    { key: 'raw', label: 'تصوير RAW', icon: '📸' },
    { key: 'faceDetection', label: 'كشف الوجوه', icon: '😊' },
    { key: 'autoFocus', label: 'تركيز تلقائي', icon: '🎯' },
    { key: 'noiseReduction', label: 'تقليل الضوضاء', icon: '🔇' }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RadioGroup
          label="📊 الدقة والجودة"
          icon={<BarChart3 className="w-6 h-6 text-neon-blue" />}
          options={resolutionOptions}
          selectedValue={settings.resolution}
          onChange={(value) => onSettingsChange({ resolution: value as CameraSettings['resolution'] })}
        />

        <RadioGroup
          label="🎬 معدل الإطارات"
          icon={<Zap className="w-6 h-6 text-neon-purple" />}
          options={fpsOptions}
          selectedValue={settings.fps}
          onChange={(value) => onSettingsChange({ fps: value as CameraSettings['fps'] })}
        />

        <RadioGroup
          label="🧠 مستوى الذكاء الاصطناعي"
          icon={<Brain className="w-6 h-6 text-neon-green" />}
          options={aiLevelOptions}
          selectedValue={settings.aiLevel}
          onChange={(value) => onSettingsChange({ aiLevel: value as CameraSettings['aiLevel'] })}
        />

        <RadioGroup
          label="🎨 نمط الألوان"
          icon={<Palette className="w-6 h-6 text-neon-blue" />}
          options={colorModeOptions}
          selectedValue={settings.colorMode}
          onChange={(value) => onSettingsChange({ colorMode: value as CameraSettings['colorMode'] })}
        />
      </div>

      <CheckboxGroup
        label="🔧 الميزات الإضافية"
        icon={<Wrench className="w-6 h-6 text-neon-purple" />}
        options={featureOptions}
        values={settings.features}
        onChange={(key, value) => 
          onSettingsChange({ 
            features: { ...settings.features, [key]: value } 
          })
        }
      />
    </div>
  )
}