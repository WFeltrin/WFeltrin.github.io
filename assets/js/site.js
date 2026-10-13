/* Universo MLKD — interações (sem dependências) */
(function () {
  'use strict'
  var BASE = document.body.getAttribute('data-base') || '' // '../' nas páginas em subpasta
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ---------- Prévia local (file://): links de pasta abrem a lista de arquivos; aponta direto para o index.html ----------
  if (location.protocol === 'file:') {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var h = a.getAttribute('href')
      if (/^(https?:|mailto:|#)/.test(h)) return
      var parts = h.split('#'), path = parts[0]
      if (path === '' ) return
      if (path.slice(-1) === '/') a.setAttribute('href', path + 'index.html' + (parts[1] ? '#' + parts[1] : ''))
    })
  }

  // ---------- Navegação ----------
  var nav = document.querySelector('.nav')
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 30) }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    var tog = nav.querySelector('.nav-toggle')
    if (tog) tog.addEventListener('click', function () {
      var open = nav.classList.toggle('open'); tog.setAttribute('aria-expanded', open ? 'true' : 'false')
    })
    nav.querySelectorAll('.nav-links a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open') }) })
  }

  // ---------- Revelar ao rolar ----------
  var rev = document.querySelectorAll('.reveal')
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { rootMargin: '0px 0px -8% 0px' })
    rev.forEach(function (el) { io.observe(el) })
  } else { rev.forEach(function (el) { el.classList.add('in') }) }

  // ---------- Contadores ----------
  var counters = document.querySelectorAll('[data-count]')
  if ('IntersectionObserver' in window && counters.length) {
    var co = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return
        co.unobserve(e.target)
        var el = e.target, end = parseInt(el.getAttribute('data-count'), 10), suf = el.getAttribute('data-suffix') || ''
        if (reduce) { el.textContent = end.toLocaleString('pt-BR') + suf; return }
        var t0 = null
        var step = function (t) {
          if (!t0) t0 = t
          var p = Math.min(1, (t - t0) / 1400), v = Math.round(end * (1 - Math.pow(1 - p, 3)))
          el.textContent = v.toLocaleString('pt-BR') + suf
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      })
    }, { threshold: .4 })
    counters.forEach(function (c) { co.observe(c) })
  }

  // ---------- Parallax suave do topo ----------
  var heroBg = document.querySelector('.hero-bg')
  if (heroBg && !reduce) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY
      if (y < window.innerHeight * 1.2) heroBg.style.transform = 'scale(1.06) translateY(' + (y * 0.18) + 'px)'
    }, { passive: true })
  }

  // ---------- Brasas / faíscas do Nexus ----------
  var cv = document.getElementById('embers')
  if (cv && !reduce) {
    var ctx = cv.getContext('2d'), parts = [], W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1)
    var palette = (cv.getAttribute('data-palette') || '#f2c14e,#ff8a3d,#a66bff').split(',')
    var resize = function () { W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    var spawn = function (initial) {
      return { x: Math.random() * W, y: initial ? Math.random() * H : H + 10, r: Math.random() * 2.2 + .6, vy: -(Math.random() * .6 + .25),
        vx: (Math.random() - .5) * .3, a: Math.random() * .6 + .3, c: palette[Math.floor(Math.random() * palette.length)], w: Math.random() * Math.PI * 2 }
    }
    resize(); window.addEventListener('resize', resize)
    var count = W < 700 ? 38 : 70
    for (var i = 0; i < count; i++) parts.push(spawn(true))
    var visible = true
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting }).observe(cv)
    var tick = function () {
      if (visible) {
        ctx.clearRect(0, 0, W, H)
        for (var i = 0; i < parts.length; i++) {
          var p = parts[i]
          p.w += .02; p.x += p.vx + Math.sin(p.w) * .25; p.y += p.vy
          if (p.y < -10) parts[i] = spawn(false)
          ctx.globalAlpha = p.a * Math.min(1, p.y / (H * .35))
          ctx.fillStyle = p.c; ctx.shadowColor = p.c; ctx.shadowBlur = 12
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
        }
      }
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  // ---------- Inclinação 3D nos portais ----------
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5
        el.style.transform = 'perspective(900px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg) translateY(-4px)'
      })
      el.addEventListener('mouseleave', function () { el.style.transform = '' })
    })
  }

  // ---------- Bestiário: toque mostra a história ----------
  document.querySelectorAll('.beast').forEach(function (b) {
    b.addEventListener('click', function () { b.classList.toggle('flip') })
  })

  // ---------- Abas de classes (página do RPG) ----------
  var tabs = document.querySelectorAll('.class-tabs button')
  if (tabs.length && window.MLKD_CLASSES) {
    var show = function (key) {
      var c = window.MLKD_CLASSES[key]; if (!c) return
      tabs.forEach(function (t) { t.setAttribute('aria-selected', t.getAttribute('data-class') === key ? 'true' : 'false') })
      document.getElementById('cs-m').src = BASE + 'assets/img/classe-' + key + '-m.webp'
      document.getElementById('cs-f').src = BASE + 'assets/img/classe-' + key + '-f.webp'
      document.getElementById('cs-m').alt = c.name + ' (masculino)'
      document.getElementById('cs-f').alt = c.name + ' (feminina)'
      document.getElementById('cs-name').textContent = c.emoji + ' ' + c.name
      document.getElementById('cs-role').textContent = c.role
      document.getElementById('cs-desc').textContent = c.desc
      document.getElementById('cs-sub').textContent = c.subs
    }
    tabs.forEach(function (t) { t.addEventListener('click', function () { show(t.getAttribute('data-class')) }) })
    show(tabs[0].getAttribute('data-class'))
  }

  // ---------- Quiz "Qual é a sua classe?" ----------
  var quiz = document.getElementById('quiz')
  if (quiz && window.MLKD_QUIZ) {
    var Q = window.MLKD_QUIZ, score = {}, step = 0
    var bar = quiz.querySelector('.q-progress i'), body = quiz.querySelector('.q-body')
    var render = function () {
      bar.style.width = (step / Q.questions.length * 100) + '%'
      if (step >= Q.questions.length) return result()
      var q = Q.questions[step]
      var html = '<div class="q-title">' + q.q + '</div><div class="q-options">'
      q.a.forEach(function (opt, i) { html += '<button class="q-opt" type="button" data-i="' + i + '">' + opt[0] + '</button>' })
      body.innerHTML = html + '</div>'
      body.querySelectorAll('.q-opt').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var cls = q.a[parseInt(btn.getAttribute('data-i'), 10)][1]
          cls.split(',').forEach(function (k) { score[k] = (score[k] || 0) + 1 })
          step++; render()
        })
      })
    }
    var result = function () {
      var best = null, max = -1
      Object.keys(Q.classes).forEach(function (k) { var s = score[k] || 0; if (s > max || (s === max && Math.random() < .5)) { max = s; best = k } })
      var c = Q.classes[best], g = Math.random() < .5 ? 'm' : 'f'
      body.innerHTML = '<div class="q-result"><img src="' + BASE + 'assets/img/classe-' + best + '-' + g + '.webp" alt="' + c.name + '" width="240" height="240">' +
        '<div><div class="eyebrow" style="margin:0 0 6px">Seu caminho em Valdória</div><h3>' + c.emoji + ' ' + c.name + '</h3><p>' + c.desc + '</p>' +
        '<div class="kv"><div><span>No MLKD RPG:</span> ' + c.rpg + '</div><div><span>No MLKD Survivor:</span> ' + c.sv + '</div></div>' +
        '<div class="btn-row"><a class="btn tg" href="https://t.me/mlkd_rpg_bot" target="_blank" rel="noopener">Jogar como ' + c.name + '</a>' +
        '<button class="btn ghost" type="button" id="q-again">Refazer</button></div></div></div>'
      document.getElementById('q-again').addEventListener('click', function () { score = {}; step = 0; render() })
    }
    render()
  }
})()
