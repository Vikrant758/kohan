document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll('.number');
  const speed = 200; // Adjust the speed of the counting

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const updateCount = (el) => {
          const isPercentage = el.getAttribute('data-count').includes('%');
          const target = parseFloat(el.getAttribute('data-count').replace('%', ''));
          let count = parseFloat(el.innerText.replace('%', ''));

          const increment = target / speed;

          if (count < target) {
            count = Math.ceil(count + increment);
            el.innerText = count + (isPercentage ? '%' : '');
            setTimeout(() => updateCount(el), 10);
          } else {
            el.innerText = target + (isPercentage ? '%' : '');
          }
        };

        updateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 1.0 });

  counters.forEach(counter => {
    observer.observe(counter);
  });
});
