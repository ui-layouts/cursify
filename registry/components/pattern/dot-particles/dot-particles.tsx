"use client"

import { useEffect, useRef, useCallback } from "react"

interface DotParticleCanvasProps {
  backgroundColor?: string
  particleColor?: string
  animationSpeed?: number
}

const DotParticleCanvas = ({
  backgroundColor = "#F5F3F0",
  particleColor = "100, 100, 100",
  animationSpeed = 0.006,
}: DotParticleCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestIdRef = useRef<number | null>(null)
  const timeRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const dprRef = useRef<number>(1)
  const particles = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
      size: number
      angle: number
      speed: number
    }>
  >([])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    dprRef.current = dpr

    const displayWidth = window.innerWidth
    const displayHeight = window.innerHeight

    // Set the actual size in memory (scaled up for high DPI)
    canvas.width = displayWidth * dpr
    canvas.height = displayHeight * dpr

    // Scale the canvas back down using CSS
    canvas.style.width = displayWidth + "px"
    canvas.style.height = displayHeight + "px"

    // Scale the drawing context so everything draws at the correct size
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.scale(dpr, dpr)
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }, [])

  const handleMouseDown = useCallback((e: MouseEvent) => {
    mouseRef.current.isDown = true
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Create beautiful particle burst at click location
    const numParticles = 25 + Math.random() * 15 // 25-40 particles

    for (let i = 0; i < numParticles; i++) {
      const angle = (Math.PI * 2 * i) / numParticles + (Math.random() - 0.5) * 0.5
      const speed = 2 + Math.random() * 4
      const size = 1 + Math.random() * 3

      particles.current.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 2000 + Math.random() * 3000,
        size: size,
        angle: angle,
        speed: speed,
      })
    }

    // Add some slower, larger particles for variety
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.5 + Math.random() * 1.5

      particles.current.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 4000 + Math.random() * 2000,
        size: 2 + Math.random() * 2,
        angle: angle,
        speed: speed,
      })
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    timeRef.current += animationSpeed

    // Use CSS pixel dimensions for calculations
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    // Clear with clean background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)

    // Update and draw particles
    particles.current = particles.current.filter((particle) => {
      particle.life += 16 // Assuming 60fps
      particle.x += particle.vx
      particle.y += particle.vy

      // Apply gentle physics
      particle.vy += 0.02 // Subtle gravity
      particle.vx *= 0.995 // Air resistance
      particle.vy *= 0.995

      // Add some organic movement
      const organicX = Math.sin(timeRef.current + particle.angle) * 0.3
      const organicY = Math.cos(timeRef.current + particle.angle * 0.7) * 0.2
      particle.x += organicX
      particle.y += organicY

      // Calculate alpha and size based on life
      const lifeProgress = particle.life / particle.maxLife
      const alpha = Math.max(0, (1 - lifeProgress) * 0.8)
      const currentSize = particle.size * (1 - lifeProgress * 0.3)

      // Draw crisp particle
      if (alpha > 0) {
        ctx.fillStyle = `rgba(${particleColor}, ${alpha})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize, 0, 2 * Math.PI)
        ctx.fill()
      }

      return (
        particle.life < particle.maxLife &&
        particle.x > -50 &&
        particle.x < width + 50 &&
        particle.y > -50 &&
        particle.y < height + 50
      )
    })

    requestIdRef.current = requestAnimationFrame(animate)
  }, [backgroundColor, particleColor, animationSpeed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    resizeCanvas()

    const handleResize = () => resizeCanvas()

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseup", handleMouseUp)

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mouseup", handleMouseUp)

      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current)
        requestIdRef.current = null
      }
      timeRef.current = 0
      particles.current = []
    }
  }, [animate, resizeCanvas, handleMouseMove, handleMouseDown, handleMouseUp])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ backgroundColor }}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default DotParticleCanvas
