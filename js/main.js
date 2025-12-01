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
    title: "HR Management and Analytics",
    category: "hr",
    price: 200,
    author: "Leslie Alexander Li",
    image: "assets/images/course-3.jpg",
  },
  {
    id: 5,
    title: "HR Management and Analytics",
    category: "hr",
    price: 200,
    author: "Leslie Alexander Li",
    image: "assets/images/course-3.jpg",
  },
  {
    id: 6,
    title: "HR Management and Analytics",
    category: "hr",
    price: 200,
    author: "Leslie Alexander Li",
    image: "assets/images/course-3.jpg",
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
      card.classList.remove("course-card--hidden");
      visibleCards++;
    } else {
      card.classList.add("course-card--hidden");
    }
  });

  // Показ/скрытие кнопки Load More
  elements.loadMoreBtn.style.display =
    visibleCards > state.visibleCount ? "flex" : "none";
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

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
  filterCourses();
});
