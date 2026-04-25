document.addEventListener('DOMContentLoaded', function() {
    const userEmail = localStorage.getItem('userEmail');
    const profileIcon = document.getElementById('profileIcon');
    const profileDropdown = document.getElementById('profileDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    if (!userEmail) {
        window.location.href = 'index.html';
        return;
    }

    const namePart = userEmail.split('@')[0];
    const names = namePart.split('.');
    
    let initials = "";
    if (names.length >= 2) {
        initials = (names[0][0] + names[1][0]).toUpperCase();
    } else {
        initials = names[0][0].toUpperCase();
    }
    
    profileIcon.innerText = initials;

    profileIcon.addEventListener('click', () => {
        profileDropdown.classList.toggle('show');
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    });

    window.addEventListener('click', (e) => {
        if (!profileIcon.contains(e.target)) {
            profileDropdown.classList.remove('show');
        }
    });
});