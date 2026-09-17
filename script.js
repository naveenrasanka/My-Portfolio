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
const neuralNetworks = document.querySelectorAll(".neural-network");
let galleryTimer;
let activeGalleryImages = [];
let activeGalleryIndex = 0;

const startNeuralNetwork = (neuralNetwork) => {
  if (!(neuralNetwork instanceof HTMLCanvasElement)) return;
  const context = neuralNetwork.getContext("2d");
  if (!context) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const nodes = [];
  let animationFrame;
  let width = 0;
  let height = 0;

  const resize = () => {
    const bounds = neuralNetwork.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = bounds.width;
    height = bounds.height;
    neuralNetwork.width = Math.round(width * pixelRatio);
    neuralNetwork.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const nodeCount = width < 700 ? 30 : 58;
    nodes.length = 0;
    for (let index = 0; index < nodeCount; index += 1) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1.1 + Math.random() * 1.8,
        speedX: (Math.random() - .5) * .18,
        speedY: (Math.random() - .5) * .14,
        accent: Math.random() > .76
      });
    }
    draw();
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    const linkDistance = width < 700 ? 115 : 145;

    nodes.forEach((node, nodeIndex) => {
      nodes.slice(nodeIndex + 1).forEach((other) => {
        const distanceX = node.x - other.x;
        const distanceY = node.y - other.y;
        const distance = Math.hypot(distanceX, distanceY);
        if (distance > linkDistance) return;
        const opacity = (1 - distance / linkDistance) * .16;
        context.beginPath();
        context.moveTo(node.x, node.y);
        context.lineTo(other.x, other.y);
        context.strokeStyle = `rgba(255, 118, 0, ${opacity})`;
        context.lineWidth = .7;
        context.stroke();
      });
    });

    nodes.forEach((node) => {
      context.beginPath();
      context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      context.fillStyle = node.accent
        ? "rgba(255, 151, 65, .78)"
        : "rgba(184, 198, 204, .48)";
      context.shadowBlur = node.accent ? 10 : 0;
      context.shadowColor = "rgba(255, 118, 0, .8)";
      context.fill();
      context.shadowBlur = 0;

      if (!prefersReducedMotion.matches) {
        node.x += node.speedX;
        node.y += node.speedY;
        if (node.x < -10 || node.x > width + 10) node.speedX *= -1;
        if (node.y < -10 || node.y > height + 10) node.speedY *= -1;
      }
    });
  };

  const animate = () => {
    draw();
    animationFrame = window.requestAnimationFrame(animate);
  };

  window.addEventListener("resize", resize);
  resize();
  if (!prefersReducedMotion.matches) animate();
  window.addEventListener("pagehide", () => {
    window.cancelAnimationFrame(animationFrame);
    window.removeEventListener("resize", resize);
  }, { once: true });
};

neuralNetworks.forEach(startNeuralNetwork);

const updateSlides = [
  {
    image: "images/updates/image-1.jpeg",
    category: "LATEST UPDATE",
    title: "A New Portfolio Moment",
    description: "Sharing a recent event, certificate, or work experience from my development journey."
  },
  {
    image: "images/projects/java-project/screen-1.png",
    category: "PROJECT WORK",
    title: "Student Management System",
    description: "Building practical Java applications with a Swing interface and database integration."
  },
  {
    image: "images/projects/Database-project/screen-1.jpg",
    category: "PROJECT WORK",
    title: "Database Management System",
    description: "Designing relational tables and stored procedures for marks, grades, GPA, and SGPA calculations."
  },
  {
    image: "images/projects/java-project/screen-2.png",
    category: "LEARNING",
    title: "Learning Through Projects",
    description: "Turning classroom concepts into useful software and strengthening problem-solving skills."
  },
  {
    image: "images/Home-Image/Home-01.jpg",
    category: "EXPERIENCE",
    title: "Growing as a Developer",
    description: "Exploring new technologies and building a foundation for thoughtful digital experiences."
  }
];
const updatesImage = document.querySelector("#updates-image");
const updatesCategory = document.querySelector("#updates-category");
const updatesTitle = document.querySelector("#updates-title-text");
const updatesDescription = document.querySelector("#updates-description");
const updatesCounter = document.querySelector("#updates-counter");
const updatesDots = document.querySelector("#updates-dots");
let activeUpdateIndex = 0;
let updatesTimer;

const showUpdate = (index) => {
  if (!updatesImage || !updatesCategory || !updatesTitle || !updatesDescription || !updatesCounter || !updatesDots) return;
  activeUpdateIndex = (index + updateSlides.length) % updateSlides.length;
  const slide = updateSlides[activeUpdateIndex];
  updatesImage.classList.add("is-changing");
  window.setTimeout(() => {
    updatesImage.src = slide.image;
    updatesImage.alt = slide.title;
    updatesCategory.textContent = slide.category;
    updatesTitle.textContent = slide.title;
    updatesDescription.textContent = slide.description;
    updatesCounter.textContent = `${String(activeUpdateIndex + 1).padStart(2, "0")} / ${String(updateSlides.length).padStart(2, "0")}`;
    updatesDots.querySelectorAll("button").forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === activeUpdateIndex);
    });
    updatesImage.classList.remove("is-changing");
  }, 250);
};

const restartUpdates = () => {
  window.clearInterval(updatesTimer);
  updatesTimer = window.setInterval(() => showUpdate(activeUpdateIndex + 1), 4500);
};

if (updatesDots) {
  updatesDots.replaceChildren(...updateSlides.map((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show update ${index + 1}: ${slide.title}`);
    dot.addEventListener("click", () => {
      showUpdate(index);
      restartUpdates();
    });
    return dot;
  }));
  showUpdate(0);
  restartUpdates();
}

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
