/* Universo MLKD — interações (sem dependências) */
/* Idiomas (28/10/2026): textos deste arquivo por idioma; a página diz o seu no <html lang> (pt-BR, en, es) */
var MLKD_LANG = (document.documentElement.lang || 'pt').slice(0, 2)
var MLKD_TXT = ({
  pt: {
    path: 'Seu caminho em Valdória', inRpg: 'No MLKD RPG:', inSv: 'No MLKD Survivor:', playAs: 'Jogar como ', again: 'Refazer',
    male: ' (masculino)', female: ' (feminina)', obs: 'O Observador', obsTap: 'Tocar no Observador',
    frag: [
      'Eu estava lá quando a primeira Runa foi selada. O ar crepitava com o peso de todo o poder do mundo sendo comprimido numa pedra...',
      'A Floresta era verde, sabia? Verde como esmeralda. Foram os caçadores que a destruíram, homens tolos que tentaram extrair o poder da Runa-Mãe...',
      'O Faraó de Ashnar era um grande homem. Até decidir que ser grande não bastava: queria ser um deus. O deserto inteiro pagou por sua ambição...',
      'Sabe por que os mortos não descansam nas Catacumbas? Porque alguém inverteu a Runa da Luz. O que curava agora aprisiona as almas...',
      'O Rei do Caos... eu o conheci antes. Antes do Trono, antes da fissura. Ele era... não importa. O que ele era já morreu.',
      'A Torre não foi construída. Ela cresceu. Como uma árvore, mas de pedra e propósito. O Nexus a criou para testar os dignos...',
      'Cada Runa partida liberta uma maldição diferente. Sangue, Veneno, Fogo, Gelo, Raio, Luz invertida... e uma sétima que não tem nome. Essa é a que mais me preocupa.',
      'O Golem de Ferro foi o último guardião que a Ordem criou. Deveria nos proteger para sempre. Agora ataca tudo que se move. Irônico, não?'
    ],
    reveal: 'Agora o Observador conhece cada movimento seu. Não há mais para onde fugir...'
  },
  en: {
    path: 'Your path in Valdoria', inRpg: 'In MLKD RPG:', inSv: 'In MLKD Survivor:', playAs: 'Play as ', again: 'Try again',
    male: ' (male)', female: ' (female)', obs: 'The Observer', obsTap: 'Tap the Observer',
    frag: [
      'I was there when the first Rune was sealed. The air crackled with the weight of all the world\'s power being pressed into a stone...',
      'The Forest was green, you know? Green as emerald. It was the hunters who destroyed it, foolish men who tried to draw out the power of the Mother Rune...',
      'The Pharaoh of Ashnar was a great man. Until he decided that being great wasn\'t enough: he wanted to be a god. The whole desert paid for his ambition...',
      'Do you know why the dead don\'t rest in the Catacombs? Because someone inverted the Rune of Light. What once healed now imprisons souls...',
      'The King of Chaos... I knew him before. Before the Throne, before the rift. He was... it doesn\'t matter. What he was is already dead.',
      'The Tower wasn\'t built. It grew. Like a tree, but of stone and purpose. The Nexus created it to test the worthy...',
      'Every broken Rune unleashes a different curse. Blood, Poison, Fire, Ice, Lightning, inverted Light... and a seventh that has no name. That one worries me the most.',
      'The Iron Golem was the last guardian the Order created. It was meant to protect us forever. Now it attacks anything that moves. Ironic, isn\'t it?'
    ],
    reveal: 'Now the Observer knows your every move. There\'s nowhere left to run...'
  },
  es: {
    path: 'Tu camino en Valdoria', inRpg: 'En el MLKD RPG:', inSv: 'En MLKD Survivor:', playAs: 'Jugar como ', again: 'Repetir',
    male: ' (masculino)', female: ' (femenina)', obs: 'El Observador', obsTap: 'Tocar al Observador',
    frag: [
      'Yo estaba allí cuando se selló la primera Runa. El aire crepitaba con el peso de todo el poder del mundo comprimido en una piedra...',
      'El Bosque era verde, ¿sabías? Verde como la esmeralda. Fueron los cazadores quienes lo destruyeron, hombres necios que intentaron extraer el poder de la Runa Madre...',
      'El Faraón de Ashnar era un gran hombre. Hasta que decidió que ser grande no bastaba: quería ser un dios. Todo el desierto pagó por su ambición...',
      '¿Sabes por qué los muertos no descansan en las Catacumbas? Porque alguien invirtió la Runa de la Luz. Lo que curaba ahora aprisiona a las almas...',
      'El Rey del Caos... lo conocí antes. Antes del Trono, antes de la grieta. Él era... no importa. Lo que era ya murió.',
      'La Torre no fue construida. Creció. Como un árbol, pero de piedra y propósito. El Nexus la creó para poner a prueba a los dignos...',
      'Cada Runa rota libera una maldición distinta. Sangre, Veneno, Fuego, Hielo, Rayo, Luz invertida... y una séptima que no tiene nombre. Esa es la que más me preocupa.',
      'El Gólem de Hierro fue el último guardián que creó la Orden. Debía protegernos para siempre. Ahora ataca todo lo que se mueve. Irónico, ¿no?'
    ],
    reveal: 'Ahora el Observador conoce cada uno de tus movimientos. Ya no hay a dónde huir...'
  }
})[MLKD_LANG === 'en' || MLKD_LANG === 'es' ? MLKD_LANG : 'pt'];
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
      document.getElementById('cs-m').alt = c.name + MLKD_TXT.male
      document.getElementById('cs-f').alt = c.name + MLKD_TXT.female
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
        '<div><div class="eyebrow" style="margin:0 0 6px">' + MLKD_TXT.path + '</div><h3>' + c.emoji + ' ' + c.name + '</h3><p>' + c.desc + '</p>' +
        '<div class="kv"><div><span>' + MLKD_TXT.inRpg + '</span> ' + c.rpg + '</div><div><span>' + MLKD_TXT.inSv + '</span> ' + c.sv + '</div></div>' +
        '<div class="btn-row"><a class="btn tg" href="https://t.me/mlkd_rpg_bot" target="_blank" rel="noopener">' + MLKD_TXT.playAs + c.name + '</a>' +
        '<button class="btn ghost" type="button" id="q-again">' + MLKD_TXT.again + '</button></div></div></div>'
      document.getElementById('q-again').addEventListener('click', function () { score = {}; step = 0; render() })
    }
    render()
  }
})()

/* ---------- O Observador: o olho segue o cursor (ou o toque), pisca e se revela ---------- */
;(function () {
  'use strict'
  var BASE = document.body.getAttribute('data-base') || ''
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  var FRAG = MLKD_TXT.frag
  var REVEAL = MLKD_TXT.reveal
  function build(host) {
    var img = BASE + 'assets/img/obs/'
    host.innerHTML = '<div class="obs-float"><img class="obs-body" src="' + img + 'corpo.webp" alt="' + MLKD_TXT.obs + '" width="160" height="160">' +
      '<div class="obs-eye"><img class="obs-iris" src="' + img + 'iris.webp" alt="" width="23" height="19"><i class="obs-lid"></i></div>' +
      '<img class="obs-reveal" src="' + img + 'revelado.webp" alt="" width="160" height="160" loading="lazy"></div>'
    return host
  }
  var all = []
  document.querySelectorAll('[data-observer]').forEach(function (h) { all.push(build(h)) })
  // pequeno, voando pela tela em todas as páginas (some enquanto a seção dele, na página geral, está à vista)
  var roam = null
  if (!reduce) {
    roam = document.createElement('div'); roam.className = 'obs-roam'
    var ro = document.createElement('div'); ro.className = 'observer'; roam.appendChild(build(ro))
    var bub = document.createElement('div'); bub.className = 'obs-bubble'; roam.appendChild(bub)
    document.body.appendChild(roam); all.push(ro)
    var big = document.querySelector('[data-observer]'), bigOn = false
    if (big && 'IntersectionObserver' in window) new IntersectionObserver(function (e) { bigOn = e[0].isIntersecting; roam.classList.toggle('away', bigOn) }, { threshold: .2 }).observe(big)
    var x = -120, y = window.innerHeight * .6, busy = false
    var size = function () { return roam.offsetWidth || 90 }
    var body = ro.querySelector('.obs-body'), IMG = BASE + 'assets/img/obs/', flyT = 0
    new Image().src = IMG + 'voo.webp'
    var place = function (nx, ny, dur) {
      var dx = nx - x, dy = ny - y; roam.style.transitionDuration = dur + 'ms'
      if (Math.abs(dx) > 30) ro.classList.toggle('flip', dx < 0)
      roam.style.setProperty('--tilt', (Math.max(-10, Math.min(10, Math.abs(dx) / 50)) * (dx < 0 ? -1 : 1)) + 'deg')
      roam.style.transform = 'translate(' + nx + 'px,' + ny + 'px)'; x = nx; y = ny
      if (Math.abs(dx) > 60 || Math.abs(dy) > 60) { body.src = IMG + 'voo.webp' }
      clearTimeout(flyT); flyT = setTimeout(function () { roam.style.setProperty('--tilt', '0deg'); body.src = IMG + 'corpo.webp' }, dur * .9)
    }
    var fly = function () {
      if (!busy && !document.hidden) {
        var W = window.innerWidth, H = window.innerHeight, s = size(), m = 10, band = Math.max(s + 2 * m, W / 4)
        var side = Math.random() < .25 ? (x < W / 2 ? 1 : 0) : (x < W / 2 ? 0 : 1) // às vezes cruza para o outro lado
        var nx = m + Math.random() * Math.max(0, band - s - 2 * m); if (side) nx = W - nx - s
        var ny = 80 + Math.random() * (H - s - 120)
        var d = Math.hypot(nx - x, ny - y); place(nx, ny, Math.max(1800, Math.min(5200, d * 7)))
      }
      setTimeout(fly, 5200 + Math.random() * 5200)
    }
    roam.style.transform = 'translate(' + x + 'px,' + y + 'px)'
    setTimeout(fly, 1500)
    // clique: ele se transforma na Sombra e murmura no balão
    var bi = Math.floor(Math.random() * FRAG.length)
    roam.addEventListener('click', function () {
      if (busy) return; busy = true
      var t = Math.random() < .35 ? REVEAL : FRAG[bi = (bi + 1) % FRAG.length]
      ro.classList.add('revealed'); bub.textContent = '“' + t + '”'
      roam.classList.toggle('below', y < 200); roam.classList.add('talk')
      // balão sempre dentro da tela: posição horizontal calculada a partir de onde ele está
      var W = window.innerWidth, bw = Math.min(280, W - 24), s = size(), want = x + s * .9
      if (want + bw > W - 12) want = x + s * .1 - bw
      want = Math.max(12, Math.min(W - 12 - bw, want))
      bub.style.width = bw + 'px'; bub.style.left = (want - x) + 'px'
      var ms = Math.max(5200, 3500 + t.length * 45) // tempo de leitura: frases longas ficam mais (≈ +2 s nas grandes)
      setTimeout(function () { ro.classList.remove('revealed'); roam.classList.remove('talk'); busy = false }, ms)
    })
    roam.setAttribute('role', 'button'); roam.setAttribute('aria-label', MLKD_TXT.obs)
  }
  if (!all.length) return
  var px = window.innerWidth / 2, py = window.innerHeight / 2, last = 0
  function aim(o, x, y) {
    var eye = o.querySelector('.obs-eye'), iris = o.querySelector('.obs-iris'), body = o.querySelector('.obs-body')
    if (!eye || !body) return
    var r = eye.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, k = body.clientWidth / 160
    var dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy) || 1, f = Math.min(1, d / 260)
    if (o.classList.contains('flip')) dx = -dx // virado para a esquerda: o desenho está espelhado
    var mx = Math.round(dx / d * 4 * f), my = Math.round(dy / d * 2.4 * f) // em pixels do desenho: anda de pixel em pixel
    iris.style.transform = 'translate(' + (mx * k) + 'px,' + (my * k) + 'px)'
  }
  function aimAll() { all.forEach(function (o) { aim(o, px, py) }) }
  window.addEventListener('pointermove', function (e) { px = e.clientX; py = e.clientY; last = Date.now(); aimAll() }, { passive: true })
  window.addEventListener('touchstart', function (e) { var t = e.touches[0]; if (t) { px = t.clientX; py = t.clientY; last = Date.now(); aimAll() } }, { passive: true })
  window.addEventListener('scroll', aimAll, { passive: true })
  // parado: o olho vagueia sozinho
  setInterval(function () {
    if (Date.now() - last < 2500) return
    px = window.innerWidth * (0.15 + Math.random() * 0.7); py = window.innerHeight * (0.15 + Math.random() * 0.7); aimAll()
  }, 1800)
  // piscar
  ;(function blink() {
    setTimeout(function () { all.forEach(function (o) { o.classList.add('blink') }); setTimeout(function () { all.forEach(function (o) { o.classList.remove('blink') }); blink() }, 140) }, 2600 + Math.random() * 4200)
  })()
  // toque: murmura um fragmento; três toques seguidos revelam a Sombra
  document.querySelectorAll('[data-observer]').forEach(function (o) {
    var q = document.getElementById(o.getAttribute('data-quote') || ''), taps = [], i = Math.floor(Math.random() * FRAG.length)
    var say = function (t) { if (!q) return; q.classList.add('fade'); setTimeout(function () { q.textContent = '“' + t + '”'; q.classList.remove('fade') }, 350) }
    o.setAttribute('role', 'button'); o.setAttribute('tabindex', '0'); o.setAttribute('aria-label', MLKD_TXT.obsTap)
    var act = function () {
      var now = Date.now(); taps = taps.filter(function (t) { return now - t < 1600 }); taps.push(now)
      if (taps.length >= 3 && !o.classList.contains('revealed')) {
        taps = []; o.classList.add('revealed'); say(REVEAL)
        setTimeout(function () { o.classList.remove('revealed') }, 7200); return
      }
      if (!o.classList.contains('revealed')) { i = (i + 1) % FRAG.length; say(FRAG[i]) }
    }
    o.addEventListener('click', act)
    o.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act() } })
  })
  aimAll()
})()

/* ---------- Idioma: bandeirinhas e aviso "também em inglês/espanhol" ---------- */
;(function () {
  'use strict'
  var KEY = 'mlkd-lang'
  var get = function () { try { return localStorage.getItem(KEY) } catch (e) { return null } }
  var set = function (v) { try { localStorage.setItem(KEY, v) } catch (e) { /* sem armazenamento */ } }
  document.querySelectorAll('.lang-switch a, .lang a').forEach(function (a) {
    a.addEventListener('click', function () { set((a.getAttribute('hreflang') || a.getAttribute('lang') || 'pt').slice(0, 2)) })
  })
  // Só nas páginas em português, só se a pessoa nunca escolheu e o navegador não está em português
  if (MLKD_LANG !== 'pt' || get()) return
  var nl = (navigator.language || '').slice(0, 2).toLowerCase()
  if (nl === 'pt' || !nl) return
  var to = nl === 'es' ? 'es' : 'en'
  var link = document.querySelector('.lang-switch a[hreflang="' + to + '"]')
  if (!link) return
  var bar = document.createElement('div'); bar.className = 'lang-bar'
  bar.innerHTML = (to === 'es' ? 'Este sitio también está en español. ' : 'This site is also available in English. ') +
    '<a href="' + link.getAttribute('href') + '">' + (to === 'es' ? 'Ver en español' : 'View in English') + '</a>' +
    '<button type="button" aria-label="' + (to === 'es' ? 'Cerrar' : 'Close') + '">×</button>'
  bar.querySelector('a').addEventListener('click', function () { set(to) })
  bar.querySelector('button').addEventListener('click', function () { set('pt'); bar.remove() })
  document.body.appendChild(bar)
})()
