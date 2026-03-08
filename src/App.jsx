import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode')
    if (stored !== null) return stored === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', String(darkMode))
  }, [darkMode])

  const toggleDark = () => setDarkMode((prev) => !prev)

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh' }}>
      <Nav darkMode={darkMode} toggleDark={toggleDark} />
      <main>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
