import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

export const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors = [
      'rgba(251, 146, 60, 0.6)',   // neon-orange
      'rgba(245, 158, 11, 0.6)',   // neon-gold
      'rgba(16, 185, 129, 0.6)',   // neon-emerald
      'rgba(6, 182, 212, 0.6)',    // neon-cyan
      'rgba(192, 38, 211, 0.6)'    // neon-magenta
    ]

    const newParticles: Particle[] = []
    
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 6
      })
    }
    
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.8, 0.2],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Additional larger glowing orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '12px',
            height: '12px',
            background: `linear-gradient(45deg, 
              rgba(251, 146, 60, 0.3), 
              rgba(245, 158, 11, 0.3), 
              rgba(16, 185, 129, 0.3)
            )`,
            filter: 'blur(2px)'
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0]
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}