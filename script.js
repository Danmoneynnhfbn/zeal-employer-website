document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Testimonial Carousel
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  
  if (testimonialCards.length > 0) {
    let currentIndex = 0;
    let autoRotateInterval;

    function showTestimonial(index) {
      testimonialCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
      });
      testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      currentIndex = index;
    }

    function nextTestimonial() {
      const nextIndex = (currentIndex + 1) % testimonialCards.length;
      showTestimonial(nextIndex);
    }

    function startAutoRotate() {
      autoRotateInterval = setInterval(nextTestimonial, 6000);
    }

    function resetAutoRotate() {
      clearInterval(autoRotateInterval);
      startAutoRotate();
    }

    // Initialize first testimonial
    showTestimonial(0);

    // Set up dot navigation
    testimonialDots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        showTestimonial(index);
        resetAutoRotate();
      });
    });

    // Start auto-rotation
    startAutoRotate();
  }
});

