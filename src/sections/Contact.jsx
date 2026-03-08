import { Mail, Linkedin } from 'lucide-react'
import { config } from '../data/config'

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10" style={{ color: 'var(--color-text-primary)' }}>
          Contact
        </h2>
        <div className="flex flex-col items-center gap-6 py-16">
          <a
            href={`mailto:${config.email}`}
            className="flex items-center gap-3 text-lg transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-text-primary)' }}
          >
            <Mail size={22} />
            {config.email}
          </a>
          <a
            href={config.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-text-primary)' }}
          >
            <Linkedin size={22} />
            {config.linkedin.replace('https://', '')}
          </a>
        </div>
      </div>
    </section>
  )
}
