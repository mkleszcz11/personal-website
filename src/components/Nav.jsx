import { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X, FileDown } from 'lucide-react'
import { config } from '../data/config'

export default function Nav({ darkMode, toggleDark }) {
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = config.navLinks.map((link) => link.toLowerCase())

    const handleScroll = () => {
      const threshold = window.scrollY + window.innerHeight * 0.35
      let active = sections[0]
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= threshold) active = id
      }
      setActiveSection(active)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (link) => {
    const id = link.toLowerCase()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : ''
      }`}
      style={{ backgroundColor: 'var(--color-background)', borderBottom: '1px solid var(--color-border)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-bold text-xl tracking-tight"
          style={{ color: 'var(--color-text-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {config.name}
        </button>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-8">
          {config.navLinks.map((link) => {
            const isActive = activeSection === link.toLowerCase()
            return (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link)}
                  className="text-sm font-medium pb-1 transition-colors duration-150"
                  style={{
                    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    background: 'none',
                    border: 'none',
                    borderBottom: isActive ? '2px solid var(--color-text-primary)' : '2px solid transparent',
                    cursor: 'pointer',
                    padding: '0 0 4px 0',
                  }}
                >
                  {link}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <a
            href={config.cvUrl}
            download
            className="hidden md:flex items-center gap-1.5 text-sm font-medium"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <FileDown size={16} />
            CV
          </a>

          <button
            onClick={toggleDark}
            className="p-1.5 rounded-md transition-colors duration-150"
            style={{ color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: 'var(--color-text-primary)', background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)' }}
        >
          <ul className="flex flex-col px-6 py-4 gap-4">
            {config.navLinks.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link)}
                  className="text-sm font-medium w-full text-left"
                  style={{ color: 'var(--color-text-primary)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {link}
                </button>
              </li>
            ))}
            <li>
              <a
                href={config.cvUrl}
                download
                className="flex items-center gap-1.5 text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <FileDown size={16} />
                Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
