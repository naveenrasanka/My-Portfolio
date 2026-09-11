const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const pageLoader = document.querySelector("#page-loader");
const projectModal = document.querySelector("#project-modal");
const modalTitle = document.querySelector("#modal-title");
const modalCategory = document.querySelector("#modal-category");
const modalDescription = document.querySelector("#modal-description");
const modalSkills = document.querySelector("#modal-skills");
const modalDetails = document.querySelector("#modal-details");
const projectData = {
  dashboard: {
    category: "01 / WEB APP",
    title: "Studio dashboard",
    description: "A focused analytics workspace for creative teams with clear data visualizations.",
    skills: ["React", "JavaScript", "CSS", "Charts"],
    details: "This concept brings campaign metrics, team activity, and performance trends into one calm workspace. The interface is designed around quick scanning, reusable components, and responsive layouts."
  },
  journal: {
    category: "02 / PRODUCT",
    title: "Nomad journal",
    description: "A calm, editorial travel journal made for curious people on the move.",
    skills: ["JavaScript", "HTML", "CSS", "UI Design"],
    details: "Nomad journal combines long-form storytelling with location-based collections. The visual system uses generous spacing, readable typography, and lightweight interactions to keep the focus on the story."
  },
  launch: {
    category: "03 / BRAND",
    title: "Launch kit",
    description: "A flexible landing page system for ambitious startups ready to grow.",
    skills: ["HTML", "CSS", "Responsive Design", "Branding"],
    details: "Launch kit is a modular landing page foundation with reusable sections, strong calls to action, and a responsive layout that can be adapted quickly for new products."
  }
};

window.addEventListener("load", () => {
  window.setTimeout(() => pageLoader?.classList.add("is-hidden"), 700);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const closeProjectModal = () => {
  if (!projectModal) return;
  projectModal.hidden = true;
  document.body.classList.remove("modal-open");
};

const openProjectModal = (projectKey) => {
  const project = projectData[projectKey];
  if (!project || !projectModal) return;
  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalDetails.textContent = project.details;
  modalSkills.replaceChildren(...project.skills.map((skill) => {
    const tag = document.createElement("span");
    tag.textContent = skill;
    return tag;
  }));
  projectModal.hidden = false;
  document.body.classList.add("modal-open");
};

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => openProjectModal(card.dataset.project));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectModal(card.dataset.project);
    }
  });
});

document.querySelector(".modal-close")?.addEventListener("click", closeProjectModal);
projectModal?.addEventListener("click", (event) => {
  if (event.target === projectModal) closeProjectModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProjectModal();
});
