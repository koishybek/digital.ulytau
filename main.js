// Initialize Lucide Icons
if (window.lucide) {
    lucide.createIcons();
}

// Custom CountUp Function
function animateCount(el, target, suffix = '', decimals = 0, duration = 2000) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function: easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const currentValue = (ease * target).toFixed(decimals);
        el.innerText = currentValue + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for Staggered Animations & CountUp
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const el = entry.target;
            
            // Handle CountUp if it's a stat item or contains a stat value
            const statValue = el.classList.contains('stat-value') ? el : el.querySelector('.stat-value');
            if (statValue && !statValue.classList.contains('counted')) {
                const targetValue = parseFloat(statValue.getAttribute('data-target'));
                const suffix = statValue.getAttribute('data-suffix') || '';
                const decimals = parseInt(statValue.getAttribute('data-decimals')) || 0;
                animateCount(statValue, targetValue, suffix, decimals);
                statValue.classList.add('counted');
            }
            
            // Add visible class for stagger
            el.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .benefit-item, .stat-item, .case-card, .process-step').forEach((el, index) => {
    // Add inline transition delay for staggered effect based on index in row
    // Assuming 3 columns, we use index % 3 for stagger
    el.style.transitionDelay = `${(index % 3) * 0.15}s`; 
    staggerObserver.observe(el);
});

// FAQ Accordion Logic
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    
    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('open');
                otherItem.querySelector('.faq-a').style.maxHeight = '0px';
            }
        });
        
        // Toggle current item
        if (isOpen) {
            item.classList.remove('open');
            answer.style.maxHeight = '0px';
        } else {
            item.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = contactForm.querySelectorAll('input, textarea');
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Переход в WhatsApp...';
        btn.disabled = true;

        const name = inputs[0].value;
        const phone = inputs[1].value;
        const messageText = inputs[2].value;

        const fullMessage = `Привет! Меня зовут ${name}. %0AМой контакт: ${phone}. %0AО проекте: ${messageText}`;
        const whatsappUrl = `https://wa.me/77776291638?text=${fullMessage}`;

        // Small delay for UX feedback
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            btn.innerText = 'Перенаправлено!';
            btn.style.backgroundColor = '#4BB543';
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
            }, 3000);
        }, 800);
    });
}

// Smooth scrolling for Anchor links
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
