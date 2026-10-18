import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import { brand, directions, moreLinks, venues, programs, calc, steps, stats, gallery, faq } from './data.js'

gsap.registerPlugin(ScrollTrigger, SplitText)

const $ = (s, root = document) => root.querySelector(s)
const $$ = (s, root = document) => [...root.querySelectorAll(s)]
const rub = (n) => Math.round(n).toLocaleString('ru-RU')
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

// Разовое появление при прокрутке. IntersectionObserver вместо ScrollTrigger:
// его не нужно пересчитывать, когда меняется высота страницы (например, при фильтре).
// offset — какая доля экрана снизу должна остаться, когда элемент «появился».
function onReveal(el, play, offset = 0.15) {
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    io.disconnect()
    play()
  }, { rootMargin: `0px 0px -${offset * 100}% 0px` })
  io.observe(el)
}
const revealFrom = (el, vars, offset, targets = el) => {
  const tween = gsap.from(targets, { ...vars, paused: true })
  onReveal(el, () => tween.play(), offset)
}

/* =========================================================
   1. Рендер контента из data.js
   ========================================================= */

const icons = {
  mask: '<svg viewBox="0 0 100 100" class="dir-card__icon"><path d="M10 30c25-10 55-10 80 0 0 30-12 52-40 58C22 82 10 60 10 30z" fill="#111111"/><circle cx="35" cy="45" r="8" fill="#FFF6E9"/><circle cx="65" cy="45" r="8" fill="#FFF6E9"/><path d="M36 64c8 8 20 8 28 0" stroke="#FFF6E9" stroke-width="5" fill="none" stroke-linecap="round"/></svg>',
  house: '<svg viewBox="0 0 100 100" class="dir-card__icon"><path d="M12 48L50 14l38 34v38H12z" fill="#FFF6E9"/><rect x="40" y="58" width="20" height="28" rx="3" fill="#111111"/><circle cx="50" cy="38" r="7" fill="#E2B23A"/></svg>',
  key: '<svg viewBox="0 0 100 100" class="dir-card__icon"><circle cx="34" cy="50" r="22" fill="none" stroke="#111111" stroke-width="10"/><path d="M54 50h36M76 50v14M88 50v10" stroke="#111111" stroke-width="10" stroke-linecap="round"/></svg>',
  gift: '<svg viewBox="0 0 100 100" class="dir-card__icon"><rect x="14" y="42" width="72" height="46" rx="6" fill="#FF6A00"/><rect x="8" y="30" width="84" height="16" rx="5" fill="#111111"/><rect x="44" y="30" width="12" height="58" fill="#FFF6E9"/><path d="M50 30c-10-20-30-14-22 0M50 30c10-20 30-14 22 0" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/></svg>',
}

function renderDirections() {
  $('[data-directions]').innerHTML = directions.map((d, i) => `
    <article class="dir-card" data-color="${d.color}">
      <span class="dir-card__bg"></span>
      <div class="dir-card__photo"><img src="${d.photo}" alt="${d.title}" loading="lazy" />${icons[d.icon]}</div>
      <span class="dir-card__tag">${d.tag}</span>
      <h3>${d.title}</h3>
      <p>${d.text}</p>
      <ul>${d.points.map((p) => `<li>${p}</li>`).join('')}</ul>
      <a class="dir-card__link" href="${d.vk}" target="_blank" rel="noopener">Группа ВКонтакте <span>→</span></a>
    </article>`).join('')
}

const ageLabel = (p) => (p.group === 'adult' ? '18+' : p.group === 'surprise' ? 'для всех' : `${p.age[0]}+`)

function renderPrograms() {
  $('[data-programs]').innerHTML = programs.map((p, i) => `
    <article class="prog" data-color="${p.color}" data-group="${p.group}">
      <div class="prog__emoji" aria-hidden="true">${p.emoji}</div>
      <span class="prog__kind">${p.kind} · ${venues[p.venue]}</span>
      <h3>${p.title}</h3>
      <p>${p.text}</p>
      <div class="prog__meta">
        <span>${ageLabel(p)}</span>
        <span class="prog__price">${p.group === 'surprise' ? 'от ' : ''}${rub(p.price)} ₽</span>
      </div>
      <button class="prog__pick" data-pick="${i}">Выбрать →</button>
    </article>`).join('')
}

function renderStatic() {
  $$('[data-phone]').forEach((a) => {
    a.href = brand.phoneHref
    const span = $('span', a)
    ;(span || a).textContent = brand.phone
  })
  $$('[data-vk-write]').forEach((a) => (a.href = brand.vkWrite))
  $('[data-venues]').innerHTML = brand.venues.map((v) => `<b>${v.name}</b><small>${v.address}</small>`).join('')
  $('[data-managers]').innerHTML =
    `<a href="${brand.phoneHref}"><b>${brand.phoneFull}</b></a>` +
    brand.managers.map((m) => `<a href="${m.href}"><b>${m.phone}</b> <small>${m.name}</small></a>`).join('')
  $('[data-hours]').textContent = brand.hours
  $('[data-year]').textContent = new Date().getFullYear()
  $('[data-vk-links]').innerHTML = [...directions, ...moreLinks].map((d) => `<a href="${d.vk}" target="_blank" rel="noopener">${d.title}</a>`).join('')

  $('[data-steps]').innerHTML = steps.map((s, i) => `
    <li><div class="how__num">${i + 1}</div><h3>${s.title}</h3><p>${s.text}</p></li>`).join('')

  $('[data-stats]').innerHTML = stats.map((s) => `
    <div class="stat"><b data-count="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</b><span>${s.label}</span></div>`).join('')

  // фото дублируем, чтобы лента была бесконечной
  const card = (g) => `
    <figure class="shot"><img src="${g.src}" alt="${g.caption}" loading="lazy" draggable="false" /></figure>`
  $('[data-gallery]').innerHTML = [...gallery, ...gallery].map(card).join('')

  $('[data-faq]').innerHTML = faq.map((f, i) => `
    <div class="faq__item">
      <button class="faq__q" aria-expanded="false" aria-controls="faq-${i}">${f.q}<span class="faq__icon" aria-hidden="true"></span></button>
      <div class="faq__a" id="faq-${i}" role="region"><p>${f.a}</p></div>
    </div>`).join('')
}

renderDirections()
renderPrograms()
renderStatic()

/* =========================================================
   2. Плавный скролл (Lenis) + ScrollTrigger
   ========================================================= */

let lenis = null
if (!reduced) {
  lenis = new Lenis({ lerp: 0.1 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}

function scrollToTarget(target) {
  if (lenis) lenis.scrollTo(target, { offset: -90, duration: 1.4 })
  else $(target)?.scrollIntoView({ behavior: 'smooth' })
}

$$('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href')
    if (id.length < 2 || !$(id)) return
    e.preventDefault()
    closeMenu()
    scrollToTarget(id === '#top' ? 0 : id)
  })
})

/* =========================================================
   3. Шапка, меню, прогресс
   ========================================================= */

const header = $('.header')
const burger = $('.burger')
const nav = $('.nav')
function closeMenu() {
  nav.classList.remove('is-open')
  burger.setAttribute('aria-expanded', 'false')
}
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open')
  burger.setAttribute('aria-expanded', String(open))
})

ScrollTrigger.create({
  start: 0,
  end: 'max',
  onUpdate(self) {
    gsap.set('.progress', { scaleX: self.progress })
    const hide = self.direction === 1 && self.scroll() > 400 && !nav.classList.contains('is-open')
    header.classList.toggle('is-hidden', hide)
  },
})

/* =========================================================
   4. Прелоадер + появление hero
   ========================================================= */

function intro() {
  const heroSplit = new SplitText('.hero__title .line', { type: 'words,chars', charsClass: 'char' })
  // каждую строку заворачиваем в маску
  $$('.hero__title .line').forEach((l) => l.classList.add('split-line'))

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
  tl.from(heroSplit.chars, { yPercent: 120, rotate: 8, duration: 1.1, stagger: 0.018 })
    .from('.hero__eyebrow', { y: 20, opacity: 0, duration: 0.8 }, 0.1)
    .from('.hero__lead, .hero__cta > *, .hero__badges li', { y: 30, opacity: 0, duration: 1, stagger: 0.07 }, 0.45)
    .from('.shape', { scale: 0, rotate: -40, duration: 1.4, stagger: 0.06, ease: 'elastic.out(1, .6)' }, 0.2)
    .from('.polaroid', { yPercent: 120, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'expo.out' }, 0.35)
    .from('.header', { y: -80, opacity: 0, duration: 1, clearProps: 'transform,opacity' }, 0.3)
  return tl
}

function runPreloader() {
  const pre = $('.preloader')
  if (reduced) {
    pre.remove()
    return Promise.resolve()
  }
  document.body.classList.add('is-loading')
  const word = $('.preloader__word')
  word.innerHTML = [...'ЗАТЕЙНИКИ'].map((c) => `<span>${c}</span>`).join('')
  const counter = { v: 0 }

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete() {
        pre.remove()
        document.body.classList.remove('is-loading')
        resolve()
      },
    })
    tl.from('.preloader__word span', { yPercent: 110, duration: 0.7, stagger: 0.04, ease: 'back.out(2)' })
      .to(counter, {
        v: 100, duration: 1.2, ease: 'power2.inOut',
        onUpdate: () => ($('.preloader__count').textContent = Math.round(counter.v)),
      }, 0)
      .to('.preloader__word span', { y: -20, duration: 0.25, stagger: { each: 0.03, yoyo: true, repeat: 1 }, ease: 'sine.inOut' }, 0.8)
      .to('.preloader__word, .preloader__count', { opacity: 0, duration: 0.3 }, '+=0.1')
      .to('.preloader__panel--1', { yPercent: -100, duration: 0.8, ease: 'expo.inOut' })
      .to('.preloader__panel--2', { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, '-=0.65')
  })
}

/* =========================================================
   5. Hero: вращающееся слово, параллакс фигур
   ========================================================= */

function heroRotator() {
  const words = ['дети', 'мамы', 'гости', 'все']
  const el = $('.rotator__word')
  let i = 0
  if (reduced) return
  gsap.delayedCall(2.6, function next() {
    i = (i + 1) % words.length
    gsap.timeline()
      .to(el, { yPercent: -100, opacity: 0, rotateX: 60, duration: 0.4, ease: 'power3.in' })
      .add(() => (el.textContent = words[i]))
      .fromTo(el, { yPercent: 100, opacity: 0, rotateX: -60 }, { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.6, ease: 'back.out(2)' })
    gsap.delayedCall(2.6, next)
  })
}

function heroShapes() {
  // наклон фотокарточек задаётся в data-rot
  $$('.polaroid').forEach((p) => gsap.set(p, { rotation: +p.dataset.rot }))
  if (reduced) return
  const shapes = $$('.shape, .polaroid')
  // лёгкое «дыхание»
  shapes.forEach((s, i) => {
    const rot = +(s.dataset.rot || 0)
    gsap.to(s, { y: '+=18', rotation: rot + (i % 2 ? 6 : -6), duration: 2.4 + i * 0.3, yoyo: true, repeat: -1, ease: 'sine.inOut' })
  })
  // параллакс от мыши
  if (finePointer) {
    const setters = shapes.map((s) => ({
      x: gsap.quickTo(s, 'x', { duration: 1, ease: 'power3' }),
      // y занят «дыханием», поэтому двигаем через xPercent/yPercent
      y: gsap.quickTo(s, 'yPercent', { duration: 1, ease: 'power3' }),
      d: parseFloat(s.dataset.depth || 1),
    }))
    window.addEventListener('mousemove', (e) => {
      const nx = e.clientX / innerWidth - 0.5
      const ny = e.clientY / innerHeight - 0.5
      setters.forEach((st) => { st.x(nx * 60 * st.d); st.y(ny * 40 * st.d) })
    })
  }
  // разлёт при скролле
  gsap.to('.hero__shapes, .hero__photos', {
    yPercent: 30, opacity: 0.2, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  })
  gsap.to('.hero__inner', {
    yPercent: 18, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  })
}

/* =========================================================
   6. Бегущая строка, реагирующая на скорость скролла
   ========================================================= */

function marquee() {
  const track = $('.marquee__track')
  track.innerHTML += track.innerHTML // дубль для бесшовности
  if (reduced) return
  const loop = gsap.to(track, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 })
  let dir = 1
  ScrollTrigger.create({
    onUpdate(self) {
      dir = self.direction
      const v = Math.min(Math.abs(self.getVelocity()) / 300, 6)
      gsap.to(loop, { timeScale: dir * (1 + v), duration: 0.2, overwrite: true })
      gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.2, ease: 'power2.out' })
    },
  })
}

/* =========================================================
   7. Заголовки секций — побуквенное появление
   ========================================================= */

function titles() {
  $$('.split').forEach((el) => {
    const split = new SplitText(el, { type: 'lines,words', linesClass: 'split-line' })
    if (reduced) return
    revealFrom(el, { yPercent: 110, rotate: 4, duration: 1, stagger: 0.05, ease: 'expo.out' }, 0.15, split.words)
  })
  if (reduced) return
  $$('main .eyebrow, main .muted').forEach((el) => {
    revealFrom(el, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.1)
  })
}

/* =========================================================
   8. Направления — горизонтальный скролл с пином (десктоп)
   ========================================================= */

function directionsScroll() {
  const mm = gsap.matchMedia()
  mm.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
    const track = $('[data-directions]')
    const cards = $$('.dir-card', track)
    const distance = () => track.scrollWidth - innerWidth
    const tween = gsap.to(track, {
      x: () => -distance(), ease: 'none',
      scrollTrigger: {
        trigger: '.directions', start: 'top top', end: () => '+=' + distance(),
        pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
      },
    })
    cards.forEach((card) => {
      gsap.from($('.dir-card__icon', card), {
        rotate: -30, scale: 0.4, ease: 'back.out(2)',
        scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 90%', end: 'left 50%', scrub: true },
      })
      gsap.from(card, {
        rotate: 6, yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'left 40%', scrub: true },
      })
    })
  })
  mm.add('(max-width: 760px) and (prefers-reduced-motion: no-preference)', () => {
    $$('.dir-card').forEach((card) => {
      revealFrom(card, { y: 60, opacity: 0, duration: 0.9, ease: 'power3.out' }, 0.12)
    })
  })
}

/* =========================================================
   9. Программы — фильтр, 3D-наклон, «Выбрать»
   ========================================================= */

function programsBlock() {
  const cards = $$('.prog')
  if (!reduced) {
    // карточки, появившиеся одновременно, анимируем «пачкой» с задержкой
    gsap.set(cards, { y: 80, opacity: 0, rotate: 3 })
    const io = new IntersectionObserver((entries) => {
      const batch = entries.filter((e) => e.isIntersecting).map((e) => e.target)
      if (!batch.length) return
      batch.forEach((c) => io.unobserve(c))
      gsap.to(batch, { y: 0, opacity: 1, rotate: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' })
    }, { rootMargin: '0px 0px -10% 0px' })
    cards.forEach((c) => io.observe(c))
  }

  // Фильтр: только opacity/transform — это дёшево для браузера.
  // Пересчёт ScrollTrigger (высота страницы поменялась) — один раз, после анимации и в простой.
  const grid = $('[data-programs]')
  let refreshTimer = null
  $('[data-filters]').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip')
    if (!chip || chip.classList.contains('is-active')) return
    $$('.chip').forEach((c) => c.classList.toggle('is-active', c === chip))
    const group = chip.dataset.group
    const apply = () => {
      cards.forEach((c) => c.classList.toggle('is-hidden', group !== 'all' && c.dataset.group !== group))
      const shown = cards.filter((c) => !c.classList.contains('is-hidden'))
      gsap.fromTo(grid, { opacity: 0 }, { opacity: 1, duration: 0.2, overwrite: true })
      gsap.fromTo(shown.slice(0, 12), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.025, ease: 'power3.out', overwrite: true, clearProps: 'opacity' })
      clearTimeout(refreshTimer)
      refreshTimer = setTimeout(() => {
        const run = () => ScrollTrigger.refresh()
        'requestIdleCallback' in window ? requestIdleCallback(run, { timeout: 1000 }) : run()
      }, 600)
    }
    if (reduced) return apply()
    gsap.to(grid, { opacity: 0, y: 0, duration: 0.15, ease: 'power1.in', overwrite: true, onComplete: apply })
  })

  // 3D-наклон карточек
  if (finePointer && !reduced) {
    cards.forEach((card) => {
      const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3' })
      const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3' })
      gsap.set(card, { transformPerspective: 900 })
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect()
        ry(((e.clientX - r.left) / r.width - 0.5) * 14)
        rx(-((e.clientY - r.top) / r.height - 0.5) * 14)
      })
      card.addEventListener('mouseleave', () => { rx(0); ry(0) })
    })
  }

  $('[data-programs]').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-pick]')
    if (!btn) return
    pickProgram(+btn.dataset.pick)
    scrollToTarget('#builder')
  })
}

/* =========================================================
   10. Конструктор праздника
   ========================================================= */

const builder = $('[data-builder]')
const totalEl = $('[data-total]')
const totalTween = { v: 0 }
let lastSummary = ''

function opt(type, name, id, label, hint, checked) {
  return `<div class="opt">
    <input type="${type}" name="${name}" id="${id}" value="${id}" ${checked ? 'checked' : ''} />
    <label for="${id}">${label}${hint ? `<small>${hint}</small>` : ''}</label>
  </div>`
}

// выбранная программа из каталога (индекс в programs)
let pickedProgram = null

function renderBuilder() {
  $('[data-occasions]').innerHTML = calc.occasions.map((o, i) => opt('radio', 'occasion', `occ-${o.id}`, o.label, '', i === 0)).join('')
  $('[data-extras]').innerHTML = calc.extras.map((x) => opt('checkbox', 'extra', `extra-${x.id}`, x.label, `+${x.from ? 'от ' : ''}${rub(x.price)} ₽`, false)).join('')
  renderFormats()
}

function renderFormats(formatId) {
  const occ = $('input[name="occasion"]:checked').value.replace('occ-', '')
  const list = calc.formats.filter((f) => f.occ === occ)
  const current = list.find((f) => f.id === formatId) || list[0]
  $('[data-formats]').innerHTML = list.map((f) => opt('radio', 'format', `fmt-${f.id}`, f.label, f.hint, f === current)).join('')
  renderProgramOptions()
}

function currentFormat() {
  const id = $('input[name="format"]:checked').value.replace('fmt-', '')
  return calc.formats.find((f) => f.id === id)
}

function renderProgramOptions() {
  const fmt = currentFormat()
  const step = $('[data-program-step]')
  step.hidden = !fmt.venue
  if (!fmt.venue) return
  const groups = fmt.groups || ['kids', 'teen']
  const list = programs.map((p, i) => ({ p, i })).filter(({ p }) => p.venue === fmt.venue && groups.includes(p.group))
  const age = +$('[data-age-in]').value
  const keep = list.find(({ i }) => i === pickedProgram) || list.find(({ p }) => age >= p.age[0] && age <= p.age[1]) || list[0]
  $('[data-program-select]').innerHTML = list
    .map(({ p, i }) => opt('radio', 'program', `prog-${i}`, `${p.emoji} ${p.title}`, `${ageLabel(p)} · ${rub(p.price)} ₽`, i === keep.i))
    .join('')
}

// выбор программы из каталога: подставляем повод, формат и программу
function pickProgram(i) {
  const p = programs[i]
  pickedProgram = i
  const occ = p.group === 'adult' ? 'adult' : p.group === 'surprise' ? 'surprise' : 'bday'
  $(`#occ-${occ}`).checked = true
  const fmt = p.venue === 'out' ? (p.price > 3500 ? 'statues' : 'doll') : occ === 'adult' ? 'adult-loft' : p.venue
  renderFormats(fmt)
  const ageInput = $('[data-age-in]')
  if (p.group !== 'surprise' && (+ageInput.value < p.age[0] || +ageInput.value > p.age[1])) setRange(ageInput, Math.min(p.age[0], 16))
  updateBuilder()
}

builder.addEventListener('change', (e) => {
  if (e.target.name === 'occasion') renderFormats()
  if (e.target.name === 'format') renderProgramOptions()
  if (e.target.name === 'program') pickedProgram = +e.target.value.replace('prog-', '')
})

function setRange(input, value) {
  input.value = value
  paintRange(input)
}
function paintRange(input) {
  const p = ((input.value - input.min) / (input.max - input.min)) * 100
  input.style.setProperty('--p', p + '%')
}

function updateBuilder() {
  const age = +$('[data-age-in]').value
  const guests = +$('[data-guests-in]').value
  $('[data-age-out]').textContent = age
  $('[data-guests-out]').textContent = guests

  const occasion = calc.occasions.find((o) => `occ-${o.id}` === $('input[name="occasion"]:checked').value)
  const fmt = currentFormat()
  const progInput = fmt.venue ? $('input[name="program"]:checked') : null
  const program = progInput ? programs[+progInput.value.replace('prog-', '')] : null
  const extras = calc.extras.filter((x) => $(`#extra-${x.id}`).checked)

  const rows = []
  if (program) rows.push([`${program.title} · ${venues[program.venue]}`, program.price])
  else if (fmt.perPerson) rows.push([`${fmt.label}: ${guests} × ${rub(fmt.perPerson)} ₽`, fmt.perPerson * guests])
  else if (fmt.price) rows.push([fmt.label, fmt.price])
  extras.forEach((x) => rows.push([x.label, x.price]))

  const total = rows.reduce((s, r) => s + r[1], 0)
  $('[data-summary]').innerHTML =
    `<li><span>${occasion.label}${occasion.id === 'adult' || occasion.id === 'surprise' ? '' : `, ${age} лет`}</span><span>${guests} гостей</span></li>` +
    rows.map(([l, p]) => `<li><span>${l}</span><span>${rub(p)} ₽</span></li>`).join('')

  gsap.to(totalTween, {
    v: total, duration: reduced ? 0 : 0.8, ease: 'power3.out',
    onUpdate: () => (totalEl.textContent = rub(totalTween.v)),
  })
  if (!reduced) gsap.fromTo('.summary__total strong', { scale: 1.08 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' })

  // подсказка по возрасту: приглушаем неподходящие программы
  $$('input[name="program"]').forEach((input) => {
    const p = programs[+input.value.replace('prog-', '')]
    $(`label[for="${input.id}"]`).style.opacity = p.group === 'adult' || (age >= p.age[0] && age <= p.age[1]) ? 1 : 0.45
  })

  lastSummary = [
    `Повод: ${occasion.label}`,
    `Формат: ${fmt.label}`,
    `Возраст: ${age} лет, гостей: ${guests}`,
    program ? `Программа: ${program.title}` : '',
    extras.length ? `Допы: ${extras.map((x) => x.label).join(', ')}` : '',
    `Предварительно: ${rub(total)} ₽`,
  ].filter(Boolean).join('\n')
}

renderBuilder()
$$('input[type="range"]', builder).forEach((r) => {
  paintRange(r)
  r.addEventListener('input', () => { paintRange(r); updateBuilder() })
})
// обработчик выше перерисовывает шаги, этот — пересчитывает итог
builder.addEventListener('change', updateBuilder)
updateBuilder()

/* =========================================================
   11. Как это работает, цифры, галерея, FAQ
   ========================================================= */

function howLine() {
  const path = $('.how__line path')
  const len = path.getTotalLength()
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: reduced ? 0 : len })
  if (reduced) return
  gsap.to(path, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.how__steps', start: 'top 80%', end: 'bottom 60%', scrub: true } })
  const steps = $('.how__steps')
  revealFrom(steps, { y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.6)' }, 0.2, '.how li')
  revealFrom(steps, { scale: 0, rotate: -90, duration: 0.8, stagger: 0.15, ease: 'back.out(2.5)' }, 0.2, '.how__num')
}

function counters() {
  $$('[data-count]').forEach((el) => {
    const end = +el.dataset.count
    const suffix = el.dataset.suffix
    if (reduced) { el.textContent = rub(end) + suffix; return }
    const o = { v: 0 }
    onReveal(el, () => gsap.to(o, {
      v: end, duration: 2, ease: 'power3.out',
      onUpdate: () => (el.textContent = rub(o.v) + suffix),
    }), 0.1)
  })
}

function galleryRail() {
  const rail = $('[data-gallery]')
  const half = () => rail.scrollWidth / 2
  let x = 0
  let drag = null
  let speed = reduced ? 0 : 0.5
  const setX = gsap.quickSetter(rail, 'x', 'px')

  gsap.ticker.add(() => {
    if (!drag) x -= speed
    if (x < -half()) x += half()
    if (x > 0) x -= half()
    setX(x)
  })
  rail.addEventListener('pointerdown', (e) => {
    drag = { start: e.clientX, x }
    rail.classList.add('is-drag')
    rail.setPointerCapture(e.pointerId)
  })
  rail.addEventListener('pointermove', (e) => { if (drag) x = drag.x + (e.clientX - drag.start) })
  const stop = () => { drag = null; rail.classList.remove('is-drag') }
  rail.addEventListener('pointerup', stop)
  rail.addEventListener('pointercancel', stop)
  rail.addEventListener('mouseenter', () => (speed = 0))
  rail.addEventListener('mouseleave', () => (speed = reduced ? 0 : 0.5))
}

function faqBlock() {
  $$('.faq__item').forEach((item) => {
    const btn = $('.faq__q', item)
    const panel = $('.faq__a', item)
    btn.addEventListener('click', () => {
      const open = !item.classList.contains('is-open')
      // закрываем остальные
      $$('.faq__item.is-open').forEach((o) => {
        if (o === item) return
        o.classList.remove('is-open')
        $('.faq__q', o).setAttribute('aria-expanded', 'false')
        gsap.to($('.faq__a', o), { height: 0, duration: 0.4, ease: 'power3.inOut' })
      })
      item.classList.toggle('is-open', open)
      btn.setAttribute('aria-expanded', String(open))
      gsap.to(panel, { height: open ? 'auto' : 0, duration: reduced ? 0 : 0.5, ease: 'power3.inOut', onComplete: () => ScrollTrigger.refresh() })
    })
  })
}

function finalBlock() {
  const box = $('.final__confetti')
  const colors = ['#E2B23A', '#9ADE3A', '#1C1C1C', '#FFF6E9', '#111111']
  for (let i = 0; i < 26; i++) {
    const el = document.createElement('i')
    el.style.left = Math.random() * 100 + '%'
    el.style.top = Math.random() * 100 + '%'
    el.style.background = colors[i % colors.length]
    if (i % 3 === 0) el.style.borderRadius = '50%'
    box.appendChild(el)
    if (!reduced) {
      gsap.to(el, { rotate: gsap.utils.random(-360, 360), y: gsap.utils.random(-80, 80), duration: gsap.utils.random(4, 8), yoyo: true, repeat: -1, ease: 'sine.inOut' })
    }
  }
  if (reduced) return
  revealFrom($('.final'), { yPercent: -400, opacity: 0, stagger: 0.02, duration: 1.2, ease: 'bounce.out' }, 0.3, box.children)
  gsap.from('.final', { clipPath: 'inset(10% 6% 0 6% round 80px)', ease: 'none', scrollTrigger: { trigger: '.final', start: 'top bottom', end: 'top 30%', scrub: true } })
}

/* =========================================================
   12. Курсор и «магнитные» кнопки
   ========================================================= */

function cursorAndMagnets() {
  if (!finePointer || reduced) return
  // свой курсор вместо системного (системный скрыт через CSS-класс has-cursor)
  document.documentElement.classList.add('has-cursor')
  const cursor = $('.cursor')
  const cx = gsap.quickTo(cursor, 'x', { duration: 0.08, ease: 'power3' })
  const cy = gsap.quickTo(cursor, 'y', { duration: 0.08, ease: 'power3' })
  window.addEventListener('mousemove', (e) => { cx(e.clientX); cy(e.clientY); cursor.classList.remove('is-out') })
  document.addEventListener('mouseleave', () => cursor.classList.add('is-out'))
  window.addEventListener('mousedown', () => cursor.classList.add('is-down'))
  window.addEventListener('mouseup', () => cursor.classList.remove('is-down'))
  document.addEventListener('mouseover', (e) => {
    cursor.classList.toggle('is-hover', !!e.target.closest('a, button, label, input, .gallery__rail'))
  })

  $$('.magnetic').forEach((el) => {
    const mx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, .4)' })
    const my = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, .4)' })
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect()
      mx((e.clientX - r.left - r.width / 2) * 0.3)
      my((e.clientY - r.top - r.height / 2) * 0.4)
    })
    el.addEventListener('mouseleave', () => { mx(0); my(0) })
  })
}

/* =========================================================
   13. Конфетти (canvas)
   ========================================================= */

function confettiBurst(x = innerWidth / 2, y = innerHeight / 2) {
  if (reduced) return
  const canvas = $('.confetti')
  const ctx = canvas.getContext('2d')
  const dpr = Math.min(devicePixelRatio, 2)
  canvas.width = innerWidth * dpr
  canvas.height = innerHeight * dpr
  ctx.scale(dpr, dpr)
  const colors = ['#FF6A00', '#E2B23A', '#9ADE3A', '#1C1C1C', '#111111']
  const parts = Array.from({ length: 160 }, () => ({
    x, y,
    vx: gsap.utils.random(-12, 12),
    vy: gsap.utils.random(-18, -4),
    r: gsap.utils.random(0, Math.PI * 2),
    vr: gsap.utils.random(-0.3, 0.3),
    w: gsap.utils.random(6, 12),
    h: gsap.utils.random(8, 16),
    c: gsap.utils.random(colors),
  }))
  let frames = 0
  const tick = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    parts.forEach((p) => {
      p.vy += 0.45; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r)
      ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r)))
      ctx.restore()
    })
    if (++frames > 180) { gsap.ticker.remove(tick); ctx.clearRect(0, 0, innerWidth, innerHeight) }
  }
  gsap.ticker.add(tick)
}

/* =========================================================
   14. Модалка заявки
   ========================================================= */

const modal = $('[data-modal]')
const leadForm = $('[data-lead]')
let lastFocus = null

function openModal() {
  lastFocus = document.activeElement
  $('[data-lead-summary]').innerHTML = lastSummary.replace(/\n/g, '<br>')
  $('.modal__form-view').hidden = false
  $('.modal__done').hidden = true
  modal.classList.add('is-open')
  modal.setAttribute('aria-hidden', 'false')
  lenis?.stop()
  gsap.timeline()
    .to('.modal__backdrop', { opacity: 1, duration: 0.3 })
    .fromTo('.modal__box', { opacity: 0, y: 60, scale: 0.92, rotate: -2 }, { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.6)' }, 0.05)
  setTimeout(() => $('input[name="name"]', leadForm).focus(), 300)
}
function closeModal() {
  gsap.timeline({
    onComplete() {
      modal.classList.remove('is-open')
      modal.setAttribute('aria-hidden', 'true')
      lenis?.start()
      lastFocus?.focus()
    },
  })
    .to('.modal__box', { opacity: 0, y: 40, scale: 0.95, duration: 0.3, ease: 'power2.in' })
    .to('.modal__backdrop', { opacity: 0, duration: 0.25 }, 0.1)
}

$$('[data-open-lead]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); openModal() }))
$$('[data-close]').forEach((b) => b.addEventListener('click', closeModal))
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal() })

// простая маска телефона
const phoneInput = $('input[name="phone"]', leadForm)
phoneInput.addEventListener('input', () => {
  let d = phoneInput.value.replace(/\D/g, '')
  if (d.startsWith('8')) d = '7' + d.slice(1)
  if (!d.startsWith('7')) d = '7' + d
  d = d.slice(0, 11)
  const p = [d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)]
  phoneInput.value = '+7' + (p[0] ? ` (${p[0]}` : '') + (p[0].length === 3 ? ')' : '') + (p[1] ? ` ${p[1]}` : '') + (p[2] ? `-${p[2]}` : '') + (p[3] ? `-${p[3]}` : '')
})

leadForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(leadForm))
  const errorEl = $('[data-lead-error]')
  errorEl.hidden = true
  let ok = true
  $$('input', leadForm).forEach((i) => i.classList.remove('is-invalid'))
  if (!data.name?.trim()) { $('input[name="name"]', leadForm).classList.add('is-invalid'); ok = false }
  if ((data.phone || '').replace(/\D/g, '').length < 11) { phoneInput.classList.add('is-invalid'); ok = false }
  if (!ok) return

  const btn = $('button[type="submit"] span', leadForm)
  btn.textContent = 'Отправляем…'
  const text = `Заявка с сайта\nИмя: ${data.name}\nТелефон: ${data.phone}\nДата: ${data.date || 'не указана'}\n\n${lastSummary}`
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, summary: lastSummary }),
    })
    if (!res.ok) throw new Error('server')
    showDone()
  } catch {
    // сервер не настроен — даём отправить заявку через ВК
    try { await navigator.clipboard.writeText(text) } catch {}
    errorEl.innerHTML = `Не получилось отправить автоматически. Текст заявки скопирован — <a href="${brand.vkWrite}" target="_blank" rel="noopener">вставьте его в сообщения ВК</a> или позвоните: <a href="${brand.phoneHref}">${brand.phone}</a>`
    errorEl.hidden = false
  } finally {
    btn.textContent = 'Отправить заявку'
  }
})

function showDone() {
  $('.modal__form-view').hidden = true
  $('.modal__done').hidden = false
  leadForm.reset()
  const path = $('.done-check path')
  const circle = $('.done-check circle')
  ;[circle, path].forEach((p) => {
    const l = p.getTotalLength()
    gsap.fromTo(p, { strokeDasharray: l, strokeDashoffset: l }, { strokeDashoffset: 0, duration: 0.7, delay: p === path ? 0.4 : 0, ease: 'power2.out' })
  })
  const r = $('.modal__box').getBoundingClientRect()
  confettiBurst(r.left + r.width / 2, r.top + 60)
}

/* =========================================================
   Старт
   ========================================================= */

heroRotator()
heroShapes()
marquee()
titles()
directionsScroll()
programsBlock()
howLine()
counters()
galleryRail()
faqBlock()
finalBlock()
cursorAndMagnets()

// hero анимируем только после прелоадера; до этого прячем его
gsap.set('.hero__inner, .hero__shapes, .hero__photos', { visibility: 'hidden' })
document.fonts.ready.then(() =>
  runPreloader().then(() => {
    gsap.set('.hero__inner, .hero__shapes, .hero__photos', { visibility: 'visible' })
    if (!reduced) intro()
    ScrollTrigger.refresh()
  }),
)
