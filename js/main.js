const coursesData = [
  {
    id: 1,
    title: "The Ultimate Google Ads Training Course",
    category: "marketing",
    price: 100,
    author: "Jerome Bell",
    image: "assets/images/course-1.jpg",
  },
  {
    id: 2,
    title: "Product Management Fundamentals",
    category: "management",
    price: 480,
    author: "Marvin McKinney",
    image: "assets/images/course-2.jpg",
  },
  {
    id: 3,
    title: "HR Management and Analytics",
    category: "hr",
    price: 200,
    author: "Leslie Alexander Li",
    image: "assets/images/course-3.jpg",
  },
  {
    id: 4,
    title: "Brand Management & PR Communications",
    category: "marketing",
    price: 530,
    author: "Kristin Watson",
    image: "assets/images/course-1.jpg",
  },
  {
    id: 5,
    title: "Graphic Design Basic",
    category: "design",
    price: 500,
    author: "Guy Hawkins",
    image: "assets/images/course-2.jpg",
  },
  {
    id: 6,
    title: "Business Development Management",
    category: "management",
    price: 400,
    author: "Dianne Russell",
    image: "assets/images/course-3.jpg",
  },
  {
    id: 7,
    title: "Highload Software Architecture",
    category: "development",
    price: 600,
    author: "Brooklyn Simmons",
    image: "assets/images/course-1.jpg",
  },
  {
    id: 8,
    title: "Human Resources – Selection and Recruitment",
    category: "hr",
    price: 150,
    author: "Kathryn Murphy",
    image: "assets/images/course-2.jpg",
  },
  {
    id: 9,
    title: "User Experience. Human-centered Design",
    category: "design",
    price: 240,
    author: "Cody Fisher",
    image: "assets/images/course-3.jpg",
  },
  {
    id: 10,
    title: "Social Media Marketing Strategy",
    category: "marketing",
    price: 350,
    author: "Sarah Johnson",
    image: "assets/images/course-2.jpg",
  },
  {
    id: 11,
    title: "Agile Project Management Professional",
    category: "management",
    price: 520,
    author: "Michael Chen",
    image: "assets/images/course-3.jpg",
  },
  {
    id: 12,
    title: "Full Stack Web Development Bootcamp",
    category: "development",
    price: 750,
    author: "Alex Rodriguez",
    image: "assets/images/course-1.jpg",
  },
  {
    id: 13,
    title: "Motion Graphics and Animation",
    category: "design",
    price: 450,
    author: "Emma Davis",
    image: "assets/images/course-3.jpg",
  },
  {
    id: 14,
    title: "Talent Acquisition and Employer Branding",
    category: "hr",
    price: 280,
    author: "Robert Brown",
    image: "assets/images/course-1.jpg",
  },
  {
    id: 15,
    title: "Mobile App Development with React Native",
    category: "development",
    price: 680,
    author: "Nina Patel",
    image: "assets/images/course-2.jpg",
  },
];

// State приложения
const state = {
  activeCategory: "all",
  searchQuery: "",
  visibleCount: 9,
};

// DOM элементы
const elements = {
  grid: document.getElementById("coursesGrid"),
  searchInput: document.getElementById("searchInput"),
  filterButtons: document.querySelectorAll(".filter-btn"),
  loadMoreBtn: document.getElementById("loadMoreBtn"),
};

function createCourseCard(course) {
  return `
      <article class="course-card" data-category="${
        course.category
      }" data-title="${course.title.toLowerCase()}">
        <div class="course-card__image-wrapper">
          <img 
            src="${course.image}" 
            alt="${course.title}"
            class="course-card__image"
            loading="lazy"
          >
        </div>
        <div class="course-card__content">
          <span class="course-card__category course-card__category--${
            course.category
          }">
            ${course.category}
          </span>
          <h3 class="course-card__title">${course.title}</h3>
          <div class="course-card__footer">
            <span class="course-card__price">$${course.price}</span>
            <span class="course-card__author">by ${course.author}</span>
          </div>
        </div>
      </article>
    `;
}

// Рендер всех курсов
function renderCourses() {
  elements.grid.innerHTML = coursesData
    .map((course) => createCourseCard(course))
    .join("");
}

// Фильтрация курсов
function filterCourses() {
  const cards = elements.grid.querySelectorAll(".course-card");
  let visibleCards = 0;

  cards.forEach((card) => {
    const category = card.dataset.category;
    const title = card.dataset.title;

    const matchesCategory =
      state.activeCategory === "all" || category === state.activeCategory;
    const matchesSearch = title.includes(state.searchQuery.toLowerCase());

    if (matchesCategory && matchesSearch) {
      // Показываем только первые visibleCount карточек
      if (visibleCards < state.visibleCount) {
        card.classList.remove("course-card--hidden");
        visibleCards++;
      } else {
        card.classList.add("course-card--hidden");
      }
    } else {
      card.classList.add("course-card--hidden");
    }
  });

  // Проверяем, есть ли еще карточки для показа
  const totalMatching = Array.from(cards).filter((card) => {
    const category = card.dataset.category;
    const title = card.dataset.title;
    const matchesCategory =
      state.activeCategory === "all" || category === state.activeCategory;
    const matchesSearch = title.includes(state.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).length;

  elements.loadMoreBtn.style.display =
    totalMatching > visibleCards ? "flex" : "none";
}

elements.searchInput.addEventListener("input", (e) => {
  state.searchQuery = e.target.value;
  filterCourses();
});

elements.filterButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Удаляем активный класс у всех кнопок
    elements.filterButtons.forEach((b) =>
      b.classList.remove("filter-btn--active")
    );

    // Добавляем активный класс текущей кнопке
    e.currentTarget.classList.add("filter-btn--active");

    // Обновляем состояние и фильтруем
    state.activeCategory = e.currentTarget.dataset.category;
    filterCourses();
  });
});

// Load More функционал
elements.loadMoreBtn.addEventListener("click", () => {
  state.visibleCount += 6;
  filterCourses();
});

function updateFilterCounts() {
  elements.filterButtons.forEach((btn) => {
    const category = btn.dataset.category;
    const count =
      category === "all"
        ? coursesData.length
        : coursesData.filter((c) => c.category === category).length;

    const countEl = btn.querySelector(".filter-btn__count");
    if (countEl) countEl.textContent = count;
  });
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
  updateFilterCounts();
  filterCourses();
});
