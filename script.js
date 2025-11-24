// Interactive elements for the visual guide demo

document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects to data cards
    const dataCards = document.querySelectorAll('.data-card');
    dataCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animate chart bars on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.chart-bar');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.height = bar.style.height;
                    }, index * 200);
                });
                chartObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all chart placeholders
    document.querySelectorAll('.chart-placeholder').forEach(placeholder => {
        chartObserver.observe(placeholder);
    });

    // CTA button animation
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            this.textContent = 'Exploring...';
            this.style.background = 'var(--secondary)';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.textContent = 'Demo Explored!';
                this.style.background = 'var(--success)';
                
                setTimeout(() => {
                    this.textContent = 'Explore the Demo';
                    this.style.background = 'white';
                    this.style.color = 'var(--primary)';
                }, 2000);
            }, 1000);
        });
    }

    // Add animation to testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 300);
        }, 500);
    });

    // Add interactive elements to the pie chart
    const pieCharts = document.querySelectorAll('.pie-chart');
    pieCharts.forEach(chart => {
        chart.addEventListener('click', function() {
            this.style.transform = 'rotate(360deg)';
            this.style.transition = 'transform 0.8s ease';
            
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 800);
        });
    });

    // Add scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .data-card, .testimonial-card');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize elements with opacity and transform for scroll animation
    document.querySelectorAll('.feature-card, .data-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});

// Add some dynamic content updates
function updateStats() {
    const statElements = document.querySelectorAll('[data-dynamic]');
    statElements.forEach(element => {
        const currentValue = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        const increment = Math.floor(Math.random() * 10) + 1;
        const newValue = currentValue + increment;
        
        // Animate the number change
        let startValue = 0;
        const duration = 2000;
        const startTime = performance.now();
        
        function updateValue(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(progress * newValue);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        }
        
        requestAnimationFrame(updateValue);
    });
}

// Call updateStats periodically to simulate changing data
setInterval(updateStats, 10000);