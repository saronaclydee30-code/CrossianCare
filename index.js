document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const emailInput = document.getElementById('emailInput');
    const emailValue = emailInput.value.trim().toLowerCase();
    const errorMsg = document.getElementById('error-msg');
    const submitBtn = document.querySelector('.btn-primary-login');

    if (emailValue.endsWith('@hcdc.edu.ph')) {
        errorMsg.style.display = 'none';
        submitBtn.innerText = 'Verifying...';
        submitBtn.style.background = '#1e90ff';

        setTimeout(() => {
            window.location.href = 'MainDashboard.html';
        }, 1000);
    } else {
        errorMsg.style.display = 'block';
        emailInput.style.borderColor = '#e53e3e';
        emailInput.focus();
    }
});