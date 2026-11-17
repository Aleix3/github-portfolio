const filterGroup = document.querySelector('.filters');
const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project');
const projectCount = document.querySelector('.project-count');

if (filterGroup && projectCount) {
  filterGroup.hidden = false;
  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      let visible = 0;
      projects.forEach((project) => {
        project.hidden = category !== 'all' && project.dataset.category !== category;
        if (!project.hidden) visible += 1;
      });
      filters.forEach((filter) => {
        const selected = filter === button;
        filter.classList.toggle('is-active', selected);
        filter.setAttribute('aria-pressed', String(selected));
      });
      projectCount.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
    });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const navLinks = document.querySelectorAll('.nav-links a');
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = [...navLinks].find((item) => item.getAttribute('href') === `#${entry.target.id}`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach((item) => item.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px' });
  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) sectionObserver.observe(section);
  });
}
