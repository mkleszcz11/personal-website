import { config } from '../data/config'

export default function Footer() {
  return (
    <footer
      className="py-8 text-center text-sm"
      style={{
        color: 'var(--color-text-secondary)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      © 2026 {config.name} | All Rights Reserved
    </footer>
  )
}
