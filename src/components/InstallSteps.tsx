import { useState, type ReactNode } from 'react'

type Editor = 'cursor' | 'vscode'

const CLI: Record<Editor, string> = {
  cursor: 'cursor --install-extension ux-img-compress-0.0.1-<platform>.vsix',
  vscode: 'code --install-extension ux-img-compress-0.0.1-<platform>.vsix',
}

const RELOAD_HINT = 'Cmd/Ctrl + Shift + P → "Developer: Reload Window"'

export function InstallSteps() {
  const [editor, setEditor] = useState<Editor>('cursor')

  return (
    <div
      className="overflow-hidden rounded-lg border"
      style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow-card)' }}
    >
      <div className="flex border-b" style={{ borderColor: 'var(--line)' }}>
        {(['cursor', 'vscode'] as Editor[]).map((e) => (
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
            {e === 'cursor' ? 'Cursor' : 'VS Code'}
          </button>
        ))}
      </div>

      <ol className="flex flex-col gap-5 p-4 sm:p-6">
        <Step n={1} title="Download the build for your platform">
          Grab the <code className="mono-inline">.vsix</code> that matches your OS from the downloads above.
        </Step>

        <Step n={2} title="Install it">
          <p className="mb-2">Open a terminal and run:</p>
          <CodeBlock text={CLI[editor]} />
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
