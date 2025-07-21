"use client"

import { useEffect, useRef, useCallback } from "react"

interface AsciiDotsFullscreenProps {
  backgroundColor?: string
  textColor?: string
  density?: number
  animationSpeed?: number
  removeWaveLine?:boolean
}

const BlinkingAsciiDots = ({
  backgroundColor = "#F0EEE6",
  textColor = "85, 85, 85",
  density = 1, 
  animationSpeed = 0.75,
  removeWaveLine = true,
}: AsciiDotsFullscreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const timeRef = useRef<number>(0)
  const animationFrameId = useRef<number | null>(null)
  const clickWaves = useRef<Array<{ x: number; y: number; time: number; intensity: number }>>([])

  // Extended Braille patterns for more visual variety
  const CHARS = "⠁⠂⠄⠈⠐⠠⡀⢀⠃⠅⠘⠨⠊⠋⠌⠍⠎⠏⠑⠒⠓⠔⠕⠖⠗⠙⠚⠛⠜⠝⠞⠟⠡⠢⠣⠤⠥⠦⠧⠩⠪⠫⠬⠭⠮⠯⠱⠲⠳⠴⠵⠶⠷⠹⠺⠻⠼⠽⠾⠿"

  // Calculate grid dimensions based on screen size and density
  const calculateGrid = useCallback(() => {
    if (!containerRef.current) return { cols: 0, rows: 0, cellSize: 0 }

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    // Base cell size on font metrics (approximate)
    const baseCellSize = 16 // Approximate size of a monospace character
    const cellSize = baseCellSize / density

    const cols = Math.ceil(width / cellSize)
    const rows = Math.ceil(height / cellSize)

    return { cols, rows, cellSize }
  }, [density])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !containerRef.current) return

    canvas.width = containerRef.current.clientWidth
    canvas.height = containerRef.current.clientHeight
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }, [])

  const handleMouseDown = useCallback((e: MouseEvent) => {
    mouseRef.current.isDown = true

    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    clickWaves.current.push({
      x,
      y,
      time: Date.now(),
      intensity: 2.5,
    })

    // Clean up old waves
    const now = Date.now()
    clickWaves.current = clickWaves.current.filter((wave) => now - wave.time < 5000)
  }, [])

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false
  }, [])

  const getWaveValue = useCallback((x: number, y: number, time: number) => {
    // Base wave pattern
    const wave1 = Math.sin(x * 0.05 + time * 0.5) * Math.cos(y * 0.05 - time * 0.3)
    const wave2 = Math.sin((x + y) * 0.04 + time * 0.7) * 0.5
    const wave3 = Math.cos(x * 0.06 - y * 0.06 + time * 0.4) * 0.3

    return (wave1 + wave2 + wave3) / 2 // Normalize to approximately -1 to 1
  }, [])

  const getClickWaveInfluence = useCallback((x: number, y: number, currentTime: number) => {
    let totalInfluence = 0

    clickWaves.current.forEach((wave) => {
      const age = currentTime - wave.time
      const maxAge = 5000

      if (age < maxAge) {
        const dx = x - wave.x
        const dy = y - wave.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const waveRadius = (age / maxAge) * 500
        const waveWidth = 100

        if (Math.abs(distance - waveRadius) < waveWidth) {
          const waveStrength = (1 - age / maxAge) * wave.intensity
          const proximityToWave = 1 - Math.abs(distance - waveRadius) / waveWidth
          totalInfluence += waveStrength * proximityToWave * Math.sin((distance - waveRadius) * 0.05)
        }
      }
    })

    return totalInfluence
  }, [])

  const getMouseInfluence = useCallback((x: number, y: number) => {
    const dx = x - mouseRef.current.x
    const dy = y - mouseRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 200
    return Math.max(0, 1 - distance / maxDistance)
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !containerRef.current) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const currentTime = Date.now()
    timeRef.current += animationSpeed * 0.016

    // Calculate grid dimensions
    const { cols, rows, cellSize } = calculateGrid()

    // Clear with solid background to prevent fading
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Set up text rendering
    ctx.font = `${cellSize}px monospace`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Draw ASCII pattern
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const posX = x * cellSize + cellSize / 2
        const posY = y * cellSize + cellSize / 2

        // Calculate wave value at this position
        let waveValue = getWaveValue(posX, posY, timeRef.current)

        // Add mouse influence
        const mouseInfluence = getMouseInfluence(posX, posY)
        if (mouseInfluence > 0) {
          waveValue += mouseInfluence * Math.sin(timeRef.current * 3) * 0.5
        }

        // Add click wave influence
        const clickInfluence = getClickWaveInfluence(posX, posY, currentTime)
        waveValue += clickInfluence

        // Map wave value to character and opacity
        const normalizedValue = (waveValue + 1) / 2 // Map from -1,1 to 0,1

        if (Math.abs(waveValue) > 0.15) {
          // Threshold to create some empty space
          const charIndex = Math.floor(normalizedValue * CHARS.length)
          const char = CHARS[Math.min(CHARS.length - 1, Math.max(0, charIndex))]

          // Calculate opacity based on wave value
          const opacity = Math.min(0.9, Math.max(0.3, 0.4 + normalizedValue * 0.5))

          ctx.fillStyle = `rgba(${textColor}, ${opacity})`
          ctx.fillText(char, posX, posY)
        }
      }
    }

    // Draw click wave effects
    if(!removeWaveLine){
    clickWaves.current.forEach((wave) => {
      const age = currentTime - wave.time
      const maxAge = 5000

      if (age < maxAge) {
        const progress = age / maxAge
        const radius = progress * 500
        const alpha = (1 - progress) * 0.2 * wave.intensity

        ctx.beginPath()
        ctx.strokeStyle = `rgba(${textColor}, ${alpha})`
        ctx.lineWidth = 1
        ctx.arc(wave.x, wave.y, radius, 0, 2 * Math.PI)
        ctx.stroke()
      }
    })
    }
    animationFrameId.current = requestAnimationFrame(animate)
  }, [
    backgroundColor,
    textColor,
    animationSpeed,
    calculateGrid,
    getWaveValue,
    getClickWaveInfluence,
    getMouseInfluence,
    removeWaveLine
  ])

  useEffect(() => {
    if (!containerRef.current) return

    handleResize()

    window.addEventListener("resize", handleResize)
    containerRef.current.addEventListener("mousemove", handleMouseMove)
    containerRef.current.addEventListener("mousedown", handleMouseDown)
    containerRef.current.addEventListener("mouseup", handleMouseUp)

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)

      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove)
        containerRef.current.removeEventListener("mousedown", handleMouseDown)
        containerRef.current.removeEventListener("mouseup", handleMouseUp)
      }

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
      }
    }
  }, [animate, handleResize, handleMouseMove, handleMouseDown, handleMouseUp])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Optional instructions overlay */}
      <div className="absolute top-4 left-0 right-0 text-center text-sm text-gray-600 pointer-events-none">
        <div className="inline-block bg-white/70 backdrop-blur-sm px-3 py-1 rounded-md">
          Move mouse to influence • Click to create waves
        </div>
      </div>
    </div>
  )
}

export default BlinkingAsciiDots
