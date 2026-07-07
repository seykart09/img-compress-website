import { useEffect, useState } from 'react'
import { platforms, RELEASE_TAG, REPO_URL } from './data'
import { CompressionDial } from './components/CompressionDial'
import { PlatformCard } from './components/PlatformCard'
import { InstallSteps } from './components/InstallSteps'
import { SettingsTable } from './components/SettingsTable'
import { ThemeToggle } from './components/ThemeToggle'
import { Reveal } from './components/Reveal'
import { useScrollPast } from './hooks/useScrollPast'

function App() {
  const { ref: heroSentinelRef, past: heroPast } = useScrollPast<HTMLDivElement>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <header
        className="sticky top-0 z-10 border-b transition-colors duration-500"
        style={{
          borderColor: heroPast ? 'var(--line)' : 'transparent',
          background: heroPast ? 'color-mix(in srgb, var(--bg) 82%, transparent)' : 'transparent',
          backdropFilter: heroPast ? 'blur(10px)' : 'none',
        }}
      >
        <div className="mx-auto flex max-w-[880px] items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
              style={{ background: 'var(--ink)' }}
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="var(--accent)" strokeWidth="1.4" aria-hidden="true">
                <path d="M4 11V5h4v6M8 8l4-3v6l-4-3Z" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-mono text-[12.5px] sm:text-[13.5px]" style={{ color: 'var(--muted)' }}>
              ux-img-compress
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <nav
              className="hidden items-center gap-5 overflow-hidden transition-all duration-500 sm:flex"
              style={{
                maxWidth: heroPast ? '260px' : '0px',
                opacity: heroPast ? 1 : 0,
                transform: heroPast ? 'translateX(0)' : 'translateX(8px)',
              }}
              aria-hidden={!heroPast}
            >
              <a
                href="#download"
                className="whitespace-nowrap text-[13.5px] font-medium no-underline"
                style={{ color: 'var(--ink)' }}
                tabIndex={heroPast ? 0 : -1}
              >
                Download
              </a>
              <a
                href="#install"
                className="whitespace-nowrap text-[13.5px] no-underline"
                style={{ color: 'var(--muted)' }}
                tabIndex={heroPast ? 0 : -1}
              >
                Installation guide
              </a>
            </nav>
            <a
              href={REPO_URL}
              className="text-[13px] no-underline sm:text-[13.5px]"
              style={{ color: 'var(--muted)' }}
            >
              Source
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[880px] flex-col px-4 sm:px-6">
        <main className="flex flex-col gap-16 pb-16 sm:gap-20 sm:pb-24">
          {/* Hero */}
          <section className="grid items-center gap-8 pt-4 sm:gap-10 sm:pt-8 md:grid-cols-[1.2fr_auto]">
            <div className="flex flex-col gap-4 sm:gap-5">
              <div
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(14px)',
                  transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <span
                  className="w-fit rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wide sm:text-[11.5px]"
                  style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}
                >
                  {RELEASE_TAG} · VS Code &amp; Cursor
                </span>
              </div>
              <h1
                className="text-[34px] leading-[1.1] sm:text-[42px] sm:leading-[1.08] md:text-[50px]"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(18px)',
                  transition: 'opacity 1.1s cubic-bezier(0.16,1,0.3,1) 150ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) 150ms',
                }}
              >
                Smaller images,<br />
                <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>same</em> right-click.
              </h1>
              <p
                className="max-w-[46ch] text-[15.5px] leading-relaxed sm:text-[16.5px]"
                style={{
                  color: 'var(--muted)',
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(18px)',
                  transition: 'opacity 1.1s cubic-bezier(0.16,1,0.3,1) 300ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) 300ms',
                }}
              >
                Convert PNG, JPEG, GIF, TIFF, and AVIF to WebP without leaving the Explorer.
                One command, four settings, no server round-trip.
              </p>
              <div
                className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-1"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(18px)',
                  transition: 'opacity 1.1s cubic-bezier(0.16,1,0.3,1) 450ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) 450ms',
                }}
              >
                <a
                  href="#download"
                  className="rounded-md px-4 py-2.5 text-[14.5px] font-semibold no-underline transition-transform hover:-translate-y-0.5"
                  style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
                >
                  Download for your platform
                </a>
                <a href="#install" className="text-[14.5px] no-underline" style={{ color: 'var(--ink)' }}>
                  Installation guide →
                </a>
              </div>
            </div>
            <div
              className="hidden md:block"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'scale(1)' : 'scale(0.92)',
                transition: 'opacity 1.2s cubic-bezier(0.16,1,0.3,1) 350ms, transform 1.2s cubic-bezier(0.16,1,0.3,1) 350ms',
              }}
            >
              <CompressionDial />
            </div>
          </section>

          {/* Sentinel marking the end of the hero — nav CTAs appear once this scrolls away */}
          <div ref={heroSentinelRef} className="-mt-16 h-px sm:-mt-20" aria-hidden="true" />

          {/* Downloads */}
          <Reveal direction="up">
            <section id="download" className="flex flex-col gap-5 scroll-mt-20">
              <SectionHeading
                eyebrow="Download"
                title="Pick your platform"
                description="Each build ships sharp's native binary for that architecture — grab the wrong one and the extension simply won't activate."
              />
              <div className="grid gap-4 sm:grid-cols-3">
                {platforms.map((p, i) => (
                  <Reveal key={p.id} direction="up" delay={i * 130}>
                    <PlatformCard platform={p} />
                  </Reveal>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Install */}
          <Reveal direction="left">
            <section id="install" className="flex flex-col gap-5 scroll-mt-20">
              <SectionHeading
                eyebrow="Setup"
                title="Install in under a minute"
                description="Works the same way in Cursor and VS Code — both read the standard .vsix format."
              />
              <InstallSteps />
            </section>
          </Reveal>

          {/* Settings */}
          <Reveal direction="right">
            <section className="flex flex-col gap-5">
              <SectionHeading
                eyebrow="Configure"
                title="Tune the compression"
                description="Open Settings and search “ux-img-compress” to override any of these per workspace or globally."
              />
              <SettingsTable />
            </section>
          </Reveal>

          {/* Usage note */}
          <Reveal direction="up">
            <section
              className="flex flex-col gap-3 rounded-lg border px-5 py-5 sm:px-6"
              style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
            >
              <h3 className="text-[17px]">One setting, every conversion</h3>
              <p className="max-w-[62ch] text-[14.5px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                Settings apply globally to every conversion — there's currently no per-file override.
                To compress a single image more aggressively, drop <code className="mono-inline">quality</code> before
                running the command, then restore it after.
              </p>
            </section>
          </Reveal>
        </main>

        <footer
          className="flex flex-col items-center gap-3 border-t py-6 text-[13px] sm:flex-row sm:justify-between"
          style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}
        >
          <span>{RELEASE_TAG} · Built with sharp &amp; esbuild</span>
          <a href={REPO_URL} className="no-underline" style={{ color: 'var(--muted)' }}>
            View source
          </a>
        </footer>
      </div>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="font-mono text-[11.5px] uppercase tracking-wide"
        style={{ color: 'var(--accent)' }}
      >
        {eyebrow}
      </span>
      <h2 className="text-[26px]">{title}</h2>
      <p className="max-w-[58ch] text-[15px] leading-relaxed" style={{ color: 'var(--muted)' }}>
        {description}
      </p>
    </div>
  )
}

export default App
