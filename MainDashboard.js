import { openDrawer, closeDrawer, initCommonListeners } from './drawer-core.js';

document.addEventListener('DOMContentLoaded', () => {
    initCommonListeners();

    const appointmentBtn = document.getElementById('appointmentBtn');
    const clinicForm = document.getElementById('clinicForm');
    const emailUsBtn = document.getElementById('emailUsBtn');
    const emailDrawer = document.getElementById('emailDrawer');
    const closeEmailDrawer = document.getElementById('closeEmailDrawer');
    const emailForm = document.getElementById('emailForm');
    const overlay = document.getElementById('drawerOverlay');
    
    const profileTrigger = document.getElementById('profileTrigger');
    const profileDropdown = document.getElementById('profileDropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    const initialsElement = document.getElementById('userInitials');
    const emailDisplay = document.getElementById('displayEmail');

    const userEmailAddr = localStorage.getItem('userEmail') || "guest.user@hcdc.edu.ph"; 
    
    if (initialsElement) {
        const namePart = userEmailAddr.split('@')[0]; 
        const nameArray = namePart.split('.'); 

        if (nameArray.length >= 2) {
            const firstInitial = nameArray[0].charAt(0).toUpperCase();
            const lastInitial = nameArray[1].charAt(0).toUpperCase();
            initialsElement.textContent = firstInitial + lastInitial;
        } else {
            initialsElement.textContent = namePart.charAt(0).toUpperCase();
        }
        
        if (emailDisplay) emailDisplay.textContent = userEmailAddr;
    }

    if (profileTrigger && profileDropdown) {
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            profileDropdown.classList.remove('active');
        });
    }

    if (emailUsBtn) {
        emailUsBtn.addEventListener('click', () => {
            emailDrawer.classList.add('open');
            overlay.classList.add('active');
        });
    }

    const closeEmail = () => {
        emailDrawer.classList.remove('open');
        overlay.classList.remove('active');
    };

    if (closeEmailDrawer) closeEmailDrawer.addEventListener('click', closeEmail);
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            closeEmail();
            closeDrawer();
        });
    }

    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const senderEmail = document.getElementById('userEmail').value;
            const subject = encodeURIComponent(document.getElementById('emailSubject').value);
            const rawMessage = document.getElementById('emailMessage').value;
            const body = encodeURIComponent(`Sender: ${senderEmail}\n\nMessage:\n${rawMessage}`);
            
            window.location.href = `mailto:clinic@hcdc.edu.ph?subject=${subject}&body=${body}`;
            closeEmail();
            emailForm.reset();
        });
    }

    if (appointmentBtn) appointmentBtn.addEventListener('click', openDrawer);

    if (clinicForm) {
        clinicForm.addEventListener('submit', function(e) {
            const emailInput = document.getElementById('hcdcEmail');
            if (!emailInput.value.toLowerCase().endsWith('@hcdc.edu.ph')) {
                e.preventDefault(); 
                emailInput.setCustomValidity("Please use your HCDC email.");
                emailInput.reportValidity();
            } else {
                emailInput.setCustomValidity("");
                alert('Success! Your appointment is scheduled.');
                closeDrawer();
            }
        });
    }

    function updateClinicStatus() {
        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');
        if (!statusDot || !statusText) return;

        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay(); 

        const isOpen = (day >= 2 && day <= 6 && hour >= 8 && hour < 17);

        if (isOpen) {
            statusDot.className = 'dot open';
            statusText.innerHTML = `<strong>Current Status:</strong> Open until 5:00 PM`;
        } else {
            statusDot.className = 'dot closed';
            
            let reopenMessage = "Opens 8:00 AM";

            if (day === 0 || day === 1 || (day === 6 && hour >= 17)) {
                reopenMessage = "Opens Tuesday 8:00 AM";
            }

            statusText.innerHTML = `<strong>Current Status:</strong> Closed (${reopenMessage})`;
        }
    }

    updateClinicStatus();
    setInterval(updateClinicStatus, 60000);

    if (window.location.hash === '#book') {
        setTimeout(() => {
            openDrawer();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300); 
    }
});

const observerOptions = { threshold: 0.1 };

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const cardsToAnimate = document.querySelectorAll('.tip-card, .status-card, .event-card');
cardsToAnimate.forEach(card => {
    card.classList.add('fade-in-scroll');
    scrollObserver.observe(card);
});

(function () {

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('visible');
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(function (el) {
        revealObserver.observe(el);
    });

    const staggerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                Array.from(entry.target.children).forEach(function (child, i) {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(28px)';
                    child.style.transition = 'opacity 0.6s ease ' + (i * 0.15) + 's, transform 0.6s ease ' + (i * 0.15) + 's';
                    requestAnimationFrame(function () {
                        requestAnimationFrame(function () {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        });
                    });
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-stagger').forEach(function (el) {
        Array.from(el.children).forEach(function (child) {
            child.style.opacity = '0';
        });
        staggerObserver.observe(el);
    });

    const titleObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section-title').forEach(function (el) {
        titleObserver.observe(el);
    });

    document.querySelectorAll('.tip-card').forEach(function (card) {
        var img = card.querySelector('.tip-icon img');
        if (!img) return;
        card.addEventListener('mouseenter', function () {
            img.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            img.style.transform = 'scale(1.25) rotate(-8deg)';
        });
        card.addEventListener('mouseleave', function () {
            img.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    document.querySelectorAll('.event-card').forEach(function (card) {
        var badge = card.querySelector('.event-date');
        if (!badge) return;
        card.addEventListener('mouseenter', function () {
            badge.style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
            badge.style.transform = 'scale(1.08)';
        });
        card.addEventListener('mouseleave', function () {
            badge.style.transform = 'scale(1)';
        });
    });

    var navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
            } else {
                navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
            }
        }, { passive: true });
    }

})();