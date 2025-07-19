import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Eye, 
  Scan, 
  Palette, 
  Zap, 
  Target, 
  Sparkles, 
  Brain, 
  Camera,
  Image,
  Wand2
} from 'lucide-react'

interface AITool {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  color: string
  isActive: boolean
}

export const AIToolsGrid = () => {
  const [tools, setTools] = useState<AITool[]>([
    {
      id: 'object-detection',
      icon: <Eye className="w-8 h-8" />,
      title: 'كشف الكائنات',
      description: 'تحديد وتتبع الكائنات في الوقت الفعلي',
      color: 'from-blue-500 to-cyan-500',
      isActive: true
    },
    {
      id: 'scene-analysis',
      icon: <Scan className="w-8 h-8" />,
      title: 'تحليل المشهد',
      description: 'فهم السياق والبيئة المحيطة',
      color: 'from-purple-500 to-pink-500',
      isActive: true
    },
    {
      id: 'color-enhancement',
      icon: <Palette className="w-8 h-8" />,
      title: 'تحسين الألوان',
      description: 'تعديل الألوان تلقائياً للحصول على أفضل نتيجة',
      color: 'from-green-500 to-emerald-500',
      isActive: false
    },
    {
      id: 'smart-focus',
      icon: <Target className="w-8 h-8" />,
      title: 'تركيز ذكي',
      description: 'تركيز تلقائي على أهم العناصر',
      color: 'from-orange-500 to-red-500',
      isActive: true
    },
    {
      id: 'motion-tracking',
      icon: <Zap className="w-8 h-8" />,
      title: 'تتبع الحركة',
      description: 'متابعة الأهداف المتحركة بدقة عالية',
      color: 'from-yellow-500 to-orange-500',
      isActive: false
    },
    {
      id: 'noise-reduction',
      icon: <Sparkles className="w-8 h-8" />,
      title: 'تقليل الضوضاء',
      description: 'إزالة التشويش وتحسين جودة الصورة',
      color: 'from-indigo-500 to-purple-500',
      isActive: true
    },
    {
      id: 'neural-processing',
      icon: <Brain className="w-8 h-8" />,
      title: 'معالجة عصبية',
      description: 'تحسين الصور باستخدام الشبكات العصبية',
      color: 'from-pink-500 to-rose-500',
      isActive: true
    },
    {
      id: 'auto-composition',
      icon: <Camera className="w-8 h-8" />,
      title: 'تركيب تلقائي',
      description: 'اقتراح أفضل زوايا وتركيبات للصورة',
      color: 'from-teal-500 to-cyan-500',
      isActive: false
    },
    {
      id: 'style-transfer',
      icon: <Image className="w-8 h-8" />,
      title: 'نقل الأسلوب',
      description: 'تطبيق أساليب فنية مختلفة على الصور',
      color: 'from-violet-500 to-purple-500',
      isActive: false
    },
    {
      id: 'magic-enhance',
      icon: <Wand2 className="w-8 h-8" />,
      title: 'تحسين سحري',
      description: 'تحسين شامل بنقرة واحدة',
      color: 'from-emerald-500 to-teal-500',
      isActive: true
    }
  ])

  const toggleTool = (id: string) => {
    setTools(prev => prev.map(tool => 
      tool.id === id ? { ...tool, isActive: !tool.isActive } : tool
    ))
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {tools.map((tool, index) => (
        <motion.div
          key={tool.id}
          className={`
            relative p-6 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden text-center
            ${tool.isActive 
              ? 'glass-effect border-2 border-neon-green shadow-lg shadow-neon-green/30' 
              : 'glass-effect border border-white/10 hover:border-neon-green/50'
            }
          `}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ 
            y: -8, 
            scale: 1.05,
            boxShadow: tool.isActive 
              ? '0 25px 50px rgba(0, 255, 136, 0.4)' 
              : '0 20px 40px rgba(0, 255, 136, 0.2)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleTool(tool.id)}
        >
          {/* Background gradient effect */}
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 transition-opacity duration-300`}
            animate={{ opacity: tool.isActive ? 0.15 : 0 }}
          />
          
          {/* Pulse effect for active tools */}
          {tool.isActive && (
            <motion.div
              className="absolute inset-0 bg-neon-green/10 rounded-2xl"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
          
          <div className="relative z-10">
            <motion.div
              className="mb-4 flex justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`${
                tool.isActive ? 'text-neon-green' : 'text-gray-300'
              }`}>
                {tool.icon}
              </div>
            </motion.div>
            
            <h3 className={`text-lg font-semibold mb-2 ${
              tool.isActive ? 'text-white' : 'text-gray-200'
            }`}>
              {tool.title}
            </h3>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              {tool.description}
            </p>
          </div>
          
          {/* Status indicator */}
          <motion.div
            className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
              tool.isActive ? 'bg-neon-green' : 'bg-gray-500'
            }`}
            animate={{ 
              scale: tool.isActive ? [1, 1.2, 1] : 1,
              opacity: tool.isActive ? [1, 0.7, 1] : 0.5
            }}
            transition={{ 
              duration: 1.5,
              repeat: tool.isActive ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
          
          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
            whileHover={{ translateX: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      ))}
    </div>
  )
}