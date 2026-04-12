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

    if (appointmentBtn) {
        appointmentBtn.addEventListener('click', openDrawer);
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
            
            const userEmail = document.getElementById('userEmail').value;
            const subject = encodeURIComponent(document.getElementById('emailSubject').value);
            const rawMessage = document.getElementById('emailMessage').value;
            
            const bodyText = `From: ${userEmail}\n\nMessage:\n${rawMessage}`;
            const body = encodeURIComponent(bodyText);
            
            const clinicEmail = "clinic@hcdc.edu.ph";

            window.location.href = `mailto:${clinicEmail}?subject=${subject}&body=${body}`;
            
            closeEmail();
        });
    }

    if (clinicForm) {
        clinicForm.addEventListener('submit', function(e) {
            const emailInput = document.getElementById('hcdcEmail');
            const emailValue = emailInput.value.toLowerCase();

            if (!emailValue.endsWith('@hcdc.edu.ph')) {
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

    if (window.location.hash === '#book') {
        setTimeout(() => {
            openDrawer();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300); 
    }

    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const senderEmail = document.getElementById('userEmail').value;
            const subject = encodeURIComponent(document.getElementById('emailSubject').value);
            const rawMessage = document.getElementById('emailMessage').value;
            
            const bodyText = `Sender Email: ${senderEmail}\n\nMessage:\n${rawMessage}`;
            const body = encodeURIComponent(bodyText);
            
            const clinicEmail = "clinic@hcdc.edu.ph";

            window.location.href = `mailto:${clinicEmail}?subject=${subject}&body=${body}`;
            
            closeEmail();
            emailForm.reset(); 
        });
        }

        function updateClinicStatus() {
        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');

        if (!statusDot || !statusText) return;

        const now = new Date();
        const currentHour = now.getHours();
        const currentDay = now.getDay();

        const openTime = 8;
        const closeTime = 17;
        const isWeekend = (currentDay === 0 || currentDay === 6);

        let isOpen = false;

        if (!isWeekend && currentHour >= openTime && currentHour < closeTime) {
            isOpen = true;
        }

        if (isOpen) {
            statusDot.classList.remove('closed');
            statusDot.classList.add('open');
            statusText.innerHTML = `<strong>Current Status:</strong> Open until ${closeTime - 12}:00 PM`;
        } else {
            statusDot.classList.remove('open');
            statusDot.classList.add('closed');
            let message = isWeekend ? "Closed for the Weekend" : "Closed (Opens at 8:00 AM)";
            statusText.innerHTML = `<strong>Current Status:</strong> ${message}`;
        }
    }

    updateClinicStatus();

    setInterval(updateClinicStatus, 60000);
});