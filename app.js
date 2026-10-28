const notes = [
"【0:00—0:10】各位评委老师好，我是上海应用技术大学国际经济与贸易2026级的郭千羽。我的题目是《把小家电卖到海外》。这不是一份成绩汇报，而是一张四年客户开发蓝图。",
"【0:10—0:35】我先说清楚起点：我没有实习、没有客户、没有成交。但我有国贸专业基础，愿意和人打交道，也有四年时间。我不把没有成绩当借口，我把它当规划的起点。",
"【0:35—1:15】为什么是小家电？因为它离产业最近。国家在推动制造出海和数字贸易，上海有港口、展会和跨境电商资源，长三角又有完整的小家电供应链。小家电客户类型多、链路长，适合国贸生从客户开发切入。目标市场暂定东南亚，作为验证样本。",
"【1:15—1:45】为什么是我？我喜欢做前端，愿意和人打交道，也能承受拒绝。但我也承认差距：英语口语、行业知识、真实客户经验都不够。我的优势不是履历，是性格和行动的匹配度。",
"【1:45—2:10】我要做的不是泛泛的外贸业务员，而是小家电方向的海外客户开发。这个岗位需要六项能力：英语沟通、产品理解、客户搜索、开发信、报价谈判、数据复盘。核心不是会英语，而是把线索变成订单。",
"【2:10—2:35】我把差距拆成六个可训练的动作。现在我在起点，但我知道每一项要怎么补、补到什么程度。比如英语不是背单词，而是能完成商务沟通；客户搜索不是找邮箱，而是找到对的买家。",
"【2:35—3:15】这是我的四年总蓝图。大一探索，大二验证，大三实战，大四落地。每一年只回答一个问题：我是否更适合做客户开发？每一年都有检查点和预期产出，不用成绩包装自己。",
"【3:15—3:50】大一，我先把基础打牢：GPA、CET-4、Excel；再做行业认知：20条JD、一页产业链图；然后做两个专业动作：一封模拟开发信、一份模拟报价。期末我要回答：我愿意继续做客户开发吗？",
"【3:50—4:25】大二，我要把课堂能力变成作品：CET-6、一项竞赛、一段微实习、一次完整客户开发模拟。检查点是：我能不能独立完成从找客户到报价的流程。",
"【4:25—5:00】大三，我要去真实业务里拿反馈。核心实习、独立跟进一个小客户群、确定行业和区域。检查点不是我喜欢不喜欢，而是我能不能承受拒绝、持续跟进、独立复盘。",
"【5:00—5:25】大四，把蓝图落到具体岗位。首选直接就业，做海外客户开发或外贸业务员；也可以深造；同时保留跨境电商运营、国际物流等备选。先就业再择业，但方向不跑偏。",
"【5:25—5:50】我不会把资源当背景板。学校的课程、就业中心、老师、校友，上海的展会、园区、企业，Excel、Google、LinkedIn、阿里国际站，还有从业者和学长学姐，都是我要主动约出来、用起来、留下记录的。",
"【5:50—6:25】如果走不通怎么办？我设了三个风险：英语、行业知识、客户拒绝。每个风险都有动作和预警信号。每学期末问自己三个问题：做到了吗？反馈是什么？要不要调整？备选路径是跨境电商运营、国际物流或客户成功。",
"【6:25—6:40】现在没有成绩，不代表没有方向。四年后，我希望自己能独立开发小家电海外客户。我愿意从客户名单做起，从开发信改起，从每一次拒绝里复盘。谢谢评委，请给我一个实习机会。"
];
const slides = [...document.querySelectorAll('.slide')];
const total = slides.length;
const titles = slides.map(s => s.dataset.title);
let cur = 0, wheelLock = 0;
let isAnimating = false;
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
const chapterOf = [0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5];

const deck = document.getElementById('deck');
const dots = document.getElementById('dots');
const menuGrid = document.getElementById('menuGrid');
const menuOverlay = document.getElementById('menuOverlay');
const notesDrawer = document.getElementById('notesDrawer');
const notesText = document.getElementById('notesText');
const notesTitle = document.getElementById('notesTitle');
const intro = document.getElementById('intro');
const hint = document.getElementById('hint');
const txSweep = document.getElementById('txSweep');
const txSeam = document.getElementById('txSeam');
const txFolio = document.getElementById('txFolio');
const txNum = document.getElementById('txNum');
const txName = document.getElementById('txName');

function fit() {
  const scale = Math.min(innerWidth / 1920, innerHeight / 1080);
  deck.style.transform = `scale(${scale})`;
}
addEventListener('resize', fit); fit();

titles.forEach((title, i) => {
  const dot = document.createElement('button');
  dot.type = 'button'; dot.setAttribute('aria-label', title);
  dot.onclick = () => go(i);
  dots.appendChild(dot);

  const item = document.createElement('button');
  item.type = 'button'; item.className = 'menu-item';
  item.innerHTML = `<span>${String(i + 1).padStart(2, '0')}</span><b>${title}</b>`;
  item.onclick = () => { closeMenu(); go(i); };
  menuGrid.appendChild(item);
});

function updateChrome() {
  [...dots.children].forEach((dot, i) => dot.classList.toggle('active', i === cur));
  notesText.textContent = notes[cur] || '本页暂无讲稿。';
  notesTitle.textContent = `讲稿 · ${String(cur + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}
function go(n) {
  if (n < 0 || n >= total || n === cur) { updateChrome(); return; }
  if (isAnimating) return;
  const from = cur;
  const dir = n > from ? 1 : -1;
  const distance = Math.abs(n - from);
  const chapter = chapterOf[n] !== chapterOf[from];
  const variant = motionQuery.matches ? 'fade' : distance > 1 ? 'dolly' : chapter ? 'chapter' : 'turn';
  cur = n;
  updateChrome();
  hideHint();
  intro.classList.add('off');
  document.body.classList.add('started');
  if (!motionQuery.matches && slides[from].animate) {
    playTransition(from, n, dir, variant);
  } else {
    slides[from].classList.remove('active');
    slides[n].classList.add('active');
  }
}

function playTransition(from, to, dir, variant) {
  isAnimating = true;
  const out = slides[from];
  const inn = slides[to];
  const chapter = variant === 'chapter';
  const dolly = variant === 'dolly';
  const duration = chapter ? 1240 : dolly ? 1020 : 980;
  const activation = chapter ? 300 : dolly ? 240 : 190;

  const directionClass = dir > 0 ? 'tx-forward' : 'tx-back';
  deck.classList.add('is-transitioning', `tx-${variant}`, directionClass);
  out.classList.add('is-outgoing');
  inn.classList.add('is-incoming');
  if (!dolly) {
    out.style.transformOrigin = dir > 0 ? '0% 50%' : '100% 50%';
    inn.style.transformOrigin = dir > 0 ? '100% 50%' : '0% 50%';
  }

  let outFrames;
  let inFrames;

  if (dolly) {
    outFrames = [
      { transform: 'translate3d(0,0,0) scale(1)', opacity: 1, filter: 'brightness(1) saturate(1)' },
      { offset: .55, transform: `translate3d(${-2.5 * dir}%,0,-90px) scale(1.035)`, opacity: .42, filter: 'brightness(.66) saturate(.8)' },
      { transform: `translate3d(${-4.5 * dir}%,0,-210px) scale(1.075)`, opacity: 0, filter: 'brightness(.4) saturate(.7)' }
    ];
    inFrames = [
      { transform: 'translate3d(0,0,0) scale(.925)', opacity: 0, filter: 'brightness(.5) saturate(.82)' },
      { offset: .42, opacity: .78, filter: 'brightness(.88) saturate(.94)' },
      { transform: 'translate3d(0,0,0) scale(1)', opacity: 1, filter: 'brightness(1) saturate(1)' }
    ];
  } else {
    const outShift = chapter ? 20 : 11;
    const outRot = chapter ? 22 : 12;
    const outDepth = chapter ? -460 : -300;
    const outScale = chapter ? .905 : .945;
    const inShift = chapter ? 25 : 16;
    const inRot = chapter ? 24 : 16;
    const inDepth = chapter ? -580 : -420;
    const inScale = chapter ? .885 : .925;

    outFrames = [
      { transform: 'translate3d(0,0,0) rotateY(0deg) rotateZ(0deg) scale(1)', opacity: 1, filter: 'brightness(1) saturate(1)' },
      { offset: .5, opacity: .62, filter: 'brightness(.76) saturate(.86)' },
      { transform: `translate3d(${-outShift * dir}%,${-.65 * dir}%,${outDepth}px) rotateY(${outRot * dir}deg) rotateZ(${-.42 * dir}deg) scale(${outScale})`, opacity: 0, filter: 'brightness(.4) saturate(.68)' }
    ];
    inFrames = [
      { transform: `translate3d(${inShift * dir}%,${.7 * dir}%,${inDepth}px) rotateY(${-inRot * dir}deg) rotateZ(${.32 * dir}deg) scale(${inScale})`, opacity: 0, filter: 'brightness(.48) saturate(.8)' },
      { offset: .58, opacity: .9, filter: 'brightness(.92) saturate(.97)' },
      { transform: 'translate3d(0,0,0) rotateY(0deg) rotateZ(0deg) scale(1)', opacity: 1, filter: 'brightness(1) saturate(1)' }
    ];
  }

  const outAnim = out.animate(outFrames, {
    duration,
    easing: 'cubic-bezier(.66,.02,.16,1)',
    fill: 'both'
  });
  const inAnim = inn.animate(inFrames, {
    duration: duration + 90,
    delay: dolly ? 0 : 55,
    easing: 'cubic-bezier(.58,.02,.18,1)',
    fill: 'both'
  });
  const activationTimer = setTimeout(() => inn.classList.add('active'), activation);

  playTransitionFx(dir, variant, duration);

  Promise.allSettled([outAnim.finished, inAnim.finished]).then(() => {
    clearTimeout(activationTimer);
    inn.classList.add('active');
    outAnim.cancel();
    inAnim.cancel();
    out.classList.remove('active', 'is-outgoing');
    inn.classList.remove('is-incoming');
    out.style.transformOrigin = '';
    inn.style.transformOrigin = '';
    requestAnimationFrame(() => {
      deck.classList.remove('is-transitioning', `tx-${variant}`, directionClass);
      isAnimating = false;
    });
  });
}

function playTransitionFx(dir, variant, duration) {
  const chapter = variant === 'chapter';
  const start = dir > 0 ? 2080 : -180;
  const end = dir > 0 ? -180 : 2080;
  const sweepStart = start - (dir > 0 ? 300 : -300);
  const sweepEnd = end - (dir > 0 ? 300 : -300);
  const easing = 'cubic-bezier(.36,0,.18,1)';

  txSeam.animate([
    { transform: `translate3d(${start}px,0,0) skewX(-5deg)`, opacity: 0 },
    { offset: .24, opacity: chapter ? 1 : .58 },
    { offset: .68, opacity: chapter ? .72 : .28 },
    { transform: `translate3d(${end}px,0,0) skewX(-5deg)`, opacity: 0 }
  ], { duration: Math.round(duration * .9), easing, fill: 'none' });

  txSweep.animate([
    { transform: `translate3d(${sweepStart}px,0,0) skewX(-8deg)`, opacity: 0 },
    { offset: .3, opacity: chapter ? .95 : .58 },
    { offset: .7, opacity: chapter ? .55 : .22 },
    { transform: `translate3d(${sweepEnd}px,0,0) skewX(-8deg)`, opacity: 0 }
  ], { duration: duration + 80, easing, fill: 'none' });

  if (!chapter) return;
  txNum.textContent = String(cur + 1).padStart(2, '0');
  txName.textContent = titles[cur];
  txFolio.animate([
    { opacity: 0, transform: 'translate3d(0,30px,0)', clipPath: 'inset(0 0 100% 0)' },
    { offset: .27, opacity: 1, transform: 'translate3d(0,0,0)', clipPath: 'inset(0 0 0 0)' },
    { offset: .7, opacity: 1, transform: 'translate3d(0,0,0)', clipPath: 'inset(0 0 0 0)' },
    { opacity: 0, transform: 'translate3d(0,-14px,0)', clipPath: 'inset(0 0 100% 0)' }
  ], { duration: duration + 130, easing: 'cubic-bezier(.16,.84,.24,1)', fill: 'none' });
}
function next() { go(cur + 1); }
function prev() { go(cur - 1); }
function hideHint() { hint.classList.add('hide'); }

document.getElementById('next').onclick = next;
document.getElementById('prev').onclick = prev;

function openMenu() { menuOverlay.classList.add('open'); }
function closeMenu() { menuOverlay.classList.remove('open'); }
function toggleMenu() { menuOverlay.classList.toggle('open'); }
function toggleNotes() { notesDrawer.classList.toggle('open'); }
menuOverlay.onclick = e => { if (e.target === menuOverlay) closeMenu(); };

document.querySelectorAll('[data-action]').forEach(btn => btn.onclick = () => {
  const action = btn.dataset.action;
  if (action === 'menu') toggleMenu();
  if (action === 'notes') toggleNotes();
  if (action === 'full') {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }
});

addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeMenu(); notesDrawer.classList.remove('open'); return; }
  if (e.key === 'o' || e.key === 'O') { toggleMenu(); return; }
  if (e.key === 'n' || e.key === 'N') { toggleNotes(); return; }
  if (e.key === 'f' || e.key === 'F') {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
    return;
  }
  if (e.key === 'b' || e.key === 'B') { document.body.classList.toggle('chrome-off'); return; }
  if (menuOverlay.classList.contains('open')) return;
  if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); next(); }
  if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); prev(); }
  if (e.key === 'Home') { e.preventDefault(); go(0); }
  if (e.key === 'End') { e.preventDefault(); go(total - 1); }
});

addEventListener('wheel', e => {
  if (isAnimating || menuOverlay.classList.contains('open')) return;
  const now = Date.now();
  if (now < wheelLock || Math.abs(e.deltaY) < 10) return;
  wheelLock = now + 1320;
  e.deltaY > 0 ? next() : prev();
}, { passive: true });

let touchX = 0, touchY = 0;
addEventListener('touchstart', e => {
  touchX = e.touches[0].clientX; touchY = e.touches[0].clientY;
}, { passive: true });
addEventListener('touchend', e => {
  if (isAnimating) return;
  const dx = e.changedTouches[0].clientX - touchX;
  const dy = e.changedTouches[0].clientY - touchY;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) dx < 0 ? next() : prev();
}, { passive: true });

const globe = document.getElementById('globe');
addEventListener('mousemove', e => {
  if (!globe) return;
  const x = e.clientX / innerWidth - .5;
  const y = e.clientY / innerHeight - .5;
  globe.style.transform = `translate(${x * -13}px, ${y * -10}px)`;
});

const mapNote = document.getElementById('mapNote');
document.querySelectorAll('.map-node').forEach(node => node.onclick = () => {
  document.querySelectorAll('.map-node').forEach(x => x.classList.remove('on'));
  node.classList.add('on');
  mapNote.innerHTML = node.dataset.tip;
});

document.querySelectorAll('.s6 .row').forEach(row => row.onclick = () => row.classList.toggle('done'));

document.querySelectorAll('.stage').forEach(stage => stage.onclick = () => go(Number(stage.dataset.jump)));

document.querySelectorAll('.s11 .lane').forEach(lane => lane.onclick = () => {
  const lanes = document.getElementById('lanes');
  const wasFocused = lane.classList.contains('focus');
  document.querySelectorAll('.s11 .lane').forEach(x => x.classList.remove('focus'));
  if (!wasFocused) { lane.classList.add('focus'); lanes.classList.add('focused'); }
  else lanes.classList.remove('focused');
});

const resDetail = document.getElementById('resDetail');
document.querySelectorAll('.res').forEach(node => node.onclick = () => {
  document.querySelectorAll('.res').forEach(x => x.classList.remove('on'));
  node.classList.add('on');
  resDetail.innerHTML = node.dataset.detail;
});

const ask = document.getElementById('ask');
ask.onclick = () => ask.classList.toggle('revealed');

const requested = Number(new URLSearchParams(location.search).get('slide'));
if (Number.isInteger(requested) && requested > 0 && requested <= total) {
  slides[cur].classList.remove('active');
  cur = requested - 1;
  slides[cur].classList.add('active');
  updateChrome();
}

document.addEventListener('mousemove', () => document.body.classList.add('started'), { once: true });
setTimeout(() => document.body.classList.add('started'), 6000);
intro.addEventListener('click', () => intro.classList.add('off'));
setTimeout(() => intro.classList.add('off'), 1650);

updateChrome();
