const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const pageLoader = document.querySelector("#page-loader");
const projectModal = document.querySelector("#project-modal");
const modalTitle = document.querySelector("#modal-title");
const modalCategory = document.querySelector("#modal-category");
const modalDescription = document.querySelector("#modal-description");
const modalSkills = document.querySelector("#modal-skills");
const modalDetails = document.querySelector("#modal-details");
const modalGallery = document.querySelector("#modal-gallery");
const galleryDots = document.querySelector("#gallery-dots");
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");
const imageLightbox = document.querySelector("#image-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
let galleryTimer;
let activeGalleryImages = [];
let activeGalleryIndex = 0;
// Add new project entries here. Each key must match a card's data-project value.
const projectData = {
  studentManagement: {
    category: "01 / JAVA GROUP PROJECT",
    title: "Student Management System",
    description: "An academic management application built with Java Swing and database integration.",
    skills: [
      "Java",
      "Java Swing",
      "MySQL",
      "Git",
      "Software Development",
      "Desktop Application Development",
      "GitHub",
      "Database Integration",
      "Object-Oriented Programming (OOP)",
      "GUI Development"
    ],
    details: "Academic management group project completed from January 2026 to June 2026. Developed modules for lecture management, marks handling, GPA calculation, timetable display, and notice management using a Java Swing GUI connected to a database.",
    images: [
      "images/projects/java-project/cover.png",
      "images/projects/java-project/screen-1.png",
      "images/projects/java-project/screen-2.png",
      "images/projects/java-project/screen-3.png"
    ]
  },
  databaseManagement: {
    category: "02 / DATABASE MINI PROJECT",
    title: "Database Management System Mini Project",
    description: "A student marks management and GPA calculation module designed with MySQL and relational database principles.",
    skills: [
      "MySQL",
      "Database Management System (DBMS)",
      "Relational Databases",
      "Database Design"
    ],
    details: "Mini project completed from July 2025 to November 2025. Developed the student marks management module by designing marks-related tables and implementing stored procedures for calculating final marks, grades, GPA, and SGPA.",
    images: [
      "images/projects/Database-project/cover.jpg",
      "images/projects/Database-project/screen-1.jpg",
      "images/projects/Database-project/sreen-2.jpg"
    ]
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
  window.clearInterval(galleryTimer);
  closeImageLightbox();
  projectModal.hidden = true;
  document.body.classList.remove("modal-open");
};

const closeImageLightbox = () => {
  if (imageLightbox) imageLightbox.hidden = true;
};

const openImageLightbox = (image) => {
  if (!imageLightbox || !lightboxImage) return;
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  imageLightbox.hidden = false;
};

const showLightboxImage = (index) => {
  showGalleryImage(index);
  openImageLightbox(activeGalleryImages[activeGalleryIndex]);
};

const showGalleryImage = (index) => {
  activeGalleryIndex = (index + activeGalleryImages.length) % activeGalleryImages.length;
  modalGallery.replaceChildren(activeGalleryImages[activeGalleryIndex]);
  modalGallery.querySelector("img")?.addEventListener("click", (event) => {
    event.stopPropagation();
    openImageLightbox(event.currentTarget);
  });
  galleryDots.querySelectorAll("button").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === activeGalleryIndex);
    dot.setAttribute("aria-current", dotIndex === activeGalleryIndex ? "true" : "false");
  });
  if (imageLightbox && !imageLightbox.hidden) {
    lightboxImage.src = activeGalleryImages[activeGalleryIndex].src;
    lightboxImage.alt = activeGalleryImages[activeGalleryIndex].alt;
  }
};

const restartGalleryTimer = () => {
  window.clearInterval(galleryTimer);
  galleryTimer = window.setInterval(() => {
    showGalleryImage(activeGalleryIndex + 1);
  }, 2800);
};

const openProjectModal = (projectKey) => {
  const project = projectData[projectKey];
  if (!project || !projectModal) return;
  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalDetails.textContent = project.details;
  activeGalleryImages = project.images.map((image, index) => {
    const galleryImage = document.createElement("img");
    galleryImage.src = image;
    galleryImage.alt = `${project.title} screenshot ${index + 1}`;
    return galleryImage;
  });
  galleryDots.replaceChildren(...project.images.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show project image ${index + 1}`);
    dot.addEventListener("click", () => {
      showGalleryImage(index);
      restartGalleryTimer();
    });
    return dot;
  }));
  showGalleryImage(0);
  restartGalleryTimer();
  modalSkills.replaceChildren(...project.skills.map((skill) => {
    const tag = document.createElement("span");
    tag.textContent = skill;
    return tag;
  }));
  projectModal.hidden = false;
  document.body.classList.add("modal-open");
};

galleryPrev?.addEventListener("click", () => {
  showGalleryImage(activeGalleryIndex - 1);
  restartGalleryTimer();
});

galleryNext?.addEventListener("click", () => {
  showGalleryImage(activeGalleryIndex + 1);
  restartGalleryTimer();
});

modalGallery?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLImageElement) openImageLightbox(event.target);
});

lightboxPrev?.addEventListener("click", () => {
  showLightboxImage(activeGalleryIndex - 1);
});

lightboxNext?.addEventListener("click", () => {
  showLightboxImage(activeGalleryIndex + 1);
});

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
document.querySelector(".lightbox-close")?.addEventListener("click", closeImageLightbox);
imageLightbox?.addEventListener("click", (event) => {
  if (event.target === imageLightbox) closeImageLightbox();
});
projectModal?.addEventListener("click", (event) => {
  if (event.target === projectModal) closeProjectModal();
});
document.addEventListener("keydown", (event) => {
  if (imageLightbox && !imageLightbox.hidden && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    event.preventDefault();
    showLightboxImage(activeGalleryIndex + (event.key === "ArrowRight" ? 1 : -1));
    return;
  }
  if (event.key === "Escape") {
    if (imageLightbox && !imageLightbox.hidden) closeImageLightbox();
    else closeProjectModal();
  }
});
