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
    for (let i = 0; i < 20; i++) {
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
    <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
      <svg className="w-full h-full">
        {connections.map((connection) => (
          <motion.line
            key={connection.id}
            x1={`${connection.x1}%`}
            y1={`${connection.y1}%`}
            x2={`${connection.x2}%`}
            y2={`${connection.y2}%`}
            stroke="url(#gradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{
              pathLength: { duration: 2, delay: connection.id * 0.1 },
              opacity: { 
                duration: 3, 
                delay: connection.id * 0.1,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        ))}
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 212, 255, 0.8)" />
            <stop offset="50%" stopColor="rgba(184, 71, 255, 0.8)" />
            <stop offset="100%" stopColor="rgba(0, 255, 136, 0.8)" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Neural nodes */}
      {connections.slice(0, 10).map((connection) => (
        <motion.div
          key={`node-${connection.id}`}
          className="absolute w-2 h-2 bg-neon-blue rounded-full"
          style={{
            left: `${connection.x1}%`,
            top: `${connection.y1}%`,
            boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)'
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 2,
            delay: connection.id * 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}