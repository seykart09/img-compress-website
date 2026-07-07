import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { platforms, type Platform } from '../data'

type Editor = 'cursor' | 'vscode' | 'antigravity'

const EDITOR_LABEL: Record<Editor, string> = {
  cursor: 'Cursor',
  vscode: 'VS Code',
  antigravity: 'Antigravity',
}

const EDITOR_BIN: Record<Editor, string> = {
  cursor: 'cursor',
  vscode: 'code',
  antigravity: 'antigravity',
}

const RELOAD_HINT = 'Cmd/Ctrl + Shift + P → "Developer: Reload Window"'

function detectPlatformId(): string {
  const ua = navigator.userAgent

  // Browsers don't expose CPU architecture, so macOS defaults to Apple Silicon
  // (the more common case today) — the platform picker lets users correct this.
  if (/Mac/i.test(ua)) return 'darwin-arm64'
  if (/Win/i.test(ua)) return 'win32-x64'
  return platforms[0].id
}

function editorCli(editor: Editor, file: string) {
  return `${EDITOR_BIN[editor]} --install-extension ${file}`
}

export function InstallSteps() {
  const [editor, setEditor] = useState<Editor>('cursor')
  const [platformId, setPlatformId] = useState<string>(platforms[0].id)

  useEffect(() => {
    setPlatformId(detectPlatformId())
  }, [])

  const platform: Platform = useMemo(
    () => platforms.find((p) => p.id === platformId) ?? platforms[0],
    [platformId],
  )

  const command = editorCli(editor, platform.file)

  return (
    <div
      className="overflow-hidden rounded-lg border"
      style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow-card)' }}
    >
      <div className="flex border-b" style={{ borderColor: 'var(--line)' }}>
        {(['cursor', 'vscode', 'antigravity'] as Editor[]).map((e) => (
          <button
            key={e}
            onClick={() => setEditor(e)}
            className="flex-1 px-3 py-3 text-[13.5px] font-medium transition-colors sm:px-5 sm:text-[14px]"
            style={{
              color: editor === e ? 'var(--ink)' : 'var(--muted)',
              background: editor === e ? 'var(--bg)' : 'transparent',
              borderBottom: editor === e ? '2px solid var(--accent)' : '2px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {EDITOR_LABEL[e]}
          </button>
        ))}
      </div>

      <ol className="flex flex-col gap-5 p-4 sm:p-6">
        <Step n={1} title="Choose your platform">
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => setPlatformId(p.id)}
                className="rounded-md border px-3 py-1.5 text-[13px] font-medium transition-colors"
                style={{
                  borderColor: platformId === p.id ? 'var(--accent)' : 'var(--line)',
                  color: platformId === p.id ? 'var(--ink)' : 'var(--muted)',
                  background: platformId === p.id ? 'var(--accent-soft)' : 'transparent',
                }}
              >
                {p.os} <span style={{ opacity: 0.7 }}>({p.arch})</span>
              </button>
            ))}
          </div>
        </Step>

        <Step n={2} title="Download, then install with one command">
          <p className="mb-2">
            Grab <code className="mono-inline">{platform.file}</code> from the downloads above, then run this in the
            same folder:
          </p>
          <CodeBlock text={command} />
          <p className="mt-2 text-[13.5px]" style={{ color: 'var(--muted)' }}>
            No terminal? Open the Extensions panel (Cmd/Ctrl+Shift+X),
            click the <strong>···</strong> menu at the top, and choose <strong>Install from VSIX…</strong>
          </p>
        </Step>

        <Step n={3} title="Reload">
          <p>{RELOAD_HINT}</p>
        </Step>

        <Step n={4} title="Convert an image">
          Right-click any <code className="mono-inline">.png</code>, <code className="mono-inline">.jpg</code>, or{' '}
          <code className="mono-inline">.gif</code> in the Explorer and choose{' '}
          <strong style={{ color: 'var(--ink)' }}>Compress &amp; Convert to WebP</strong>.
        </Step>
      </ol>
    </div>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <div
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-semibold"
        style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
      >
        {n}
      </div>
      <div className="flex-1">
        <div className="mb-1 text-[15px] font-semibold" style={{ color: 'var(--ink)' }}>
          {title}
        </div>
        <div className="text-[14.5px] leading-relaxed" style={{ color: 'var(--muted)' }}>
          {children}
        </div>
      </div>
    </li>
  )
}

function CodeBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div
      className="flex flex-col gap-2 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-2.5 sm:pl-3.5 sm:pr-3"
      style={{ borderColor: 'var(--line)', background: 'var(--bg)' }}
    >
      <code
        className="mono-inline overflow-x-auto whitespace-nowrap text-[12.5px] sm:text-[13px]"
        style={{ color: 'var(--ink)' }}
      >
        {text}
      </code>
      <button
        onClick={() => {
          navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        }}
        className="shrink-0 self-end rounded border px-2 py-1 font-mono text-[11px] uppercase tracking-wide transition-colors sm:self-auto"
        style={{ borderColor: 'var(--line)', color: copied ? 'var(--good)' : 'var(--muted)' }}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
