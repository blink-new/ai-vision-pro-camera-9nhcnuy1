import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Connection {
  id: number
  x1: number
  y1: number
  x2: number
  y2: number
  length: number
  angle: number
}

export const NeuralNetwork = () => {
  const [connections, setConnections] = useState<Connection[]>([])

  useEffect(() => {
    const newConnections: Connection[] = []
    
    // Create random neural network connections
    for (let i = 0; i < 25; i++) {
      const x1 = Math.random() * 100
      const y1 = Math.random() * 100
      const x2 = Math.random() * 100
      const y2 = Math.random() * 100
      
      const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
      const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)
      
      newConnections.push({
        id: i,
        x1,
        y1,
        x2,
        y2,
        length,
        angle
      })
    }
    
    setConnections(newConnections)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-8">
      <svg className="w-full h-full">
        {connections.map((connection) => (
          <motion.line
            key={connection.id}
            x1={`${connection.x1}%`}
            y1={`${connection.y1}%`}
            x2={`${connection.x2}%`}
            y2={`${connection.y2}%`}
            stroke="url(#newGradient)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              pathLength: { duration: 2.5, delay: connection.id * 0.1 },
              opacity: { 
                duration: 4, 
                delay: connection.id * 0.1,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        ))}
        
        <defs>
          <linearGradient id="newGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(251, 146, 60, 0.6)" />
            <stop offset="25%" stopColor="rgba(245, 158, 11, 0.6)" />
            <stop offset="50%" stopColor="rgba(16, 185, 129, 0.6)" />
            <stop offset="75%" stopColor="rgba(6, 182, 212, 0.6)" />
            <stop offset="100%" stopColor="rgba(192, 38, 211, 0.6)" />
          </linearGradient>
          
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(251, 146, 60, 0.8)" />
            <stop offset="100%" stopColor="rgba(245, 158, 11, 0.4)" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Neural nodes */}
      {connections.slice(0, 12).map((connection, index) => {
        const colors = [
          'rgba(251, 146, 60, 0.8)',   // neon-orange
          'rgba(245, 158, 11, 0.8)',   // neon-gold
          'rgba(16, 185, 129, 0.8)',   // neon-emerald
          'rgba(6, 182, 212, 0.8)',    // neon-cyan
          'rgba(192, 38, 211, 0.8)'    // neon-magenta
        ]
        const nodeColor = colors[index % colors.length]
        
        return (
          <motion.div
            key={`node-${connection.id}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${connection.x1}%`,
              top: `${connection.y1}%`,
              backgroundColor: nodeColor,
              boxShadow: `0 0 15px ${nodeColor}`
            }}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.3, 0.9, 0.3]
            }}
            transition={{
              duration: 3,
              delay: connection.id * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )
      })}

      {/* Larger pulsing nodes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`pulse-node-${i}`}
          className="absolute w-4 h-4 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'radial-gradient(circle, rgba(251, 146, 60, 0.6) 0%, rgba(245, 158, 11, 0.3) 100%)',
            filter: 'blur(1px)'
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}