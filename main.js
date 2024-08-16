document.addEventListener("DOMContentLoaded", function() {
  const counters = document.querySelectorAll('.number');
  const speed = 200; // Adjust the speed of the counting

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const updateCount = (el) => {
          const target = +el.getAttribute('data-count');
          const count = +el.innerText;

          const increment = target / speed;

          if (count < target) {
            el.innerText = Math.ceil(count + increment);
            setTimeout(() => updateCount(el), 10);
          } else {
            el.innerText = target;
          }
        };

        updateCount(entry.target);
        observer.unobserve(entry.target); // Stop observing after animation
      }
    });
  }, { threshold: 1.0 });

  counters.forEach(counter => {
    observer.observe(counter);
  });
});
