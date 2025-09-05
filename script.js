// DOM Elements
const connectBtn = document.getElementById('connectBtn');

// Smooth scrolling and animations
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Add cursor trail effect
    initializeCursorTrail();
    
    // Add typing effect to subtitle
    initializeTypingEffect();
    
    // Add interactive background effects
    initializeInteractiveBackground();
    
    // Add code editor interactions
    initializeCodeEditor();
});

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.hero-text, .hero-visual, .footer');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize event listeners
function initializeEventListeners() {
    // Add hover effects to connect button
    if (connectBtn) {
        connectBtn.addEventListener('mouseenter', handleConnectHover);
        connectBtn.addEventListener('mouseleave', handleConnectLeave);
    }
    
    // Add parallax effect to floating dots
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add scroll effects (even though it's single page, for future expansion)
    window.addEventListener('scroll', handleScroll);
    
    // Add click effects to dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => createDotRipple(dot, index));
    });
}

// Handle connect button hover
function handleConnectHover(e) {
    const button = e.currentTarget;
    button.style.transform = 'translateY(-3px) scale(1.05)';
    
    // Add particle effect
    createButtonParticles(button);
}

// Handle connect button leave
function handleConnectLeave(e) {
    const button = e.currentTarget;
    button.style.transform = '';
}

// Create button particle effect
function createButtonParticles(button) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = button.getBoundingClientRect();
        particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        particle.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: 'translateY(-30px) scale(0)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).addEventListener('finish', () => {
            if (particle.parentNode) {
                particle.remove();
            }
        });
    }
}

// Create dot ripple effect
function createDotRipple(dot, index) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(99, 102, 241, 0.3);
        pointer-events: none;
        transform: scale(0);
        animation: dotRipple 1s ease-out;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 40px;
        margin-top: -20px;
        margin-left: -20px;
    `;
    
    dot.style.position = 'relative';
    dot.appendChild(ripple);
    
    // Add temporary glow to the dot
    dot.style.boxShadow = '0 0 25px rgba(99, 102, 241, 0.8)';
    dot.style.transform = 'scale(1.5)';
    
    setTimeout(() => {
        dot.style.boxShadow = '';
        dot.style.transform = '';
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 1000);
}

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes dotRipple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes gameGlow {
        0%, 100% {
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
        }
        50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
        }
    }
    
    .interactive-particle {
        position: absolute;
        pointer-events: none;
        border-radius: 50%;
        background: linear-gradient(45deg, var(--accent-color), var(--accent-glow));
        animation: particleFloat 3s ease-out forwards;
    }
    
    @keyframes particleFloat {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyles);

// Handle mouse movement for parallax effect
function handleMouseMove(e) {
    const dots = document.querySelectorAll('.dot');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    dots.forEach((dot, index) => {
        const speed = (index + 1) * 0.8;
        const x = (mouseX - 0.5) * speed * 15;
        const y = (mouseY - 0.5) * speed * 15;
        
        dot.style.transform = `translate(${x}px, ${y}px)`;
        
        // Add interactive glow based on mouse proximity
        const rect = dot.getBoundingClientRect();
        const dotCenterX = rect.left + rect.width / 2;
        const dotCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
            Math.pow(e.clientX - dotCenterX, 2) + Math.pow(e.clientY - dotCenterY, 2)
        );
        
        if (distance < 100) {
            const intensity = 1 - (distance / 100);
            dot.style.boxShadow = `0 0 ${20 + intensity * 20}px rgba(99, 102, 241, ${0.4 + intensity * 0.4})`;
            dot.style.transform += ` scale(${1 + intensity * 0.5})`;
        } else {
            dot.style.boxShadow = '';
        }
    });
}

// Handle scroll effects
function handleScroll() {
    // Future expansion for scroll-based animations
    const scrolled = window.pageYOffset;
    
    // Add subtle parallax to circles
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.1;
        circle.style.transform += ` translateY(${scrolled * speed}px)`;
    });
}

// Initialize cursor trail
function initializeCursorTrail() {
    const trail = [];
    const trailLength = 8; // Increased trail length
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        const opacity = 0.9 - (i * 0.1); // More visible opacity
        const size = 8 - (i * 0.5); // Varying sizes
        dot.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(99, 102, 241, ${opacity}) 0%, rgba(139, 92, 246, ${opacity * 0.8}) 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.2s ease;
            opacity: 0;
            box-shadow: 0 0 ${size * 2}px rgba(99, 102, 241, ${opacity * 0.5});
            mix-blend-mode: screen;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        trail.forEach((dot, index) => {
            dot.style.opacity = '1';
            // Add slight delay for each trail dot
            setTimeout(() => {
                dot.style.opacity = '1';
            }, index * 20);
        });
    });
    
    // Hide trail when mouse stops
    let timeout;
    document.addEventListener('mousemove', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            isMoving = false;
            trail.forEach((dot, index) => {
                setTimeout(() => {
                    dot.style.opacity = '0';
                }, index * 50);
            });
        }, 1500);
    });
    
    function animateTrail() {
        for (let i = trail.length - 1; i > 0; i--) {
            trail[i].style.left = trail[i - 1].style.left;
            trail[i].style.top = trail[i - 1].style.top;
        }
        
        trail[0].style.left = (mouseX - 4) + 'px';
        trail[0].style.top = (mouseY - 4) + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Initialize interactive background
function initializeInteractiveBackground() {
    // Add random particle generation
    setInterval(createRandomParticle, 3000);
    
    // Add click anywhere effect
    document.addEventListener('click', (e) => {
        if (e.target === document.body || e.target.classList.contains('container')) {
            createClickParticle(e.clientX, e.clientY);
        }
    });
    
    // Add gaming-style background grid
    createBackgroundGrid();
}

// Create random floating particles
function createRandomParticle() {
    const particle = document.createElement('div');
    particle.className = 'interactive-particle';
    
    const size = Math.random() * 8 + 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    // Animate upward
    particle.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0.6 },
        { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: 8000 + Math.random() * 4000,
        easing: 'linear'
    }).addEventListener('finish', () => {
        if (particle.parentNode) {
            particle.remove();
        }
    });
}

// Create click particle effect
function createClickParticle(x, y) {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, var(--accent-color), var(--accent-glow));
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${x}px;
            top: ${y}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`, opacity: 0 }
        ], {
            duration: 600 + Math.random() * 400,
            easing: 'ease-out'
        }).addEventListener('finish', () => {
            if (particle.parentNode) {
                particle.remove();
            }
        });
    }
}

// Create background grid effect
function createBackgroundGrid() {
    const gridContainer = document.createElement('div');
    gridContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.05;
        pointer-events: none;
        z-index: -1;
        background-image: 
            linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px);
        background-size: 50px 50px;
        animation: gridPulse 4s ease-in-out infinite;
    `;
    
    document.body.appendChild(gridContainer);
}

// Add grid pulse animation
const gridStyle = document.createElement('style');
gridStyle.textContent = `
    @keyframes gridPulse {
        0%, 100% { opacity: 0.05; }
        50% { opacity: 0.1; }
    }
`;
document.head.appendChild(gridStyle);

// Initialize typing effect
function initializeTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 30); // Faster typing for game developer feel
        }
    }
    
    // Start typing after other animations
    setTimeout(typeText, 1000);
}

// Initialize code editor interactions
function initializeCodeEditor() {
    const codeEditor = document.querySelector('.code-editor');
    const gameIcons = document.querySelectorAll('.game-icon');
    
    if (codeEditor) {
        // Add hover effect to code editor
        codeEditor.addEventListener('mouseenter', () => {
            codeEditor.style.transform = 'scale(1.02) translateY(-5px)';
            codeEditor.style.boxShadow = '0 25px 50px rgba(99, 102, 241, 0.2)';
        });
        
        codeEditor.addEventListener('mouseleave', () => {
            codeEditor.style.transform = '';
            codeEditor.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5)';
        });
        
        // Add click effect to code lines
        const codeLines = document.querySelectorAll('.code-line');
        codeLines.forEach((line, index) => {
            line.addEventListener('click', () => {
                // Remove active class from all lines
                codeLines.forEach(l => l.classList.remove('active'));
                // Add active class to clicked line
                line.classList.add('active');
                
                // Create typing effect on the line
                const codeText = line.querySelector('.code-text');
                const originalText = codeText.textContent;
                codeText.textContent = '';
                
                let i = 0;
                function typeCode() {
                    if (i < originalText.length) {
                        codeText.textContent += originalText.charAt(i);
                        i++;
                        setTimeout(typeCode, 50);
                    }
                }
                typeCode();
            });
        });
    }
    
    // Make game icons interactive
    gameIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // Create burst effect
            createIconBurst(icon);
            
            // Temporary scale effect
            icon.style.transform = 'scale(1.5) rotate(360deg)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 600);
        });
    });
}

// Create icon burst effect
function createIconBurst(icon) {
    const rect = icon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${centerX}px;
            top: ${centerY}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 6) * Math.PI * 2;
        const distance = 30 + Math.random() * 20;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).addEventListener('finish', () => {
            if (particle.parentNode) {
                particle.remove();
            }
        });
    }
}

// Add smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Performance optimization: Throttle mouse move events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Apply throttling to mouse move handler
const throttledMouseMove = throttle(handleMouseMove, 16); // ~60fps
document.removeEventListener('mousemove', handleMouseMove);
document.addEventListener('mousemove', throttledMouseMove);
