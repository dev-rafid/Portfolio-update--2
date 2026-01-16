// portfolio.js - Complete Fixed Version

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');
const scrollToTopBtn = document.getElementById('scrollToTop');
const loadingScreen = document.querySelector('.loading-screen');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize hero animations
    initHeroAnimations();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize project filter
    initProjectFilter();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize skill bars
    initSkillBars();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize animated counters
    initAnimatedCounters();
    
    // Initialize parallax effect
    initParallaxEffect();
    
    // Initialize performance optimizations
    initPerformanceOptimizations();
});

// Loading Screen
function initLoadingScreen() {
    if (!loadingScreen) return;
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1200);
}

// Hero Animations - COMPLETE FIX
function initHeroAnimations() {
    const heroSection = document.getElementById('home');
    const floatingElements = document.querySelectorAll('.floating-element');
    const heroShape = document.querySelector('.hero-shape');
    
    if (!heroSection) return;
    
    // Ensure all hero elements are visible
    floatingElements.forEach((element, index) => {
        // Remove any inline styles that might be hiding elements
        element.style.display = 'flex';
        element.style.visibility = 'visible';
        element.style.opacity = '1';
        
        // Set animation delay
        const delay = index * 0.5;
        element.style.animationDelay = `${delay}s`;
        
        // Add hover effect
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.1) rotate(10deg)';
            element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
            element.style.boxShadow = '';
        });
        
        // Add touch events for mobile
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(1.1) rotate(10deg)';
            element.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('touchend', () => {
            element.style.transform = '';
        });
    });
    
    // Ensure hero shape is visible
    if (heroShape) {
        heroShape.style.display = 'block';
        heroShape.style.visibility = 'visible';
        heroShape.style.opacity = '0.9';
    }
    
    // Hero section entry animation
    function animateHeroEntry() {
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
        
        if (heroVisual) {
            heroVisual.style.opacity = '0';
            heroVisual.style.transition = 'opacity 1s ease 0.5s';
            
            setTimeout(() => {
                heroVisual.style.opacity = '1';
            }, 800);
        }
    }
    
    // Run entry animation when page loads
    window.addEventListener('load', () => {
        setTimeout(animateHeroEntry, 500);
    });
    
    // Add scroll effect to hero section
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroContent = document.querySelector('.hero-content');
                
                if (heroContent) {
                    const translateY = scrolled * 0.5;
                    heroContent.style.transform = `translateY(${translateY}px)`;
                }
                
                // Parallax effect for floating elements
                floatingElements.forEach((element, index) => {
                    const speed = 0.3 + (index * 0.1);
                    const translateY = scrolled * speed;
                    element.style.transform = `translateY(${translateY}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    if (!mobileMenuBtn || !navLinks || !mobileMenuOverlay) return;
    
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        
        // Change menu icon
        if (navLinks.classList.contains('active')) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    
    // Set initial aria attributes
    mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// Project Filter Functionality
function initProjectFilter() {
    if (!filterBtns.length || !projectCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    // Trigger reflow for animation
                    void card.offsetWidth;
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Set initial aria states
    filterBtns.forEach((btn, index) => {
        btn.setAttribute('aria-label', `Filter projects by ${btn.textContent}`);
        btn.setAttribute('role', 'button');
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
    });
}

// Contact Form Functionality
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show success message
        showNotification(`Thank you for your message, ${name}! I will get back to you soon at ${email}.`, 'success');
        
        // Reset form
        contactForm.reset();
    });
    
    // Add form validation styling
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.classList.remove('valid');
                this.classList.add('invalid');
            } else {
                this.classList.remove('invalid');
                this.classList.add('valid');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('invalid');
                this.classList.add('valid');
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Close notification"><i class="fas fa-times"></i></button>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
        clearTimeout(autoRemove);
    });
    
    // Add keyboard support
    notification.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeNotification(notification);
            clearTimeout(autoRemove);
        }
    });
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') === '#') return;
        
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    function updateHeader() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when not at top
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress');
    const skillsSection = document.getElementById('skills');
    
    if (!skillBars.length || !skillsSection) return;
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.width = width + '%';
            }
        });
    }
    
    // Intersection Observer for skill bars animation
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateSkillBars, 300);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(skillsSection);
}

// Scroll Animations with Staggered Effects
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animatedElements.length) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay') || 0;
                const animation = element.getAttribute('data-animation') || 'fade-up';
                
                // Add staggered delay based on data-delay attribute
                setTimeout(() => {
                    element.classList.add('animated');
                    element.classList.add(animation);
                }, parseInt(delay));
                
                // Stop observing once animated
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Scroll to Top Button
function initScrollToTop() {
    if (!scrollToTopBtn) return;
    
    function updateScrollButton() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
            scrollToTopBtn.setAttribute('aria-hidden', 'false');
        } else {
            scrollToTopBtn.classList.remove('visible');
            scrollToTopBtn.setAttribute('aria-hidden', 'true');
        }
    }
    
    window.addEventListener('scroll', updateScrollButton);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        scrollToTopBtn.blur(); // Remove focus after click
    });
    
    // Set initial state
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.setAttribute('aria-hidden', 'true');
    updateScrollButton();
}

// Animated Counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (!counters.length) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const suffix = counter.textContent.includes('+') ? '+' : '';
                const duration = 2000;
                const stepTime = Math.abs(Math.floor(duration / target));
                let current = 0;
                
                const timer = setInterval(() => {
                    current += 1;
                    counter.textContent = current + suffix;
                    
                    if (current >= target) {
                        counter.textContent = target + suffix;
                        clearInterval(timer);
                    }
                }, stepTime);
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Parallax Effect for Background Shapes
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Only run on non-mobile devices
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', updateParallax);
        updateParallax(); // Initial call
    }
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Debounce function for scroll events
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Apply debounce to scroll-intensive functions
    const debouncedScroll = debounce(() => {
        const header = document.getElementById('header');
        if (header) {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // Optimize hero animations
    function optimizeHeroAnimations() {
        const heroSection = document.getElementById('home');
        if (!heroSection) return;
        
        const floatingElements = document.querySelectorAll('.floating-element');
        
        function updateHeroAnimations() {
            const rect = heroSection.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            
            // Only animate when hero section is in view
            floatingElements.forEach(element => {
                if (isInView) {
                    element.style.animationPlayState = 'running';
                } else {
                    element.style.animationPlayState = 'paused';
                }
            });
        }
        
        window.addEventListener('scroll', updateHeroAnimations);
        updateHeroAnimations(); // Initial call
    }
    
    optimizeHeroAnimations();
}

// Initialize project cards animation delay
function initProjectCardsAnimation() {
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize all features when window loads
window.addEventListener('load', () => {
    // Add loaded class to body for transition effects
    document.body.classList.add('loaded');
    
    // Initialize project card animations
    initProjectCardsAnimation();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
    
    // Initialize touch events
    if ('ontouchstart' in window) {
        initTouchEvents();
    }
    
    // Initialize any interactive elements
    const interactiveElements = document.querySelectorAll('.skill-item, .project-card, .stat-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.classList.add('hover-active');
        });
        el.addEventListener('mouseleave', () => {
            el.classList.remove('hover-active');
        });
    });
    
    // Add CSS for additional styles
    addAdditionalStyles();
});

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Tab key navigation enhancement
        if (e.key === 'Tab') {
            const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            const modal = document.querySelector('.mobile-menu-overlay.active');
            
            if (modal) {
                const focusableContent = modal.querySelectorAll(focusableElements);
                const firstFocusableElement = focusableContent[0];
                const lastFocusableElement = focusableContent[focusableContent.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    });
}

// Touch Events for Mobile
function initTouchEvents() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (navLinks.classList.contains('active')) {
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left to close
                toggleMobileMenu();
            }
        }
    }
}

// Add additional CSS styles
function addAdditionalStyles() {
    const additionalCSS = `
    .hover-active {
        z-index: 10;
    }
    
    .contact-form input.valid,
    .contact-form textarea.valid {
        border-color: #10b981 !important;
    }
    
    .contact-form input.invalid,
    .contact-form textarea.invalid {
        border-color: #ef4444 !important;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        min-width: 300px;
        max-width: 400px;
        transform: translateX(150%);
        transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        z-index: 9999;
        border-left: 4px solid #10b981;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-error {
        border-left-color: #ef4444;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .notification-content i {
        font-size: 1.5rem;
        color: #10b981;
    }
    
    .notification-error .notification-content i {
        color: #ef4444;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #64748b;
        cursor: pointer;
        font-size: 1rem;
        padding: 5px;
        border-radius: 5px;
        transition: all 0.3s ease;
    }
    
    .notification-close:hover {
        color: #1e293b;
        background: #f1f5f9;
    }
    `;
    
    const style = document.createElement('style');
    style.textContent = additionalCSS;
    document.head.appendChild(style);
}

// Mobile menu toggle function
function toggleMobileMenu() {
    if (!navLinks || !mobileMenuOverlay || !mobileMenuBtn) return;
    
    navLinks.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    
    // Change menu icon
    if (navLinks.classList.contains('active')) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// Fallback for older browsers
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 1000 / 60);
    };
}

// Initialize project card animation delays
setTimeout(initProjectCardsAnimation, 1000);