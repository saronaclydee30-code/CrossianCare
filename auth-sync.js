document.addEventListener('DOMContentLoaded', function () {
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
    let initials = names.length >= 2
        ? (names[0][0] + names[1][0]).toUpperCase()
        : names[0][0].toUpperCase();
    profileIcon.innerText = initials;

    const modal = document.createElement('div');
    modal.id = 'logoutModal';
    modal.innerHTML = `
        <div id="logoutModalBox">
            <p>Are you sure you want to log out?</p>
            <div id="logoutModalBtns">
                <button id="logoutYes">Yes</button>
                <button id="logoutCancel">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const style = document.createElement('style');
    style.textContent = `
        #logoutModal {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
            align-items: center;
            justify-content: center;
        }
        #logoutModal.active { display: flex; }
        #logoutModalBox {
            background: #1e2330;
            border-radius: 14px;
            padding: 2rem 2.5rem;
            min-width: 300px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        #logoutModalBox p {
            color: #fff;
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            font-family: 'Montserrat', sans-serif;
        }
        #logoutModalBtns {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        #logoutYes {
            background: #c8e6a0;
            color: #2d3a1e;
            border: none;
            padding: 10px 32px;
            border-radius: 50px;
            font-weight: 700;
            cursor: pointer;
            font-size: 0.95rem;
            transition: background 0.2s;
        }
        #logoutYes:hover { background: #b5d97f; }
        #logoutCancel {
            background: #3a4155;
            color: #fff;
            border: none;
            padding: 10px 24px;
            border-radius: 50px;
            font-weight: 700;
            cursor: pointer;
            font-size: 0.95rem;
            transition: background 0.2s;
        }
        #logoutCancel:hover { background: #4a5270; }
    `;
    document.head.appendChild(style);

    profileIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
    });

    window.addEventListener('click', () => {
        profileDropdown.classList.remove('show');
    });

    logoutBtn.addEventListener('click', () => {
        profileDropdown.classList.remove('show');
        modal.classList.add('active');
    });

    document.getElementById('logoutYes').addEventListener('click', () => {
        localStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    });

    document.getElementById('logoutCancel').addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
});