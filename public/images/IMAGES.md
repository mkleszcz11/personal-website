# Images

## avatar.jpg
Your profile photo shown on the About page.
Recommended: square, at least 600×600px, JPG or WebP.

---

## projects/
One folder per project. Each folder holds up to 4 images:

| File        | Used for                                      | Recommended size |
|-------------|-----------------------------------------------|------------------|
| cover.jpg   | Card thumbnail (shown in the project grid)    | 800×500px        |
| what.jpg    | "What" panel in the expanded description      | 600×360px        |
| how.jpg     | "How" panel in the expanded description       | 600×360px        |
| result.jpg  | "Result" panel in the expanded description    | 600×360px        |

### Folder names
Each folder name matches the project slug used in `src/data/projects.js`.
When you add a new project, create a new folder here with the same slug.

```
public/images/
  avatar.jpg
  projects/
    realtime-pipeline/
      cover.jpg
      what.jpg
      how.jpg
      result.jpg
    analytics-dashboard/
      cover.jpg
      ...
```

### Updating paths in data
In `src/data/projects.js`, reference images like this:

```js
{
  title: "RealTime Pipeline",
  photo: "/images/projects/realtime-pipeline/cover.jpg",
  what:   { photo: "/images/projects/realtime-pipeline/what.jpg",   text: "..." },
  how:    { photo: "/images/projects/realtime-pipeline/how.jpg",    text: "..." },
  result: { photo: "/images/projects/realtime-pipeline/result.jpg", text: "..." },
}
```

All paths start with `/images/` — no `public/` prefix needed.
