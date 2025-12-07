// Создание HTML карточки курса
export function createCourseCard(course) {
  const card = document.createElement('div');
  card.className = 'course-card';
  card.dataset.category = course.category;

  card.innerHTML = `
    <div class="course-card__image">
      <img src="/assets/mockCard.jpg" alt="${course.title}" />
    </div>
    <div class="course-card__content">
      <span class="course-card__tag course-card__tag--${course.color}">${course.category}</span>
      <h3 class="course-card__title">${course.title}</h3>
      <div class="course-card__meta">
        <span class="course-card__price">$${course.price}</span>
        <span class="course-card__author">by ${course.author}</span>
      </div>
    </div>
  `;

  return card;
}

// Рендер списка карточек
export function renderCourses(container, courses, append = false) {
  if (!append) {
    container.innerHTML = '';
  }

  const fragment = document.createDocumentFragment();
  courses.forEach((course) => {
    fragment.appendChild(createCourseCard(course));
  });

  container.appendChild(fragment);
}
