# Marcin Kleszcz - Personal Portfolio

Built with React 18, Vite, and Tailwind CSS v3. Strict monochrome palette with full light/dark mode.

## Getting started

```bash
npm install
npm run dev
```

---

## How to update content

All content lives in `src/data/`. You never need to touch component code.

### Add a new project

Open `src/data/projects.js` and append an object to the `projects` array:

```js
{
  title: "My New Project",
  photo: "/images/my-project.jpg",           // place image in /public/images/
  shortDescription: "One-line summary.",
  what:   { photo: "/images/p-what.jpg",   text: "What it does." },
  how:    { photo: "/images/p-how.jpg",    text: "How it was built." },
  result: { photo: "/images/p-result.jpg", text: "Outcome." },
}
```

### Add a work experience entry

Open `src/data/experience.js` and append to `professional`, `education`, or `courses`:

```js
// professional / education
{
  title: "Job Title",
  company: "Company Name",
  location: "City, Country",
  dates: "Jan 2024 – Present",
  description: "What you did.",
}

// courses
{
  title: "Course Name",
  provider: "Platform",
  dates: "2024",
  description: "What you learned.",
}
```

### Add a skill

Open `src/data/skills.js`. Either add an item to an existing category or add a new category:

```js
{ category: "New Category", items: ["Tool A", "Tool B"] }
```

### Update personal info

Edit `src/data/config.js` to change your name, email, LinkedIn URL, CV link, or bio paragraphs.

---

## Project structure

```
src/
  data/          # All site content — edit here
  components/    # Nav, Footer
  sections/      # About, Experience, Projects, Skills, Contact
public/
  images/        # Place project/avatar photos here
```
