"use client"

import { useEffect, useRef, useCallback } from "react"

interface FlowingPatternProps {
  backgroundColor?: string
  lineColor?: string
  particleColor?: string
  animationSpeed?: number
}

const FlowingDots = ({
  backgroundColor = "#F0EEE6",
  lineColor = "80, 80, 80",
  particleColor = "80, 80, 80",
  animationSpeed = 0.005,
}: FlowingPatternProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef = useRef<number>(0)
  const animationFrameId = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const flowPointsRef = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      angle: number
      phase: number
      noiseOffset: number
      originalX: number
      originalY: number
    }>
  >([])
  const noise = (x: number, y: number, t: number): number => {
    const sin1 = Math.sin(x * 0.01 + t)
    const sin2 = Math.sin(y * 0.01 + t * 0.8)
    const sin3 = Math.sin((x + y) * 0.005 + t * 1.2)
    return (sin1 + sin2 + sin3) / 3
  }

  const getMouseInfluence = (x: number, y: number): number => {
    const dx = x - mouseRef.current.x
    const dy = y - mouseRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 150
    return Math.max(0, 1 - distance / maxDistance)
  }

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const dpr = window.devicePixelRatio || 1;
  
    // Use parent element’s size instead of window size
    const rect = canvas.parentElement?.getBoundingClientRect();
    const displayWidth = rect?.width ?? window.innerWidth;
    const displayHeight = rect?.height ?? window.innerHeight;
  
    // Set internal pixel resolution
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
  
    // Set CSS size
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
  
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
      ctx.scale(dpr, dpr);
    }
  
    // Reinitialize flow points
    const gridSize = 12;
    flowPointsRef.current = [];
  
    for (let x = gridSize / 2; x < displayWidth; x += gridSize) {
      for (let y = gridSize / 2; y < displayHeight; y += gridSize) {
        flowPointsRef.current.push({
          x,
          y,
          vx: 0,
          vy: 0,
          angle: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
          noiseOffset: Math.random() * 1000,
          originalX: x,
          originalY: y,
        });
      }
    }
  }, []);
  

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const newX = e.clientX - rect.left
    const newY = e.clientY - rect.top

    mouseRef.current.x = newX
    mouseRef.current.y = newY
  }, [])

  const handleMouseDown = useCallback((e: MouseEvent) => {
    mouseRef.current.isDown = true
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

    // Clear with slight transparency for trailing effect
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw flow points
    flowPointsRef.current.forEach((point) => {
      // Calculate noise-based flow
      const noiseValue = noise(point.x, point.y, timeRef.current)
      const angle = noiseValue * Math.PI * 4

      // Simple mouse influence
      const dx = mouseRef.current.x - point.x
      const dy = mouseRef.current.y - point.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 150) {
        const pushFactor = (1 - dist / 150) * 0.5
        point.vx += (dx / dist) * pushFactor
        point.vy += (dy / dist) * pushFactor
      }

      // Flow field influence
      point.vx += Math.cos(angle) * 0.1
      point.vy += Math.sin(angle) * 0.1

      // Damping
      point.vx *= 0.95
      point.vy *= 0.95

      // Update position for next frame
      const nextX = point.x + point.vx
      const nextY = point.y + point.vy

      // Draw line
      ctx.beginPath()
      ctx.moveTo(point.x, point.y)
      ctx.lineTo(nextX, nextY)

      // Simple styling
      const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy)
      const alpha = Math.min(0.8, speed * 8 + 0.3)

      // ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`
      // ctx.lineWidth = 1
      // ctx.stroke()

      // Draw a bigger and more visible dot at the point
      ctx.beginPath()
      ctx.arc(point.x, point.y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${particleColor}, ${alpha})`
      ctx.fill()

      // Update position
      point.x = nextX
      point.y = nextY

      // Reset position to grid when it goes off screen
      if (nextX < 0) point.x = canvas.width
      if (nextX > canvas.width) point.x = 0
      if (nextY < 0) point.y = canvas.height
      if (nextY > canvas.height) point.y = 0

      // Return to original position slowly
      const returnForce = 0.01
      point.vx += (point.originalX - point.x) * returnForce
      point.vy += (point.originalY - point.y) * returnForce
    })

    animationFrameId.current = requestAnimationFrame(animate)
  }, [lineColor, particleColor, animationSpeed, backgroundColor])

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

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
      }

      timeRef.current = 0
      flowPointsRef.current = []
    }
  }, [animate, resizeCanvas, handleMouseMove, handleMouseDown, handleMouseUp])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ backgroundColor }}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default FlowingDots