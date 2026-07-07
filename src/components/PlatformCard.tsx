import type { Platform } from '../data'
import { downloadUrl } from '../data'

function Glyph({ os }: { os: string }) {
  if (os === 'macOS') {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M17.05 12.04c-.03-2.7 2.2-4 2.3-4.06-1.26-1.84-3.22-2.09-3.92-2.12-1.67-.17-3.26.98-4.1.98-.85 0-2.14-.96-3.52-.93-1.8.03-3.47 1.05-4.4 2.66-1.87 3.25-.48 8.06 1.35 10.7.89 1.29 1.96 2.74 3.36 2.69 1.35-.05 1.86-.87 3.5-.87 1.63 0 2.1.87 3.53.85 1.46-.03 2.38-1.32 3.27-2.62.94-1.36 1.34-2.7 1.36-2.77-.03-.01-2.6-1-2.63-3.96Zm-2.47-7.27c.75-.9 1.25-2.16 1.11-3.42-1.08.04-2.38.72-3.15 1.62-.7.8-1.31 2.08-1.14 3.31 1.2.09 2.43-.61 3.18-1.51Z"/>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M3 5.1 10.1 4.1V11.2H3V5.1ZM11 4 21 2.6V11.1H11V4ZM3 12.1H10.1V19.2L3 18.2V12.1ZM11 12.1H21V20.6L11 19.2V12.1Z"/>
    </svg>
  )
}

export function PlatformCard({ platform }: { platform: Platform }) {
  return (
    <a
      href={downloadUrl(platform.file)}
      className="group flex flex-col gap-4 rounded-lg border p-5 no-underline transition-all hover:-translate-y-0.5 hover:border-(--accent)"
      style={{
        borderColor: 'var(--line)',
        background: 'var(--surface)',
        boxShadow: 'var(--shadow-card)',
      }}
      download
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5" style={{ color: 'var(--ink)' }}>
          <Glyph os={platform.os} />
          <div>
            <div className="text-[15px] font-semibold leading-tight">{platform.os}</div>
            <div className="text-[13px]" style={{ color: 'var(--muted)' }}>{platform.arch}</div>
          </div>
        </div>
        <span
          className="rounded-full border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide"
          style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}
        >
          .vsix
        </span>
      </div>

      <div
        className="flex items-center justify-between gap-2 rounded-md px-3 py-2 font-mono text-[12.5px] transition-colors"
        style={{ background: 'var(--bg)', color: 'var(--muted)' }}
      >
        <span className="hidden truncate sm:inline" style={{ color: 'var(--ink)' }}>
          {platform.file}
        </span>
        <span className="inline sm:hidden" style={{ color: 'var(--ink)' }}>
          Download
        </span>
        <svg
          className="shrink-0 transition-transform group-hover:translate-y-0.5"
          viewBox="0 0 16 16"
          width="14"
          height="14"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M8 2v8m0 0 3-3m-3 3-3-3M2.5 12v1a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </a>
  )
}
