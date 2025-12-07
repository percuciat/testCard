import { fetchCourses, fetchMoreCourses, getCategoryCounts } from './mockApi.js';
import { renderCourses } from './courseCard.js';

const DEFAULT_LIMIT = 9;
const MORE_LIMIT = 3;

class CoursesFilter {
  constructor() {
    this.grid = document.querySelector('.courses-grid');
    this.tabs = document.querySelectorAll('.tabs__item');
    this.loadMoreBtn = document.querySelector('.load-more');
    this.searchInput = document.querySelector('.search__input');

    this.currentCategory = 'All';
    this.loadedCount = 0;
    this.isLoading = false;

    this.init();
  }

  async init() {
    this.updateTabCounts();
    this.bindEvents();

    // Добавляем data-category к существующим карточкам
    this.syncExistingCards();
    this.loadedCount = this.grid.querySelectorAll('.course-card').length;

    await this.checkHasMore();
  }

  // Синхронизируем существующие карточки с data-атрибутами
  syncExistingCards() {
    const cards = this.grid.querySelectorAll('.course-card');
    cards.forEach((card) => {
      const tag = card.querySelector('.course-card__tag');
      if (tag) {
        card.dataset.category = tag.textContent.trim();
      }
    });
  }

  // Обновляем счётчики в табах
  updateTabCounts() {
    const counts = getCategoryCounts();

    this.tabs.forEach((tab) => {
      const category = this.getTabCategory(tab);
      const count = counts[category] || 0;
      const sup = tab.querySelector('sup');
      if (sup) {
        sup.textContent = count;
      }
    });
  }

  // Получаем категорию из таба
  getTabCategory(tab) {
    return tab.dataset.category || 'All';
  }

  bindEvents() {
    // Клик по табам
    this.tabs.forEach((tab) => {
      tab.addEventListener('click', () => this.handleTabClick(tab));
    });

    // Клик по "Load more"
    this.loadMoreBtn.addEventListener('click', () => this.handleLoadMore());

    // Поиск
    this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
  }

  async handleTabClick(tab) {
    if (this.isLoading) {
      return;
    }

    // Сбрасываем поиск
    this.searchInput.value = '';

    // Обновляем активный таб
    this.tabs.forEach((t) => t.classList.remove('tabs__item--active'));
    tab.classList.add('tabs__item--active');

    this.currentCategory = this.getTabCategory(tab);
    this.loadedCount = 0;

    // Загружаем курсы для выбранной категории
    await this.loadCourses();
  }

  async loadCourses() {
    this.setLoading(true);

    try {
      const { courses, hasMore } = await fetchCourses({
        category: this.currentCategory,
        offset: 0,
        limit: DEFAULT_LIMIT,
      });

      renderCourses(this.grid, courses, false);
      this.loadedCount = courses.length;
      this.toggleLoadMore(hasMore);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      this.setLoading(false);
    }
  }

  async handleLoadMore() {
    if (this.isLoading) {
      return;
    }

    this.setLoading(true);

    try {
      const { courses, hasMore } = await fetchMoreCourses({
        category: this.currentCategory,
        offset: this.loadedCount,
        limit: MORE_LIMIT,
      });

      renderCourses(this.grid, courses, true);
      this.loadedCount += courses.length;
      this.toggleLoadMore(hasMore);
    } catch (error) {
      console.error('Error loading more courses:', error);
    } finally {
      this.setLoading(false);
    }
  }

  handleSearch(query) {
    const cards = this.grid.querySelectorAll('.course-card');
    const searchTerm = query.toLowerCase().trim();

    cards.forEach((card) => {
      const title = card.querySelector('.course-card__title').textContent.toLowerCase();
      const author = card.querySelector('.course-card__author').textContent.toLowerCase();
      const category = card.dataset.category.toLowerCase();
      const price = card.querySelector('.course-card__price').textContent.toLowerCase();

      const matches =
        !searchTerm ||
        title.includes(searchTerm) ||
        author.includes(searchTerm) ||
        category.includes(searchTerm) ||
        price.includes(searchTerm);

      card.style.display = matches ? '' : 'none';
    });
  }

  async checkHasMore() {
    this.toggleLoadMore(this.loadedCount < this.totalCount);
  }

  toggleLoadMore(show) {
    this.loadMoreBtn.style.display = show ? '' : 'none';
  }

  setLoading(loading) {
    this.isLoading = loading;
    this.loadMoreBtn.classList.toggle('load-more--loading', loading);

    if (loading) {
      this.grid.classList.add('courses-grid--loading');
    } else {
      this.grid.classList.remove('courses-grid--loading');
    }
  }
}

export function initFilter() {
  return new CoursesFilter();
}
