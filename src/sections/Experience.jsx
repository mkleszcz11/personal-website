import { useState } from 'react'
import { professional, education, courses } from '../data/experience'

const TABS = [
  { label: 'Professional Experience', key: 'professional' },
  { label: 'Education', key: 'education' },
  { label: 'Extracurricular', key: 'courses' },
]

function TimelineEntry({ item, isCourse }) {
  return (
    <div className="relative pl-[72px]">
      {/* logo or dot */}
      {item.logo ? (
        <div
          className="absolute left-0 top-0.5 w-14 h-14 rounded overflow-hidden flex items-center justify-center shrink-0"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <img src={item.logo} alt="" className="w-full h-full object-contain p-1" />
        </div>
      ) : (
        <span
          className="absolute left-[22px] top-1.5 w-3 h-3 rounded-full border-2"
          style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-text-primary)' }}
        />
      )}
      <div className="pb-10">
        <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
          {item.dates}
        </p>
        <h3 className="font-semibold text-base" style={{ color: 'var(--color-text-primary)' }}>
          {item.title}
        </h3>
        <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
          {isCourse ? item.provider : `${item.company}${item.location ? ` · ${item.location}` : ''}`}
        </p>
        <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {item.description}
        </p>
        {item.links && item.links.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-2">
            {item.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline underline-offset-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState('professional')
  const [fading, setFading] = useState(false)

  const switchTab = (key) => {
    if (key === activeTab) return
    setFading(true)
    setTimeout(() => {
      setActiveTab(key)
      setFading(false)
    }, 150)
  }

  const data =
    activeTab === 'professional' ? professional : activeTab === 'education' ? education : courses

  return (
    <section id="experience" className="py-24 pt-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10" style={{ color: 'var(--color-text-primary)' }}>
          Experience
        </h2>

        {/* Tabs */}
        <div
          className="flex gap-8 mb-12 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => switchTab(tab.key)}
                className="pb-3 text-sm font-medium transition-colors duration-150 whitespace-nowrap"
                style={{
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  marginBottom: '-1px',
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--color-text-primary)' : '2px solid transparent',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Timeline */}
        <div
          className="relative transition-opacity duration-150"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {/* vertical line */}
          <div
            className="absolute left-7 top-2 bottom-0 w-px"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
          {data.map((item, i) => (
            <TimelineEntry key={i} item={item} isCourse={activeTab === 'courses'} />
          ))}
        </div>
      </div>
    </section>
  )
}
