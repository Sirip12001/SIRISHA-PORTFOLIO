document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Function to apply theme
  const applyTheme = (theme) => {
    if (theme === 'light') {
      body.classList.add('light-mode');
      themeToggle.checked = true;
    } else {
      body.classList.remove('light-mode');
      themeToggle.checked = false;
    }
  };

  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  // Theme switcher event listener
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      applyTheme('light');
      localStorage.setItem('theme', 'light');
    } else {
      applyTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  // Smooth scrolling for navigation links
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.main-nav a');
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      
      // Handle the resume link separately
      if (e.currentTarget.classList.contains('btn-resume')) {
          window.open(targetId, '_blank');
          return;
      }
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      // Close mobile menu after click
      if (mainNav.classList.contains('is-active')) {
        mainNav.classList.remove('is-active');
        mobileNavToggle.classList.remove('is-active');
      }
    });
  });

  // Mobile navigation toggle
  mobileNavToggle.addEventListener('click', () => {
    mainNav.classList.toggle('is-active');
    mobileNavToggle.classList.toggle('is-active');
  });

  // Scroll-triggered animations for sections
  const animatedSections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  animatedSections.forEach(section => {
    observer.observe(section);
  });

  // Project filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project');

  if(filterBtns.length > 0 && projects.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Set active button
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filter = btn.dataset.filter;

        projects.forEach(project => {
          const categories = project.dataset.category;
          if (filter === 'all' || (categories && categories.includes(filter))) {
            project.style.display = '';
          } else {
            project.style.display = 'none';
          }
        });
      });
    });
  }
});
