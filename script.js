// Ultra Premium Interactive JavaScript for Internetify.io

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('fade-out');
    }, 2000);
});

// Custom Cursor System
const cursor = document.getElementById('cursor');
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

// Enhanced cursor tracking
function updateCursor(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update cursor position
    cursor.style.left = mouseX - 4 + 'px';
    cursor.style.top = mouseY - 4 + 'px';
    
    // Update glow position with smooth following
    cursorGlow.classList.add('active');
}

// Smooth cursor glow animation
function animateGlow() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    
    cursorGlow.style.left = currentX - 200 + 'px';
    cursorGlow.style.top = currentY - 200 + 'px';
    
    requestAnimationFrame(animateGlow);
}

// Cursor hover effects
function addCursorEffects() {
    const interactiveElements = document.querySelectorAll('button, a, .service-card, .word-item, input, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'var(--accent-secondary)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--accent-primary)';
        });
    });
}

// Initialize cursor
if (cursor && cursorGlow) {
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
    });
    animateGlow();
    addCursorEffects();
}

// Particle System for Hero Background
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.init();
        this.animate();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) +
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 150)})`;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
const particleCanvas = document.getElementById('particleCanvas');
if (particleCanvas) {
    new ParticleSystem(particleCanvas);
}

// Navigation System
class NavigationSystem {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navItems = document.querySelectorAll('.nav-item');
        this.sections = document.querySelectorAll('section');
        this.init();
    }
    
    init() {
        // Smooth scroll to sections
        this.navItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetId = item.dataset.section;
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    this.scrollToSection(targetSection);
                }
            });
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
    
    scrollToSection(section) {
        const offset = 80;
        const targetPosition = section.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize navigation
new NavigationSystem();

// Enhanced Hero Animation System
class HeroAnimationSystem {
    constructor() {
        this.init();
    }
    
    init() {
        // Animate subtitle words
        this.animateSubtitleWords();
        
        // Animate hero description
        this.animateHeroDescription();
        
        // Add floating particles to CTA button
        this.addCTAParticles();
        
        // Animate floating shapes
        this.animateFloatingShapes();
    }
    
    animateSubtitleWords() {
        const words = document.querySelectorAll('.subtitle-word');
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
            }, 200 * (index + 1));
        });
    }
    
    animateHeroDescription() {
        const description = document.querySelector('.hero-description');
        setTimeout(() => {
            description.style.opacity = '1';
            description.style.transform = 'translateY(0)';
        }, 1500);
    }
    
    addCTAParticles() {
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('mouseenter', () => {
                this.createParticles(ctaButton);
            });
        }
    }
    
    createParticles(button) {
        const particles = button.querySelector('.cta-particles');
        if (!particles) return;
        
        // Clear existing particles
        particles.innerHTML = '';
        
        // Create new particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'cta-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: var(--accent-primary);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: 0;
                animation: particle-float ${Math.random() * 2 + 1}s ease-out forwards;
            `;
            particles.appendChild(particle);
        }
        
        // Add particle styles
        if (!document.querySelector('#cta-particle-styles')) {
            const style = document.createElement('style');
            style.id = 'cta-particle-styles';
            style.textContent = `
                @keyframes particle-float {
                    0% { opacity: 0; transform: translate(0, 0) scale(0); }
                    50% { opacity: 1; transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1); }
                    100% { opacity: 0; transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(0); }
                }
                .cta-particle {
                    pointer-events: none;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    animateFloatingShapes() {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            // Add interactive hover effect
            shape.addEventListener('mouseenter', () => {
                shape.style.transform = 'scale(1.2)';
                shape.style.opacity = '0.3';
            });
            
            shape.addEventListener('mouseleave', () => {
                shape.style.transform = 'scale(1)';
                shape.style.opacity = '0.1';
            });
        });
    }
}

// Initialize enhanced hero animations
new HeroAnimationSystem();

// Hero CTA Button
const heroCTA = document.getElementById('heroCTA');
if (heroCTA) {
    heroCTA.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Unique Why Us Showcase Animation System
class ShowcaseAnimationSystem {
    constructor() {
        this.showcaseItems = document.querySelectorAll('.showcase-item');
        this.metricNumbers = document.querySelectorAll('.metric-number');
        this.init();
    }
    
    init() {
        // Animate showcase items on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        this.animateShowcaseItem(entry.target);
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });
        
        this.showcaseItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            item.style.transition = 'all 0.8s ease';
            observer.observe(item);
        });
        
        // Animate metric numbers
        const metricObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumber(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.metricNumbers.forEach(number => {
            metricObserver.observe(number);
        });
    }
    
    animateShowcaseItem(item) {
        const particles = item.querySelector('.showcase-particles');
        if (particles) {
            this.createParticles(particles);
        }
    }
    
    createParticles(container) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.animation = `particle-float 3s ease-in-out infinite`;
            container.appendChild(particle);
        }
    }
    
    animateNumber(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target;
            }
        };
        
        updateNumber();
    }
}

// Unique Feature Animation System
class FeatureAnimationSystem {
    constructor() {
        this.featureItems = document.querySelectorAll('.feature-item');
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.init();
    }
    
    init() {
        // Animate features on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        this.animateFeatureItem(entry.target);
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });
        
        this.featureItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            item.style.transition = 'all 0.8s ease';
            observer.observe(item);
        });
        
        // Animate stat numbers
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumber(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.statNumbers.forEach(number => {
            statObserver.observe(number);
        });
    }
    
    animateFeatureItem(item) {
        const feature = item.dataset.feature;
        const icon = item.querySelector('.icon-bg');
        
        if (icon) {
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = `icon-pulse 3s ease-in-out infinite, ${feature}-bounce 2s ease-out`;
            }, 100);
        }
    }
    
    animateNumber(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target;
            }
        };
        
        updateNumber();
    }
}

// Initialize feature animations
new FeatureAnimationSystem();

// Parallax Scroll Effect
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('.floating-blob, .float-element');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            this.elements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Initialize parallax
new ParallaxEffect();

// Form Animation System
class FormAnimationSystem {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.inputs = document.querySelectorAll('input, textarea');
        this.submitBtn = document.querySelector('.submit-btn');
        this.init();
    }
    
    init() {
        // Input focus animations
        this.inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
        
        // Form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const name = formData.get('name');
        const email = formData.get('email');
        const country = formData.get('country');
        const phone = formData.get('phone');
        const projectType = formData.get('projectType');
        const message = formData.get('message');
        
        // Validation
        if (!name || !email || !country || !phone || !projectType) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Button morph animation
        this.submitBtn.classList.add('submitting');
        
        // Format project type for display
        const projectTypeDisplay = projectType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        // Create WhatsApp message
        const whatsappMessage = `🌐 *New Project Inquiry*\n\n📝 *Name:* ${name}\n📧 *Email:* ${email}\n🌍 *Country:* ${country}\n📱 *Phone:* ${phone}\n🎯 *Project Type:* ${projectTypeDisplay}\n💬 *Message:* ${message || 'No additional details'}\n\n📱 Sent from Internetify.io Website\n\n🔗 Contact: +91 9940982795`;
        
        // Show notification
        this.showNotification('Opening WhatsApp with your details...', 'success');
        
        // Universal WhatsApp URL (works on all devices)
        const whatsappUrl = `https://wa.me/919940982795?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            this.submitBtn.classList.remove('submitting');
            this.form.reset();
        }, 1500);
    }
    
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(34, 197, 94, 0.9)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            backdrop-filter: blur(10px);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Initialize form animations
new FormAnimationSystem();

// Scroll Reveal System
class ScrollRevealSystem {
    constructor() {
        this.elements = document.querySelectorAll('.feature-item, .stat-item, .floating-form');
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);
        
        this.elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'all 0.8s ease';
            observer.observe(element);
        });
    }
}

// Initialize scroll reveal
new ScrollRevealSystem();

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes speed-bounce {
        0% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
        100% { transform: translateY(0) rotate(360deg); }
    }
    
    @keyframes quality-bounce {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(180deg); }
        100% { transform: scale(1) rotate(360deg); }
    }
    
    @keyframes growth-bounce {
        0% { transform: translateY(0) scaleY(1); }
        50% { transform: translateY(-15px) scaleY(1.3); }
        100% { transform: translateY(0) scaleY(1); }
    }
    
    .submitting .btn-text {
        opacity: 0.7;
    }
    
    .input-group.focused input,
    .input-group.focused textarea,
    .input-group.focused select {
        color: var(--accent-primary);
    }
`;
document.head.appendChild(style);

// Performance optimization - throttle scroll events
let scrollTimer;
window.addEventListener('scroll', () => {
    if (scrollTimer) {
        clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => {
        // Scroll-based optimizations here
    }, 10);
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
