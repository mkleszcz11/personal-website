import { skills } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12" style={{ color: 'var(--color-text-primary)' }}>
          Skills
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {skills.map((group) => (
            <div key={group.category}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-4 pb-2"
                style={{
                  color: 'var(--color-text-secondary)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                {group.category}
              </h3>
              <ul className="flex flex-col gap-4">
                {group.items.map((skill) => (
                  <li key={skill.name} className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {skill.name}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {skill.context}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
