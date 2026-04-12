export const openDrawer = (e) => {
    const sideDrawer = document.getElementById('sideDrawer');
    const overlay = document.getElementById('drawerOverlay');
    
    if(e) e.preventDefault();
    if(sideDrawer && overlay) {
        sideDrawer.classList.add('open');
        overlay.classList.add('active');
    }
};

export const closeDrawer = () => {
    const sideDrawer = document.getElementById('sideDrawer');
    const overlay = document.getElementById('drawerOverlay');
    
    if(sideDrawer && overlay) {
        sideDrawer.classList.remove('open');
        overlay.classList.remove('active');
    }
};

export function initCommonListeners() {
    const closeBtn = document.getElementById('closeDrawer');
    const goBackBtn = document.getElementById('goBackBtn');
    const overlay = document.getElementById('drawerOverlay');

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (goBackBtn) goBackBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);
}