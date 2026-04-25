document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const emailField = document.getElementById('emailInput');
    const emailValue = emailField.value.trim().toLowerCase();
    const errorMsg = document.getElementById('error-msg');
    const submitBtn = document.querySelector('.btn-primary-login');

    if (emailValue.endsWith('@hcdc.edu.ph')) {
        errorMsg.style.display = 'none';
        emailField.style.borderColor = '#d1d5db';
        
        submitBtn.innerText = 'Verifying...';
        submitBtn.style.background = '#1e90ff';
        submitBtn.disabled = true;

        localStorage.setItem('userEmail', emailValue);

        setTimeout(() => {
            window.location.href = 'MainDashboard.html';
        }, 1200);

    } else {
        errorMsg.style.display = 'block';
        emailField.style.borderColor = '#e53e3e';
        emailField.focus();
        
        emailField.animate([
            { transform: 'translateX(0px)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(0px)' }
        ], { duration: 200 });
    }
});