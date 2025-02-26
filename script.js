// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for nav links with header offset
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            console.log('Section found:', section);
            if (section) {
                const headerHeight = document.querySelector('header').offsetHeight; // Get header height
                const sectionTop = section.getBoundingClientRect().top + window.scrollY; // Get section's absolute position
                window.scrollTo({
                    top: sectionTop - headerHeight, // Offset by header height
                    behavior: 'smooth'
                });
            } else {
                console.warn('Section not found for href:', this.getAttribute('href'));
            }
            
            // Remove active class from all links
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            // Add active class to clicked link
            this.classList.add('active');

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                document.getElementById('main-nav').classList.remove('active');
            }
        });
    });

    // Theme toggle with icon switch
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Switch icon based on theme
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = '🌙'; // Moon for dark mode
        } else {
            themeToggle.textContent = '☀️'; // Sun for light mode
        }
    });

    // Set initial icon based on current theme
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '🌙';
    } else {
        themeToggle.textContent = '☀️';
    }

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            document.getElementById('main-nav').classList.toggle('active');
        });
    } else {
        console.warn('Hamburger button not found in DOM');
    }

    // Scroll-to-Top Button
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    window.addEventListener('scroll', () => {
        // Show button when near the bottom
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to the corresponding link
                navLinks[index].classList.add('active');
            }
        });
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animation for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate').forEach(section => {
        observer.observe(section);
    });
});