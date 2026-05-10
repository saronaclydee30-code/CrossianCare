const statPills = document.querySelectorAll('.stat-pill');
const statsBar  = document.querySelector('.stats-bar');

const countUp = (el, target) => {
    let count = 0;
    const step = Math.ceil(target / 40);
    const tick = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count + (target === 100 ? '+' : target === 24 ? '/7' : '');
        if (count >= target) clearInterval(tick);
    }, 35);
};

const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        statPills.forEach(pill => {
            const target = parseInt(pill.dataset.target);
            countUp(pill.querySelector('.stat-num'), target);
        });
        statsObserver.disconnect();
    }
}, { threshold: 0.5 });
if (statsBar) statsObserver.observe(statsBar);

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('revealed'), i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.image-wrapper').forEach(el => revealObserver.observe(el));

const reminderObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
            reminderObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reminder-card').forEach(el => reminderObserver.observe(el));

const dataItems = document.querySelectorAll('.dyk-data-item');
const facts = Array.from(dataItems).map(item => ({
    category: item.dataset.category,
    img: item.dataset.img,
    alt: item.dataset.alt,
    stat: item.dataset.stat,
    title: item.dataset.title,
    text: item.dataset.text
}));

let current = 0;
const cardEl   = document.getElementById('dykCard');
const imgEl    = document.getElementById('dykImg');
const catEl    = document.getElementById('dykCategory');
const statEl   = document.getElementById('dykStat');
const titleEl  = document.getElementById('dykTitle');
const textEl   = document.getElementById('dykText');
const currEl   = document.getElementById('dykCurrent');
const totalEl  = document.getElementById('dykTotal');
const dotsWrap = document.getElementById('dykDots');

if (totalEl) totalEl.textContent = facts.length;

const updateContent = (idx) => {
    const f = facts[idx];
    if(imgEl) { imgEl.src = f.img; imgEl.alt = f.alt; }
    if(catEl) catEl.textContent = f.category;
    if(statEl) statEl.textContent = f.stat;
    if(titleEl) titleEl.textContent = f.title;
    if(textEl) textEl.innerHTML = f.text;
    if(currEl) currEl.textContent = idx + 1;
};

if(dotsWrap) {
    facts.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'dyk-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => {
            if(i === current) return;
            const dir = i > current ? 1 : -1;
            current = i;
            showFact(current, dir);
            resetTimer();
        });
        dotsWrap.appendChild(dot);
    });
}

const updateDots = (idx) => {
    if(!dotsWrap) return;
    dotsWrap.querySelectorAll('.dyk-dot').forEach((d, i) => {
        d.classList.toggle('active', i === idx);
    });
};

const showFact = (idx, dir) => {
    if(!cardEl) return;
    cardEl.classList.add(dir === 1 ? 'slide-out-left' : 'slide-out-right');
    
    setTimeout(() => {
        updateContent(idx);
        updateDots(idx);
        cardEl.classList.remove('slide-out-left', 'slide-out-right');
        cardEl.classList.add(dir === 1 ? 'slide-in-right' : 'slide-in-left');
        
        setTimeout(() => {
            cardEl.classList.remove('slide-in-right', 'slide-in-left');
        }, 350);
    }, 300);
};

if(facts.length > 0) updateContent(0);

let autoTimer = setInterval(() => {
    if(facts.length > 0) {
        current = (current + 1) % facts.length;
        showFact(current, 1);
    }
}, 6000);

const resetTimer = () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
        if(facts.length > 0) {
            current = (current + 1) % facts.length;
            showFact(current, 1);
        }
    }, 6000);
};

document.getElementById('dykNext')?.addEventListener('click', () => {
    if(facts.length > 0) {
        current = (current + 1) % facts.length;
        showFact(current, 1);
        resetTimer();
    }
});

document.getElementById('dykPrev')?.addEventListener('click', () => {
    if(facts.length > 0) {
        current = (current - 1 + facts.length) % facts.length;
        showFact(current, -1);
        resetTimer();
    }
});