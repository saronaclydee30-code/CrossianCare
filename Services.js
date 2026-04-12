import { openDrawer, initCommonListeners } from './drawer-core.js';

document.addEventListener('DOMContentLoaded', () => {
    initCommonListeners();

    const viewScheduleBtn = document.getElementById('viewScheduleBtn');
    if (viewScheduleBtn) {
        viewScheduleBtn.addEventListener('click', openDrawer);
    }
});