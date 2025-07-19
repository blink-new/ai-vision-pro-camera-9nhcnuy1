import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface StatItemProps {
  value: number
  label: string
  suffix?: string
  delay: number
  color: string
}

const StatItem = ({ value, label, suffix = '', delay, color }: StatItemProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = value / 50
      const counter = setInterval(() => {
        setCount(prev => {
          if (prev >= value) {
            clearInterval(counter)
            return value
          }
          return Math.min(prev + increment, value)
        })
      }, 30)
      
      return () => clearInterval(counter)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <motion.div 
      className="glass-effect rounded-2xl p-6 text-center relative overflow-hidden group cursor-pointer border border-white/10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay / 1000, duration: 0.6 }}
      whileHover={{ 
        y: -5, 
        scale: 1.05,
        boxShadow: `0 20px 40px ${color}30`
      }}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Gradient border on hover */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
      />
      
      <motion.span 
        className={`text-4xl font-bold block mb-2 text-gradient`}
        key={count}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(45deg, ${color.replace('from-', 'hsl(var(--').replace(' to-', ')) 0%, hsl(var(--').replace(')', ')) 100%')}`,
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        {count.toFixed(value < 1 ? 3 : value < 10 ? 1 : 0)}{suffix}
      </motion.span>
      <span className="text-sm text-gray-300 font-medium relative z-10">{label}</span>

      {/* Pulsing dot indicator */}
      <motion.div
        className={`absolute top-3 right-3 w-2 h-2 rounded-full`}
        style={{ backgroundColor: color.includes('orange') ? 'hsl(var(--neon-orange))' : 
                                  color.includes('gold') ? 'hsl(var(--neon-gold))' :
                                  color.includes('emerald') ? 'hsl(var(--neon-emerald))' :
                                  'hsl(var(--neon-cyan))' }}
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}

export const StatsBar = () => {
  const stats = [
    { value: 99.9, label: 'دقة التعرف %', suffix: '', delay: 200, color: 'from-neon-orange to-neon-gold' },
    { value: 120, label: 'إطار/ثانية', suffix: '', delay: 400, color: 'from-neon-gold to-neon-emerald' },
    { value: 8, label: 'دقة K', suffix: 'K', delay: 600, color: 'from-neon-emerald to-neon-cyan' },
    { value: 0.001, label: 'زمن المعالجة (ثانية)', suffix: '', delay: 800, color: 'from-neon-cyan to-neon-magenta' }
  ]

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-6 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      {stats.map((stat, index) => (
        <StatItem
          key={index}
          value={stat.value}
          label={stat.label}
          suffix={stat.suffix}
          delay={stat.delay}
          color={stat.color}
        />
      ))}
    </motion.div>
  )
}