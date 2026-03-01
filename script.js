document.addEventListener('DOMContentLoaded', function () {
    // Form handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
                .then(() => {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                })
                .catch((error) => {
                    alert('Oops! Something went wrong. Please try again later.');
                    console.error('Form Error:', error);
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll animation for headers (simple fade-in effect)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section h2, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Scroll Spy for Nav Links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        let maxVisibleArea = 0;

        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
            if (!section.getAttribute('id')) return;

            const rect = section.getBoundingClientRect();

            // Calculate how much of the section is visible in the viewport
            const visibleHeight = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));
            const visibleArea = visibleHeight / windowHeight;

            // If this section takes up more screen space than the previous one, it's the current one
            if (visibleArea > maxVisibleArea && visibleArea > 0.1) {
                maxVisibleArea = visibleArea;
                current = section.getAttribute('id');
            }
        });

        // Fallback: Ensure bottom section is highlighted when absolutely bottomed out
        if ((document.documentElement.scrollHeight - window.innerHeight - scrollPosition) < 50) {
            current = 'partners';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current !== '' && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Handle "Home" being active at top
        if (scrollPosition < 50) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('a[href="index.html"].nav-link:not(.btn)');
            if (homeLink) homeLink.classList.add('active');
        }
    });
});
