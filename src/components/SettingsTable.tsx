import { settings } from '../data'

export function SettingsTable() {
  return (
    <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'var(--line)' }}>
      <table className="w-full border-collapse text-left text-[14px]">
        <thead>
          <tr style={{ background: 'var(--surface)' }}>
            {['Setting', 'Type', 'Range', 'Default', ''].map((h) => (
              <th
                key={h}
                className="whitespace-nowrap border-b px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wide"
                style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {settings.map((s, i) => (
            <tr key={s.key} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg)' }}>
              <td className="border-b px-4 py-3 font-mono text-[13px]" style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}>
                {s.key}
              </td>
              <td className="border-b px-4 py-3 font-mono text-[12.5px]" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
                {s.type}
              </td>
              <td className="whitespace-nowrap border-b px-4 py-3 font-mono text-[12.5px]" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
                {s.range}
              </td>
              <td className="whitespace-nowrap border-b px-4 py-3 font-mono text-[12.5px] font-semibold" style={{ borderColor: 'var(--line)', color: 'var(--accent)' }}>
                {s.default}
              </td>
              <td className="border-b px-4 py-3 text-[13.5px]" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
                {s.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
