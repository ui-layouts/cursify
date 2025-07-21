"use client"

import { useEffect, useRef, useCallback } from "react"

interface SlidingEaseVerticalBarsProps {
  backgroundColor?: string
  lineColor?: string
  barColor?: string
  lineWidth?: number
  animationSpeed?: number
  removeWaveLine?: boolean
}

const SlidingEaseVerticalBars = ({
  backgroundColor = "#F0EEE6",
  lineColor = "#444",
  barColor = "#5E5D59",
  lineWidth = 1,
  animationSpeed = 0.005,
  removeWaveLine = true,
}: SlidingEaseVerticalBarsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef = useRef<number>(0)
  const animationFrameId = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const transitionBursts = useRef<Array<{ x: number; y: number; time: number; intensity: number }>>([])
  const dprRef = useRef<number>(1)

  interface Bar {
    y: number
    height: number
    width: number
  }

  const noise = (x: number, y: number, t: number): number => {
    const n = Math.sin(x * 0.02 + t) * Math.cos(y * 0.02 + t) + Math.sin(x * 0.03 - t) * Math.cos(y * 0.01 + t)
    return (n + 1) / 2
  }

  const getMouseInfluence = (x: number, y: number): number => {
    const dx = x - mouseRef.current.x
    const dy = y - mouseRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 180
    return Math.max(0, 1 - distance / maxDistance)
  }

  const getTransitionBurstInfluence = (x: number, y: number, currentTime: number): number => {
    let totalInfluence = 0

    transitionBursts.current.forEach((burst) => {
      const age = currentTime - burst.time
      const maxAge = 2500
      if (age < maxAge) {
        const dx = x - burst.x
        const dy = y - burst.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const burstRadius = (age / maxAge) * 300
        const burstWidth = 60
        if (Math.abs(distance - burstRadius) < burstWidth) {
          const burstStrength = (1 - age / maxAge) * burst.intensity
          const proximityToBurst = 1 - Math.abs(distance - burstRadius) / burstWidth
          totalInfluence += burstStrength * proximityToBurst
        }
      }
    })

    return Math.min(totalInfluence, 1.5)
  }

  const generatePattern = (seed: number, width: number, height: number, numLines: number): Bar[][] => {
    const pattern: Bar[][] = []
    const lineSpacing = width / numLines

    for (let i = 0; i < numLines; i++) {
      const lineBars: Bar[] = []
      let currentY = 0

      while (currentY < height) {
        const noiseVal = noise(i * lineSpacing, currentY, seed)
        if (noiseVal > 0.5) {
          const barLength = 10 + noiseVal * 30
          const barWidth = 2 + noiseVal * 3
          lineBars.push({
            y: currentY + barLength / 2,
            height: barLength,
            width: barWidth,
          })
          currentY += barLength + 15
        } else {
          currentY += 15
        }
      }
      pattern.push(lineBars)
    }

    return pattern
  }

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

    transitionBursts.current.push({
      x,
      y,
      time: Date.now(),
      intensity: 2,
    })

    const now = Date.now()
    transitionBursts.current = transitionBursts.current.filter((burst) => now - burst.time < 2500)
  }, [])

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const currentTime = Date.now()
    timeRef.current += animationSpeed

    // Use CSS pixel dimensions for calculations
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    const numLines = Math.floor(width / 15)
    const lineSpacing = width / numLines

    // Generate patterns
    const pattern1 = generatePattern(0, width, height, numLines)
    const pattern2 = generatePattern(5, width, height, numLines)

    // Create cycle with mouse influence
    const baseCycleTime = timeRef.current % (Math.PI * 2)
    const mouseInfluenceOnCycle = getMouseInfluence(width / 2, height / 2) * 0.5

    let easingFactor: number
    const adjustedCycleTime = baseCycleTime + mouseInfluenceOnCycle

    if (adjustedCycleTime < Math.PI * 0.1) {
      easingFactor = 0
    } else if (adjustedCycleTime < Math.PI * 0.9) {
      const transitionProgress = (adjustedCycleTime - Math.PI * 0.1) / (Math.PI * 0.8)
      easingFactor = transitionProgress
    } else if (adjustedCycleTime < Math.PI * 1.1) {
      easingFactor = 1
    } else if (adjustedCycleTime < Math.PI * 1.9) {
      const transitionProgress = (adjustedCycleTime - Math.PI * 1.1) / (Math.PI * 0.8)
      easingFactor = 1 - transitionProgress
    } else {
      easingFactor = 0
    }

    const smoothEasing =
      easingFactor < 0.5 ? 4 * easingFactor * easingFactor * easingFactor : 1 - Math.pow(-2 * easingFactor + 2, 3) / 2

    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)

    // Draw lines and interpolated bars
    for (let i = 0; i < numLines; i++) {
      const x = i * lineSpacing + lineSpacing / 2
      const lineMouseInfluence = getMouseInfluence(x, height / 2)

      // Draw vertical line with mouse influence
      ctx.beginPath()
      ctx.strokeStyle = lineColor
      ctx.lineWidth = lineWidth + lineMouseInfluence * 2
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()

      // Interpolate between patterns
      const bars1 = pattern1[i] || []
      const bars2 = pattern2[i] || []
      const maxBars = Math.max(bars1.length, bars2.length)

      for (let j = 0; j < maxBars; j++) {
        let bar1 = bars1[j]
        let bar2 = bars2[j]

        if (!bar1) bar1 = { y: bar2.y - 100, height: 0, width: 0 }
        if (!bar2) bar2 = { y: bar1.y + 100, height: 0, width: 0 }

        const barMouseInfluence = getMouseInfluence(x, bar1.y)
        const burstInfluence = getTransitionBurstInfluence(x, bar1.y, currentTime)

        // Enhanced wave motion with mouse and burst influence
        const baseWaveOffset =
          Math.sin(i * 0.3 + j * 0.5 + timeRef.current * 2) * 10 * (smoothEasing * (1 - smoothEasing) * 4)

        const mouseWaveOffset = barMouseInfluence * Math.sin(timeRef.current * 3 + i * 0.2) * 15
        const burstWaveOffset = burstInfluence * Math.sin(timeRef.current * 4 + j * 0.3) * 20
        const totalWaveOffset = baseWaveOffset + mouseWaveOffset + burstWaveOffset

        // Interpolate properties
        const y = bar1.y + (bar2.y - bar1.y) * smoothEasing + totalWaveOffset
        const height =
          bar1.height + (bar2.height - bar1.height) * smoothEasing + barMouseInfluence * 5 + burstInfluence * 8
        const width = bar1.width + (bar2.width - bar1.width) * smoothEasing + barMouseInfluence * 2 + burstInfluence * 3

        // Draw bar with enhanced effects
        if (height > 0.1 && width > 0.1) {
          const intensity = Math.min(1, 0.8 + barMouseInfluence * 0.2 + burstInfluence * 0.3)
          const red = Number.parseInt(barColor.slice(1, 3), 16)
          const green = Number.parseInt(barColor.slice(3, 5), 16)
          const blue = Number.parseInt(barColor.slice(5, 7), 16)

          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${intensity})`
          ctx.fillRect(x - width / 2, y - height / 2, width, height)
        }
      }
    }

    // Draw transition burst effects
    if (!removeWaveLine) {
      transitionBursts.current.forEach((burst) => {
        const age = currentTime - burst.time
        const maxAge = 2500
        if (age < maxAge) {
          const progress = age / maxAge
          const radius = progress * 300
          const alpha = (1 - progress) * 0.2 * burst.intensity

          ctx.beginPath()
          ctx.strokeStyle = `rgba(100, 100, 100, ${alpha})`
          ctx.lineWidth = 2
          ctx.arc(burst.x, burst.y, radius, 0, 2 * Math.PI)
          ctx.stroke()
        }
      })
    }

    animationFrameId.current = requestAnimationFrame(animate)
  }, [backgroundColor, lineColor, removeWaveLine, barColor, lineWidth, animationSpeed])

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
      transitionBursts.current = []
    }
  }, [animate, resizeCanvas, handleMouseMove, handleMouseDown, handleMouseUp])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ backgroundColor }}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default SlidingEaseVerticalBars
