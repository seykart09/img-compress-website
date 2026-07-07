import { useEffect, useRef, useState } from 'react'

const SIZES = [
  { label: 'PNG', kb: 842, quality: 100 },
  { label: 'q=80', kb: 156, quality: 80 },
  { label: 'q=60', kb: 98, quality: 60 },
  { label: 'q=40', kb: 61, quality: 40 },
]

export function CompressionDial() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % SIZES.length)
    }, 1800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const size = 220
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const draw = () => {
      ctx.clearRect(0, 0, size, size)

      const styles = getComputedStyle(document.documentElement)
      const line = styles.getPropertyValue('--line').trim()
      const accent = styles.getPropertyValue('--accent').trim()
      const ink = styles.getPropertyValue('--ink').trim()

      const cx = size / 2
      const cy = size / 2
      const radius = 88
      const quality = SIZES[step].quality
      const fraction = quality / 100

      // Background ring (full "uncompressed" reference)
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.strokeStyle = line
      ctx.lineWidth = 14
      ctx.stroke()

      // Foreground arc representing relative encoded size
      ctx.beginPath()
      ctx.arc(cx, cy, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * fraction)
      ctx.strokeStyle = accent
      ctx.lineWidth = 14
      ctx.lineCap = 'round'
      ctx.stroke()

      ctx.fillStyle = ink
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = '600 30px "JetBrains Mono", monospace'
      ctx.fillText(`${SIZES[step].kb}`, cx, cy - 6)
      ctx.font = '400 13px "JetBrains Mono", monospace'
      ctx.fillStyle = styles.getPropertyValue('--muted').trim()
      ctx.fillText('KB', cx, cy + 18)
    }

    draw()
    const observer = new MutationObserver(draw)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [step])

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="flex items-center gap-2 font-mono text-xs text-[var(--muted)]">
        {SIZES.map((s, i) => (
          <span
            key={s.label}
            className="rounded-full px-2.5 py-1 transition-colors"
            style={{
              background: i === step ? 'var(--accent-soft)' : 'transparent',
              color: i === step ? 'var(--accent)' : 'var(--muted)',
            }}
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  )
}
