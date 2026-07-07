import { useEffect, useRef, useState } from 'react'

export function useScrollPast<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [past, setPast] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setPast(!entry.isIntersecting),
      { rootMargin: '-64px 0px 0px 0px', threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, past }
}
