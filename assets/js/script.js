'use strict';

const DOM = {
    loadingScreen: document.getElementById('loading-screen'),
    navbar: document.getElementById('navbar'),
    navMenu: document.getElementById('nav-menu'),
    navToggle: document.getElementById('nav-toggle'),
    navLinks: document.querySelectorAll('.nav-link'),
    backToTop: document.getElementById('backToTop'),
    sections: document.querySelectorAll('section'),
    typingCommands: document.getElementById('typingCommands')
};

let isLoaded = false;
let currentSection = 'home';


class LoadingScreen {
    constructor() {
        this.init();
    }

    init() {
        this.showLoadingAnimation();


        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 2000);
        });
    }

    showLoadingAnimation() {
        const typingElement = document.querySelector('#loading-screen .typing');
        if (typingElement) {
            
            typingElement.style.animation = 'typing 2s steps(8), blink-caret 1s step-end infinite';
        }
    }

    hideLoadingScreen() {
        if (DOM.loadingScreen) {
            DOM.loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                DOM.loadingScreen.style.display = 'none';
                isLoaded = true;
                this.onLoadComplete();
            }, 500);
        }
    }

    onLoadComplete() {
        ScrollAnimations.init();
        TypewriterEffect.init();
        this.showElements();
    }

    showElements() {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}



class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollEffect();
        this.setupActiveSection();
    }

    setupEventListeners() {
        if (DOM.navToggle) {
            DOM.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        DOM.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavClick(e);
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        DOM.navMenu.classList.toggle('active');
        DOM.navToggle.classList.toggle('active');
    }

    closeMobileMenu() {
        DOM.navMenu.classList.remove('active');
        DOM.navToggle.classList.remove('active');
    }

    handleNavClick(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                this.scrollToSection(targetElement);
                this.closeMobileMenu();
                this.updateActiveLink(e.target);
            }
        }
    }

    scrollToSection(element) {
        const headerOffset = 80;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    updateActiveLink(activeLink) {
        DOM.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    setupScrollEffect() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                DOM.navbar.classList.add('scrolled');
            } else {
                DOM.navbar.classList.remove('scrolled');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    setupActiveSection() {
        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px -80px 0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.setActiveSection(id);
                }
            });
        }, observerOptions);

        DOM.sections.forEach(section => {
            observer.observe(section);
        });
    }

    setActiveSection(sectionId) {
        currentSection = sectionId;
        
        DOM.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
}



class BackToTop {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollListener();
        this.setupClickListener();
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 500) {
                DOM.backToTop.classList.add('visible');
            } else {
                DOM.backToTop.classList.remove('visible');
            }
        });
    }

    setupClickListener() {
        if (DOM.backToTop) {
            DOM.backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}



class TypewriterEffect {
    constructor() {
        this.commands = [
            'whoami',
            'cd prish.py',
            'pwd',
            'ls -la',
            'whoami'
        ];
        this.currentIndex = 0;
        this.isDeleting = false;
        this.currentText = '';
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseDelay = 2000;
    }

    static init() {
        const typewriterInstance = new TypewriterEffect();
        typewriterInstance.start();
    }

    start() {
        if (!DOM.typingCommands) return;
        this.type();
    }

    type() {
        const fullText = this.commands[this.currentIndex];
        
        if (this.isDeleting) {
            this.currentText = fullText.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = fullText.substring(0, this.currentText.length + 1);
        }

        DOM.typingCommands.textContent = this.currentText;

        let typeSpeed = this.typeSpeed;
        if (this.isDeleting) {
            typeSpeed = this.deleteSpeed;
        }

        if (!this.isDeleting && this.currentText === fullText) {
            typeSpeed = this.pauseDelay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentIndex = (this.currentIndex + 1) % this.commands.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}



class ScrollAnimations {
    static init() {
        this.setupObserver();
    }

    static setupObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);

        
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}



class TerminalTyping {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            typeSpeed: 50,
            deleteSpeed: 30,
            pauseDelay: 1500,
            loop: true,
            ...options
        };
       
    }

    init() {

        return;
    }

    async typeText(text) {

        return;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}



class SmoothScroll {
    static init() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href && href !== '#') {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const headerOffset = 80;
                        const elementPosition = targetElement.offsetTop;
                        const offsetPosition = elementPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}



class ParticleBackground {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.numParticles = 50;
        this.init();
    }

    init() {
        if (!this.container) return;
        
        this.createCanvas();
        this.createParticles();
        this.animate();
        this.setupResize();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        
        this.container.appendChild(this.canvas);
        this.resize();
    }

    createParticles() {
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {

            particle.x += particle.vx;
            particle.y += particle.vy;
            

            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    setupResize() {
        window.addEventListener('resize', () => {
            this.resize();
        });
    }
}



class ContactForm {
    static init() {
        const form = document.querySelector('#contact-form');
        
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle form submission
            this.handleSubmit(form);
        });
    }

    static handleSubmit(form) {

        console.log('Form submission would be handled here');
    }
}



class Performance {
    static init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
    }

    static setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    static setupImageOptimization() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        });
    }
}



class Accessibility {
    static init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupReducedMotion();
    }

    static setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (DOM.navMenu.classList.contains('active')) {
                    DOM.navMenu.classList.remove('active');
                    DOM.navToggle.classList.remove('active');
                }
            }
        });
    }

    static setupFocusManagement() {
        const focusableElements = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
        const focusable = document.querySelectorAll(focusableElements);
        
        focusable.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid #00d4ff';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }

    static setupReducedMotion() {
        
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-normal', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
        }
    }
}



class ThemeManager {
    constructor() {
        this.currentTheme = 'dark'; 
        this.init();
    }

    init() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        this.setupSystemThemeListener();
    }

    setupSystemThemeListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('user-theme-preference')) {
                this.setTheme(e.matches ? 'light' : 'dark');
            }
        });
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('user-theme-preference', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}



document.addEventListener('DOMContentLoaded', () => {
    new LoadingScreen();
    new Navigation();
    new BackToTop();
    
    SmoothScroll.init();
    Performance.init();
    Accessibility.init();
    
    
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
        new ParticleBackground(heroParticles);
    }
    
    
    new ThemeManager();
    
  
    const terminalCommand = document.querySelector('.terminal-line .cursor-blink');
    if (terminalCommand) {
        new TerminalTyping(terminalCommand.parentElement);
    }
});



document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        
        document.body.style.animationPlayState = 'running';
    }
});

window.addEventListener('online', () => {
    console.log('Connection restored');
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
});

window.addEventListener('error', (e) => {
    console.error('Resource failed to load:', e.target);
}, true);



if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        BackToTop,
        ScrollAnimations,
        TypewriterEffect,
        TerminalTyping,
        ParticleBackground,
        ThemeManager
    };
}



if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.portfolioDebug = {
        currentSection: () => currentSection,
        isLoaded: () => isLoaded,
        DOM,
        toggleMobileMenu: () => {
            DOM.navMenu.classList.toggle('active');
            DOM.navToggle.classList.toggle('active');
        },
        restartTypewriter: () => {
            if (DOM.typingCommands) {
                TypewriterEffect.init();
            }
        }
    };
}



console.log(`
 Welcome to Prasiddha Gautam's Portfolio!

`);
