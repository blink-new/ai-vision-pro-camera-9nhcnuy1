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
      color: 'from-neon-orange to-neon-gold',
      isActive: true
    },
    {
      id: 'scene-analysis',
      icon: <Scan className="w-8 h-8" />,
      title: 'تحليل المشهد',
      description: 'فهم السياق والبيئة المحيطة',
      color: 'from-neon-gold to-neon-emerald',
      isActive: true
    },
    {
      id: 'color-enhancement',
      icon: <Palette className="w-8 h-8" />,
      title: 'تحسين الألوان',
      description: 'تعديل الألوان تلقائياً للحصول على أفضل نتيجة',
      color: 'from-neon-emerald to-neon-cyan',
      isActive: false
    },
    {
      id: 'smart-focus',
      icon: <Target className="w-8 h-8" />,
      title: 'تركيز ذكي',
      description: 'تركيز تلقائي على أهم العناصر',
      color: 'from-neon-cyan to-neon-magenta',
      isActive: true
    },
    {
      id: 'motion-tracking',
      icon: <Zap className="w-8 h-8" />,
      title: 'تتبع الحركة',
      description: 'متابعة الأهداف المتحركة بدقة عالية',
      color: 'from-neon-magenta to-neon-orange',
      isActive: false
    },
    {
      id: 'noise-reduction',
      icon: <Sparkles className="w-8 h-8" />,
      title: 'تقليل الضوضاء',
      description: 'إزالة التشويش وتحسين جودة الصورة',
      color: 'from-neon-orange to-neon-emerald',
      isActive: true
    },
    {
      id: 'neural-processing',
      icon: <Brain className="w-8 h-8" />,
      title: 'معالجة عصبية',
      description: 'تحسين الصور باستخدام الشبكات العصبية',
      color: 'from-neon-emerald to-neon-gold',
      isActive: true
    },
    {
      id: 'auto-composition',
      icon: <Camera className="w-8 h-8" />,
      title: 'تركيب تلقائي',
      description: 'اقتراح أفضل زوايا وتركيبات للصورة',
      color: 'from-neon-gold to-neon-cyan',
      isActive: false
    },
    {
      id: 'style-transfer',
      icon: <Image className="w-8 h-8" />,
      title: 'نقل الأسلوب',
      description: 'تطبيق أساليب فنية مختلفة على الصور',
      color: 'from-neon-cyan to-neon-magenta',
      isActive: false
    },
    {
      id: 'magic-enhance',
      icon: <Wand2 className="w-8 h-8" />,
      title: 'تحسين سحري',
      description: 'تحسين شامل بنقرة واحدة',
      color: 'from-neon-magenta to-neon-emerald',
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
              ? 'glass-effect border-2 border-neon-emerald shadow-lg shadow-neon-emerald/30' 
              : 'glass-effect border border-white/10 hover:border-neon-emerald/50'
            }
          `}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ 
            y: -8, 
            scale: 1.05,
            boxShadow: tool.isActive 
              ? '0 25px 50px rgba(16, 185, 129, 0.4)' 
              : '0 20px 40px rgba(16, 185, 129, 0.2)'
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
              className="absolute inset-0 bg-neon-emerald/10 rounded-2xl"
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

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl animate-shimmer opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent)',
              backgroundSize: '200% 100%'
            }}
          />
          
          <div className="relative z-10">
            <motion.div
              className="mb-4 flex justify-center"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`${
                tool.isActive ? 'text-neon-emerald' : 'text-gray-300'
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
              tool.isActive ? 'bg-neon-emerald' : 'bg-gray-500'
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

          {/* Active tool border animation */}
          {tool.isActive && (
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-neon-emerald"
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
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
      ))}
    </div>
  )
}