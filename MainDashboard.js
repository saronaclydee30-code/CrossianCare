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

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if(confirm("Are you sure you want to log out?")) {
                localStorage.removeItem('userEmail');
                window.location.href = 'index.html';
            }
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