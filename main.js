// Portfolio Interactive Functionality
// Miguel Díaz Benito - Professional Portfolio

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeProjectFilters();
    initializeSkillsVisualization();
    initializeTimelineInteractions();
    initializeContactForm();
    initializeScrollEffects();
});

// Animation System
function initializeAnimations() {
    // Fade in elements on page load
    anime({
        targets: '.fade-in',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(100),
        easing: 'easeOutQuart'
    });

    // Hero text typewriter effect
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        anime({
            targets: heroTitle,
            innerHTML: [0, text.length],
            duration: 2000,
            easing: 'easeOutQuart',
            update: function(anim) {
                heroTitle.textContent = text.substring(0, Math.round(anim.progress * text.length / 100));
            }
        });
    }

    // Neural network background animation
    initializeNeuralBackground();
}

// Neural Network Background Effect
function initializeNeuralBackground() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let nodes = [];
    let connections = [];

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create nodes
    function createNodes() {
        nodes = [];
        const nodeCount = Math.floor((canvas.width * canvas.height) / 15000);
        
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    // Update and draw nodes
    function updateNodes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update node positions
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        });

        // Draw connections
        ctx.strokeStyle = 'rgba(193, 120, 23, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw nodes
        ctx.fillStyle = 'rgba(124, 152, 133, 0.6)';
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(updateNodes);
    }

    createNodes();
    updateNodes();
}

// Project Filter System
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-categories').split(',');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 400,
                        easing: 'easeOutQuart'
                    });
                } else {
                    anime({
                        targets: card,
                        opacity: [1, 0],
                        scale: [1, 0.8],
                        duration: 300,
                        easing: 'easeInQuart',
                        complete: function() {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });

    // Project modal functionality
    initializeProjectModals();
}

// Project Modal System
function initializeProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.modal-close');

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectData = {
                title: this.querySelector('.project-title').textContent,
                description: this.getAttribute('data-description'),
                methodology: this.getAttribute('data-methodology'),
                results: this.getAttribute('data-results'),
                image: this.querySelector('img').src,
                conference: this.getAttribute('data-conference'),
                achievement: this.getAttribute('data-achievement')
            };

            // Populate modal
            modal.querySelector('.modal-title').textContent = projectData.title;
            modal.querySelector('.modal-image').src = projectData.image;
            modal.querySelector('.modal-description').textContent = projectData.description;
            modal.querySelector('.modal-methodology').textContent = projectData.methodology;
            modal.querySelector('.modal-results').textContent = projectData.results;
            modal.querySelector('.modal-conference').textContent = projectData.conference;
            modal.querySelector('.modal-achievement').textContent = projectData.achievement;

            // Show modal
            modal.style.display = 'flex';
            anime({
                targets: modal.querySelector('.modal-content'),
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 400,
                easing: 'easeOutQuart'
            });
        });
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            anime({
                targets: modal.querySelector('.modal-content'),
                opacity: [1, 0],
                scale: [1, 0.8],
                duration: 300,
                easing: 'easeInQuart',
                complete: function() {
                    modal.style.display = 'none';
                }
            });
        });
    }

    // Close modal on background click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal.click();
            }
        });
    }
}

// Skills Visualization
function initializeSkillsVisualization() {
    const skillsChart = document.getElementById('skills-chart');
    if (!skillsChart) return;

    // Skills data
    const skillsData = {
        technical: {
            'Python': 95,
            'Deep Learning': 90,
            'Medical Imaging': 85,
            'Computer Vision': 88,
            'MATLAB': 75,
            'PyTorch/TensorFlow': 92
        },
        research: {
            'Publications': 85,
            'Conference Presentations': 80,
            'Competition Achievements': 90,
            'Peer Review': 70,
            'Grant Writing': 60
        },
        languages: {
            'Spanish (Native)': 100,
            'English (C1)': 90,
            'French (C1)': 85
        }
    };

    // Create radar chart
    const chart = echarts.init(skillsChart);
    
    const option = {
        title: {
            text: 'Technical Competencies',
            textStyle: {
                color: '#2d3748',
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        radar: {
            indicator: [
                { name: 'Python', max: 100 },
                { name: 'Deep Learning', max: 100 },
                { name: 'Medical Imaging', max: 100 },
                { name: 'Computer Vision', max: 100 },
                { name: 'Research Skills', max: 100 },
                { name: 'Languages', max: 100 }
            ],
            axisLine: {
                lineStyle: {
                    color: '#7c9885'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#c17817',
                    opacity: 0.3
                }
            }
        },
        series: [{
            type: 'radar',
            data: [{
                value: [95, 90, 85, 88, 85, 90],
                name: 'Current Skills',
                areaStyle: {
                    color: 'rgba(193, 120, 23, 0.3)'
                },
                lineStyle: {
                    color: '#c17817'
                },
                itemStyle: {
                    color: '#c17817'
                }
            }],
            animationDuration: 2000
        }]
    };

    chart.setOption(option);

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach((bar, index) => {
        const skillName = bar.getAttribute('data-skill');
        const skillValue = bar.getAttribute('data-value');
        
        anime({
            targets: bar.querySelector('.skill-progress'),
            width: skillValue + '%',
            duration: 1500,
            delay: index * 200,
            easing: 'easeOutQuart'
        });
    });
}

// Timeline Interactions
function initializeTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // Animate timeline items on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateX: [index % 2 === 0 ? -50 : 50, 0],
                        duration: 800,
                        easing: 'easeOutQuart'
                    });
                }
            });
        });

        observer.observe(item);

        // Click interaction for detailed information
        item.addEventListener('click', function() {
            const details = this.querySelector('.timeline-details');
            const isExpanded = details.style.display === 'block';
            
            if (isExpanded) {
                anime({
                    targets: details,
                    height: [details.scrollHeight, 0],
                    opacity: [1, 0],
                    duration: 400,
                    easing: 'easeInQuart',
                    complete: function() {
                        details.style.display = 'none';
                    }
                });
            } else {
                details.style.display = 'block';
                anime({
                    targets: details,
                    height: [0, details.scrollHeight],
                    opacity: [0, 1],
                    duration: 400,
                    easing: 'easeOutQuart'
                });
            }
        });
    });
}

// Contact Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (validateContactForm(data)) {
            // Show success message
            showContactSuccess();
        } else {
            // Show error message
            showContactError();
        }
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// Form Validation
function validateContactForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
        data.name && 
        data.name.length > 2 &&
        data.email && 
        emailRegex.test(data.email) &&
        data.message && 
        data.message.length > 10
    );
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    switch(field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            message = isValid ? '' : 'Please enter a valid email address';
            break;
        case 'text':
            isValid = value.length > 2;
            message = isValid ? '' : 'Please enter at least 3 characters';
            break;
        case 'textarea':
            isValid = value.length > 10;
            message = isValid ? '' : 'Please enter at least 10 characters';
            break;
    }

    // Show validation feedback
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = message ? 'block' : 'none';
    }

    field.classList.toggle('valid', isValid);
    field.classList.toggle('invalid', !isValid && value);

    return isValid;
}

// Contact Form Success/Error Messages
function showContactSuccess() {
    const message = document.createElement('div');
    message.className = 'contact-message success';
    message.innerHTML = `
        <div class="message-content">
            <h3>Thank you for your message!</h3>
            <p>I'll get back to you within 24 hours.</p>
        </div>
    `;
    
    document.body.appendChild(message);
    
    anime({
        targets: message,
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 400,
        easing: 'easeOutQuart'
    });

    setTimeout(() => {
        anime({
            targets: message,
            opacity: [1, 0],
            translateY: [0, -50],
            duration: 400,
            easing: 'easeInQuart',
            complete: function() {
                message.remove();
            }
        });
    }, 3000);
}

function showContactError() {
    const message = document.createElement('div');
    message.className = 'contact-message error';
    message.innerHTML = `
        <div class="message-content">
            <h3>Something went wrong</h3>
            <p>Please check your information and try again.</p>
        </div>
    `;
    
    document.body.appendChild(message);
    
    anime({
        targets: message,
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 400,
        easing: 'easeOutQuart'
    });

    setTimeout(() => {
        anime({
            targets: message,
            opacity: [1, 0],
            translateY: [0, -50],
            duration: 400,
            easing: 'easeInQuart',
            complete: function() {
                message.remove();
            }
        });
    }, 3000);
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileMenu && hamburger) {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// Export functions for global access
window.toggleMobileMenu = toggleMobileMenu;