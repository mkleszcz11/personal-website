import { useState, useEffect, useRef, useCallback } from 'react'
import { ExternalLink, ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react'
import { projects, otherProjects } from '../data/projects'

// Auto-discover all images in public/images/projects/other/ at build time.
// Keys are like '/public/images/projects/other/autonomous-donkey/image25.png'.
// Public files are served without the '/public' prefix, so we strip it for URLs.
const _otherGlob = import.meta.glob([
  '/public/images/projects/other/**/*.jpg',
  '/public/images/projects/other/**/*.jpeg',
  '/public/images/projects/other/**/*.png',
  '/public/images/projects/other/**/*.gif',
  '/public/images/projects/other/**/*.webp',
])
const otherImagesByDir = {}
for (const path of Object.keys(_otherGlob)) {
  const url = path.replace('/public', '')
  const dir = url.split('/').slice(0, -1).join('/')
  if (!otherImagesByDir[dir]) otherImagesByDir[dir] = []
  otherImagesByDir[dir].push(url)
}

// Auto-discover cover.mp4 / cover.gif / cover.png for main project cards.
// Drop any of these into the project's image folder — no data changes needed.
// Priority: mp4 > gif > png
const _coverGlob = import.meta.glob([
  '/public/images/projects/*/cover.mp4',
  '/public/images/projects/*/cover.gif',
  '/public/images/projects/*/cover.png',
])
const projectCoverByDir = {}
for (const path of Object.keys(_coverGlob)) {
  const url = path.replace('/public', '')
  const dir = url.split('/').slice(0, -1).join('/')
  const existing = projectCoverByDir[dir]
  const rank = (u) => u.endsWith('.mp4') ? 2 : u.endsWith('.gif') ? 1 : 0
  if (!existing || rank(url) > rank(existing)) projectCoverByDir[dir] = url
}

function getProjectCover(project) {
  if (project.what?.photo) {
    const dir = project.what.photo.split('/').slice(0, -1).join('/')
    if (projectCoverByDir[dir]) return projectCoverByDir[dir]
  }
  return null
}

function useColumns() {
  const [cols, setCols] = useState(3)
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCols(3)
      else if (window.innerWidth >= 640) setCols(2)
      else setCols(1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return cols
}

function CoverMedia({ src, alt, className, style, lazy }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  if (src && src.endsWith('.mp4')) {
    return (
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        className={className}
        style={style}
      />
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={lazy ? 'lazy' : undefined}
    />
  )
}

function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.88)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 flex items-center justify-center rounded-full w-9 h-9"
        style={{ color: '#fff', background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer' }}
        aria-label="Close"
      >
        <X size={18} />
      </button>
      <img
        src={src}
        alt={alt}
        className="rounded-xl"
        style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

function ProjectCard({ project, isActive, onClick, lazy }) {
  const cover = getProjectCover(project)
  return (
    <div
      onClick={onClick}
      className="rounded-2xl cursor-pointer transition-all duration-200"
      style={{
        border: isActive ? '1px solid var(--color-text-primary)' : '1px solid var(--color-border)',
        backgroundColor: isActive ? 'var(--color-surface)' : 'var(--color-background)',
      }}
    >
      <div className="p-5 flex flex-col gap-4">
        <h3 className="font-semibold text-base" style={{ color: 'var(--color-text-primary)' }}>
          {project.title}
        </h3>
        {cover && (project.coverCrop === false ? (
          <div className="h-48 flex justify-center">
            <CoverMedia
              src={cover}
              alt={project.title}
              className="h-full w-auto rounded-xl"
              lazy={lazy}
            />
          </div>
        ) : (
          <CoverMedia
            src={cover}
            alt={project.title}
            className="w-full h-48 object-cover rounded-xl"
            style={{ backgroundColor: 'var(--color-surface)' }}
            lazy={lazy}
          />
        ))}
        {project.isOther && (
          <div className="flex items-center justify-center py-6">
            <ChevronDown
              size={22}
              className="transition-transform duration-300"
              style={{
                color: 'var(--color-text-secondary)',
                transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </div>
        )}
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {project.shortDescription}
        </p>
      </div>
    </div>
  )
}

function ExpansionPanel({ project, onImageClick }) {
  const hasLinks = project.links && project.links.length > 0
  return (
    <div
      className="w-full rounded-2xl p-8"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <h3 className="font-semibold text-base mb-6" style={{ color: 'var(--color-text-primary)' }}>
        {project.title}
      </h3>
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-8 w-fit mx-auto">
        {['what', 'how', 'result'].map((key) => {
          const block = project[key]
          return (
            <div key={key} className="flex flex-col gap-3 shrink-0 items-start">
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {key}
              </p>
              <div
                className="self-center rounded-xl flex items-center justify-center cursor-zoom-in"
                style={{ height: '200px', backgroundColor: 'var(--color-border)' }}
                onClick={() => onImageClick(block.photo, key)}
              >
                <img
                  src={block.photo}
                  alt={key}
                  className="rounded-xl"
                  style={{ maxHeight: '200px', maxWidth: '300px', objectFit: 'contain' }}
                  loading="lazy"
                />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)', maxWidth: '300px' }}>
                {block.text}
              </p>
            </div>
          )
        })}
        </div>
      </div>
      {hasLinks && (
        <div className="flex flex-wrap gap-3 mt-6 pt-5" style={{ borderTop: '1px solid var(--color-border)' }}>
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors duration-150"
              style={{
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-background)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-text-primary)'
                e.currentTarget.style.borderColor = 'var(--color-text-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-secondary)'
                e.currentTarget.style.borderColor = 'var(--color-border)'
              }}
            >
              <ExternalLink size={13} />
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function OtherProjectRow({ project, onImageClick }) {
  const images = otherImagesByDir[project.imageDir] || []
  const [imgIndex, setImgIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null)
  const [direction, setDirection] = useState('next')

  const goTo = useCallback((newIndex, dir = 'next') => {
    setDirection(dir)
    setPrevIndex((prev) => (prev !== null ? prev : imgIndex))
    setImgIndex(newIndex)
  }, [imgIndex])

  useEffect(() => {
    if (prevIndex === null) return
    const t = setTimeout(() => setPrevIndex(null), 320)
    return () => clearTimeout(t)
  }, [imgIndex, prevIndex])

  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(() => {
      goTo((imgIndex + 1) % images.length, 'next')
    }, 4000)
    return () => clearInterval(interval)
  }, [images.length, imgIndex, goTo])

  const handlePrev = (e) => {
    e.stopPropagation()
    goTo((imgIndex - 1 + images.length) % images.length, 'prev')
  }

  const handleNext = (e) => {
    e.stopPropagation()
    goTo((imgIndex + 1) % images.length, 'next')
  }

  return (
    <div
      className="flex gap-6 rounded-xl p-4"
      style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }}
    >
      {/* Image area */}
      <div
        className="relative shrink-0 rounded-lg overflow-hidden flex items-center justify-center"
        style={{ width: '240px', height: '165px', backgroundColor: 'var(--color-border)' }}
      >
        {images.length > 0 && (
          <>
            {prevIndex !== null && (
              <img
                key={`prev-${prevIndex}`}
                src={images[prevIndex]}
                alt={project.title}
                className="absolute inset-0 w-full h-full"
                style={{
                  objectFit: 'cover',
                  animation: `${direction === 'next' ? 'slide-out-to-left' : 'slide-out-to-right'} 0.32s ease forwards`,
                }}
              />
            )}
            <img
              key={`curr-${imgIndex}`}
              src={images[imgIndex]}
              alt={project.title}
              className="absolute inset-0 w-full h-full cursor-zoom-in"
              style={{
                objectFit: 'cover',
                animation: prevIndex !== null ? `${direction === 'next' ? 'slide-in-from-right' : 'slide-in-from-left'} 0.32s ease forwards` : undefined,
              }}
              onClick={() => onImageClick(images[imgIndex], project.title)}
            />
          </>
        )}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full p-0.5 opacity-70 hover:opacity-100 transition-opacity"
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)', border: 'none', cursor: 'pointer', zIndex: 1 }}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-0.5 opacity-70 hover:opacity-100 transition-opacity"
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)', border: 'none', cursor: 'pointer', zIndex: 1 }}
            >
              <ChevronRight size={14} />
            </button>
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1" style={{ zIndex: 1 }}>
              {images.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === imgIndex ? '14px' : '6px',
                    height: '6px',
                    backgroundColor: i === imgIndex ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    opacity: i === imgIndex ? 0.9 : 0.5,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Text area */}
      <div className="flex flex-col gap-1.5 justify-center">
        <h4 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
          {project.title}
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {project.description}
        </p>
        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md transition-colors duration-150"
                style={{
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)'
                  e.currentTarget.style.borderColor = 'var(--color-text-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)'
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                }}
              >
                <ExternalLink size={11} />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function OtherProjectsList({ onImageClick }) {
  return (
    <div
      className="w-full rounded-2xl p-8"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <h3 className="font-semibold text-base mb-6" style={{ color: 'var(--color-text-primary)' }}>
        Other Projects
      </h3>
      <div className="flex flex-col gap-4">
        {otherProjects.map((project, i) => (
          <OtherProjectRow key={i} project={project} onImageClick={onImageClick} />
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [lightbox, setLightbox] = useState(null)
  const cols = useColumns()

  const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), [])
  const closeLightbox = useCallback(() => setLightbox(null), [])

  const rows = []
  for (let i = 0; i < projects.length; i += cols) {
    rows.push(projects.slice(i, i + cols))
  }

  const handleClick = (globalIndex) => {
    setActiveIndex(activeIndex === globalIndex ? null : globalIndex)
  }

  return (
    <section id="projects" className="py-24">
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />}
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10" style={{ color: 'var(--color-text-primary)' }}>
          Projects
        </h2>
        <div className="flex flex-col gap-6">
          {rows.map((row, rowIndex) => {
            const activeColIndex = row.findIndex(
              (_, ci) => activeIndex === rowIndex * cols + ci
            )
            const activeProject = activeColIndex !== -1
              ? projects[rowIndex * cols + activeColIndex]
              : null
            return (
              <div key={rowIndex} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {row.map((project, colIndex) => {
                    const globalIndex = rowIndex * cols + colIndex
                    return (
                      <ProjectCard
                        key={globalIndex}
                        project={project}
                        isActive={activeIndex === globalIndex}
                        onClick={() => handleClick(globalIndex)}
                        lazy={globalIndex >= 3}
                      />
                    )
                  })}
                </div>
                {activeProject && (
                  activeProject.isOther
                    ? <OtherProjectsList onImageClick={openLightbox} />
                    : <ExpansionPanel project={activeProject} onImageClick={openLightbox} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
