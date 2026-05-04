(function () {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(function (header) {
        header.addEventListener('click', function () {
            const isOpen = this.getAttribute('aria-expanded') === 'true';
            headers.forEach(function (h) {
                h.setAttribute('aria-expanded', 'false');
                const body = h.nextElementSibling;
                if (body) body.classList.remove('open');
            });
            if (!isOpen) {
                this.setAttribute('aria-expanded', 'true');
                const body = this.nextElementSibling;
                if (body) body.classList.add('open');
            }
        });
    });
})();

const accordionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.accordion-item').forEach(function (item) {
    accordionObserver.observe(item);
});