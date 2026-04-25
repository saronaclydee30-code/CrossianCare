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