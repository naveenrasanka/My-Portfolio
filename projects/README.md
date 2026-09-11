# Adding a project

Use this structure for every new project:

```text
images/
  projects/
    my-project/
      cover.jpg
      screen-1.jpg
      screen-2.jpg
      screen-3.jpg
```

## 1. Add the project data

Open `script.js` and add a new entry inside `projectData`:

```js
myProject: {
  category: "04 / WEB APP",
  title: "My Project",
  description: "A short description shown on the project card.",
  skills: ["HTML", "CSS", "JavaScript"],
  details: "A longer explanation shown after the project card is clicked.",
  images: [
    "images/projects/my-project/cover.jpg",
    "images/projects/my-project/screen-1.jpg",
    "images/projects/my-project/screen-2.jpg",
    "images/projects/my-project/screen-3.jpg"
  ]
}
```

## 2. Add the project card

Inside the `.project-grid` in `index.html`, copy an existing project card and update:

- `data-project` to exactly match the data key
- the image path and alt text
- category, title, short description, and skills

Example:

```html
<article class="project-card" tabindex="0" role="button" data-project="myProject">
  <div class="project-art">
    <img src="images/projects/my-project/cover.jpg" alt="My Project preview" />
  </div>
  <div class="project-number">04 / WEB APP</div>
  <h3>My Project</h3>
  <p>A short description shown on the project card.</p>
  <div class="project-tags">
    <span>HTML</span>
    <span>JavaScript</span>
    <span class="project-arrow">↗</span>
  </div>
</article>
```

The modal, automatic carousel, arrows, image dots, and keyboard controls are already handled by `script.js`.
