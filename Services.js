import { openDrawer, initCommonListeners } from './drawer-core.js';

document.addEventListener('DOMContentLoaded', () => {
    initCommonListeners();

    const viewScheduleBtn = document.getElementById('viewScheduleBtn');
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

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if(confirm("Are you sure you want to log out?")) {
                localStorage.removeItem('userEmail');
                window.location.href = 'index.html';
            }
        });
    }

    if (viewScheduleBtn) {
        viewScheduleBtn.addEventListener('click', openDrawer);
    }
});

const faqObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.faq-item').forEach(item => {
    faqObserver.observe(item);
});

const faqs = document.querySelectorAll('.faq-item');

faqs.forEach((faq) => {
    const summary = faq.querySelector('summary');
    const content = faq.querySelector('.faq-content');

    if (content) {
        content.style.maxHeight = '0px';
    }

    summary.addEventListener('click', (e) => {
        e.preventDefault();

        const isOpen = faq.hasAttribute('open');

        faqs.forEach((otherFaq) => {
            if (otherFaq !== faq && otherFaq.hasAttribute('open')) {
                const otherContent = otherFaq.querySelector('.faq-content');
                const otherInner = otherFaq.querySelector('.faq-inner');
                if (otherInner) {
                    otherInner.style.opacity = '0';
                    otherInner.style.transform = 'translateY(-10px)';
                }
                if (otherContent) {
                    otherContent.style.maxHeight = '0px';
                }
                setTimeout(() => {
                    otherFaq.removeAttribute('open');
                    if (otherInner) {
                        otherInner.style.opacity = '';
                        otherInner.style.transform = '';
                    }
                }, 420);
            }
        });

        if (!isOpen) {
            faq.setAttribute('open', '');
            if (content) {
                requestAnimationFrame(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                });
            }
        } else {
            const inner = faq.querySelector('.faq-inner');
            if (inner) {
                inner.style.opacity = '0';
                inner.style.transform = 'translateY(-10px)';
            }
            if (content) {
                content.style.maxHeight = '0px';
            }
            setTimeout(() => {
                faq.removeAttribute('open');
                if (inner) {
                    inner.style.opacity = '';
                    inner.style.transform = '';
                }
            }, 420);
        }
    });

    const resizeObserver = new ResizeObserver(() => {
        if (faq.hasAttribute('open') && content) {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
    if (content) resizeObserver.observe(content);
});