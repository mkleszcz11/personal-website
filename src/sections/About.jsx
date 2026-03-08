import { useState, useEffect } from 'react'
import { Linkedin, FileDown, Mail, X } from 'lucide-react'
import { config } from '../data/config'

export default function About() {
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    if (!lightbox) return
    const handleKey = (e) => { if (e.key === 'Escape') setLightbox(false) }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [lightbox])

  return (
    <section id="about" className="min-h-screen flex items-center pt-16">
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.88)' }}
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-5 right-5 flex items-center justify-center rounded-full w-9 h-9"
            style={{ color: '#fff', background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer' }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
          <img
            src="/images/avatar.jpg"
            alt={config.name}
            className="rounded-2xl"
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <div className="max-w-6xl mx-auto px-6 md:pl-2 py-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left column */}
          <div className="flex flex-col items-center md:items-start gap-8">
            <img
              src="/images/avatar.jpg"
              alt={config.name}
              onError={(e) => {
                e.target.src = 'https://placehold.co/320x320/E1E1E1/767171?text=Photo'
              }}
              onClick={() => setLightbox(true)}
              className="w-full max-w-[420px] aspect-square rounded-2xl object-cover cursor-zoom-in"
              style={{ border: '1px solid var(--color-border)' }}
            />

            <div className="flex flex-col gap-3">
              <a
                href={config.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Linkedin size={16} />
                Connect on LinkedIn
              </a>
              <a
                href={config.cvUrl}
                download
                className="flex items-center gap-2.5 text-sm transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <FileDown size={16} />
                Download CV
              </a>
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2.5 text-sm transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Mail size={16} />
                Write an email
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              {config.name}
            </h1>
            <div className="flex flex-col gap-4">
              {config.aboutBio.map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
