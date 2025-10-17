// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('section');
const navLinkAnchors = document.querySelectorAll('.nav-links a');
const contactForm = document.getElementById('contactForm');
const skillBars = document.querySelectorAll('.skill-level');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active section highlighting in navigation
function highlightNavOnScroll() {
    let scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinkAnchors.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Animate skill bars on scroll
function animateSkillBars() {
    const skillsSection = document.querySelector('#skills');
    const sectionPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPosition < screenPosition) {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = "0%";
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
        
        // Remove the event listener once animation is triggered
        window.removeEventListener('scroll', animateSkillBars);
    }
}

// Contact form validation
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (name === '' || email === '' || message === '') {
            showFormError('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormError('Please enter a valid email');
            return;
        }
        
        // If validation passes, show success message
        // In a real application, you would send the form data to a server here
        showFormSuccess();
        
        // Reset the form
        contactForm.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

// Form feedback functions
function showFormError(message) {
    const formButton = contactForm.querySelector('button[type="submit"]');
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.style.color = 'red';
    errorElement.style.marginTop = '10px';
    errorElement.textContent = message;
    
    // Remove any existing error messages
    const existingError = contactForm.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Insert error after button
    formButton.insertAdjacentElement('afterend', errorElement);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorElement.remove();
    }, 3000);
}

function showFormSuccess() {
    const formButton = contactForm.querySelector('button[type="submit"]');
    const successElement = document.createElement('div');
    successElement.className = 'form-success';
    successElement.style.color = 'green';
    successElement.style.marginTop = '10px';
    successElement.textContent = 'Message sent successfully!';
    
    // Remove any existing messages
    const existingMessage = contactForm.querySelector('.form-success, .form-error');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Insert success message after button
    formButton.insertAdjacentElement('afterend', successElement);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successElement.remove();
    }, 3000);
}

// Reveal animations on scroll
function revealOnScroll() {
    const revealElements = document.querySelectorAll('.project-card, .skill-category, .about-content > div');
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .project-card, .skill-category, .about-content > div {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .project-card.animated, .skill-category.animated, .about-content > div.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    .about-content > div:nth-child(2), .skill-category:nth-child(2), .project-card:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .project-card:nth-child(3) {
        transition-delay: 0.4s;
    }
`;
document.head.appendChild(style);

// Event listeners
window.addEventListener('scroll', highlightNavOnScroll);
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('scroll', revealOnScroll);

// Initialize
window.addEventListener('load', () => {
    highlightNavOnScroll();
    revealOnScroll();
});