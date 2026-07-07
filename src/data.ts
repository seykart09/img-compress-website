export const RELEASE_TAG = 'v0.0.2'
export const REPO_URL = 'https://github.com/seykart09/ux-img-compress'
const RELEASE_BASE = `${REPO_URL}/releases/download/${RELEASE_TAG}`

export type Platform = {
  id: string
  os: string
  arch: string
  file: string
  note?: string
}

export const platforms: Platform[] = [
  {
    id: 'darwin-arm64',
    os: 'macOS',
    arch: 'Apple Silicon (M1–M4)',
    file: 'ux-img-compress-darwin-arm64-0.0.2.vsix',
  },
  {
    id: 'darwin-x64',
    os: 'macOS',
    arch: 'Intel',
    file: 'ux-img-compress-darwin-x64-0.0.2.vsix',
  },
  {
    id: 'win32-x64',
    os: 'Windows',
    arch: '64-bit',
    file: 'ux-img-compress-win32-x64-0.0.2.vsix',
  },
]

export function downloadUrl(file: string) {
  return `${RELEASE_BASE}/${file}`
}

export type Setting = {
  key: string
  type: string
  range: string
  default: string
  description: string
}

export const settings: Setting[] = [
  {
    key: 'ux-img-compress.quality',
    type: 'number',
    range: '1–100',
    default: '80',
    description: 'WebP quality. Lower produces smaller files with more visible loss.',
  },
  {
    key: 'ux-img-compress.effort',
    type: 'number',
    range: '0–6',
    default: '4',
    description: 'Encoder effort. Higher squeezes out more size at the cost of speed.',
  },
  {
    key: 'ux-img-compress.lossless',
    type: 'boolean',
    range: 'true / false',
    default: 'false',
    description: 'Skip quality entirely and encode lossless WebP.',
  },
  {
    key: 'ux-img-compress.deleteOriginal',
    type: 'boolean',
    range: 'true / false',
    default: 'false',
    description: 'Remove the source file once conversion succeeds.',
  },
]
