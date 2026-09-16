/* ============================================================
   Ma'ruza mashg'uloti — interaktiv qatlam
   UrDU, Axborot xavfsizligi yo'nalishi
   ============================================================ */
(function () {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* =========================================================
     1. MA'LUMOTLAR
     ========================================================= */

  // Mashg'ulot bosqichlari
  const STAGES = [
    'Kirish, maqsad va natijalar',
    'Planshet savollari, muhokama',
    'Nomdor stipendiyalar tizimi',
    "Da'vogarlik mezonlari",
    'Tanlovlar va ularning natijasi',
    'Fan olimpiadalari',
    'Axborot xavfsizligi yo‘nalishi',
    'Bilim sinovi, topshiriq, xulosa'
  ];

  // Nomdor stipendiyalar (metodik qo'llanma, 38–39-betlar)
  const SCHOLARSHIPS = [
    {
      short: 'PRZ', name: 'O‘zbekiston Respublikasi Prezidentining davlat stipendiyasi',
      cat: 'final', tag: 'Bitiruvchi kurs',
      desc: 'Oliy ta’lim tashkilotlarining bitiruvchi kurs talabalariga tayinlanadi va to‘lanadi. Tizimdagi eng yuqori maqomli stipendiya.',
      keys: 'prezident davlat bitiruvchi yuqori maqom'
    },
    {
      short: 'BER', name: 'Beruniy nomli davlat stipendiyasi',
      cat: 'two', tag: 'Oxirgi ikki kurs',
      desc: 'Qomusiy olim Abu Rayhon Beruniy nomi bilan ataladi; tabiiy va aniq fanlar yo‘nalishidagi izlanishlarni rag‘batlantiradi.',
      keys: 'beruniy tabiiy aniq fan astronomiya geodeziya qomusiy'
    },
    {
      short: 'SIN', name: 'Ibn Sino nomli davlat stipendiyasi',
      cat: 'two', tag: 'Oxirgi ikki kurs',
      desc: 'Buyuk tabib va mutafakkir Abu Ali ibn Sino nomi bilan ataladi; tabobat va tabiiy fanlar sohasiga yo‘naltirilgan.',
      keys: 'ibn sino tabobat tibbiyot falsafa mutafakkir'
    },
    {
      short: 'NAV', name: 'Navoiy nomli davlat stipendiyasi',
      cat: 'two', tag: 'Oxirgi ikki kurs',
      desc: 'Alisher Navoiy nomi bilan ataladi; adabiyot, tilshunoslik va ijtimoiy-gumanitar yo‘nalishlarni qamrab oladi.',
      keys: 'navoiy adabiyot til gumanitar sheriyat'
    },
    {
      short: 'ULG', name: 'Ulug‘bek nomli davlat stipendiyasi',
      cat: 'two', tag: 'Oxirgi ikki kurs',
      desc: 'Mirzo Ulug‘bek nomi bilan ataladi; astronomiya, matematika va aniq fanlar maktabi an’analariga asoslanadi.',
      keys: 'ulugbek astronomiya matematika aniq fan rasadxona'
    },
    {
      short: 'BUX', name: 'Imom al-Buxoriy nomli davlat stipendiyasi',
      cat: 'two', tag: 'Oxirgi ikki kurs',
      desc: 'Imom al-Buxoriy nomi bilan ataladi; manbashunoslik va ijtimoiy-gumanitar tadqiqotlarni qo‘llab-quvvatlaydi.',
      keys: 'buxoriy hadis manbashunoslik sharqshunoslik'
    },
    {
      short: 'KRM', name: 'Islom Karimov nomli davlat stipendiyasi',
      cat: 'two', tag: 'Oxirgi ikki kurs',
      desc: 'O‘zbekistonning Birinchi Prezidenti nomi bilan ataladi; davlat va jamiyat qurilishi, iqtisodiyot yo‘nalishlariga e’tibor qaratadi.',
      keys: 'islom karimov davlat iqtisodiyot boshqaruv'
    },
    {
      short: 'BBR', name: 'Bobur nomli davlat stipendiyasi',
      cat: 'other', tag: 'Alohida nizom',
      desc: 'Zahiriddin Muhammad Bobur nomi bilan ataladi; adabiyot, tarix va ijodiy yo‘nalishdagi talabalarga qaratilgan.',
      keys: 'bobur boburnoma adabiyot tarix shoir'
    },
    {
      short: 'PHM', name: 'Pahlavon Mahmud nomli davlat stipendiyasi',
      cat: 'other', tag: 'Alohida nizom',
      desc: 'Xorazm zaminidan chiqqan shoir va pahlavon Pahlavon Mahmud nomi bilan ataladi.',
      keys: 'pahlavon mahmud xorazm shoir sport'
    },
    {
      short: 'QIP', name: 'To‘lepbergen Qaipbergenov nomli davlat stipendiyasi',
      cat: 'other', tag: 'Alohida nizom',
      desc: 'Qoraqalpoq adabiyotining yirik namoyandasi, yozuvchi To‘lepbergen Qaipbergenov nomi bilan ataladi.',
      keys: 'qaipbergenov qoraqalpoq yozuvchi adabiyot'
    },
    {
      short: 'YUS', name: 'Ibroyim Yusupov nomli davlat stipendiyasi',
      cat: 'other', tag: 'Alohida nizom',
      desc: 'Qoraqalpoq shoiri Ibroyim Yusupov nomi bilan ataladi; adabiyot va til yo‘nalishlarini rag‘batlantiradi.',
      keys: 'yusupov qoraqalpoq shoir adabiyot til'
    }
  ];

  // Sakkiz haftalik tayyorgarlik rejasi (qo'shimcha material)
  const WEEKS = [
    { n: '1-hafta', t: 'Imkoniyat xaritasi', d: 'Yo‘nalishingizga mos stipendiya, tanlov va olimpiadalar ro‘yxatini tuzing, muddatlarni yozib chiqing.' },
    { n: '2-hafta', t: 'Boshlang‘ich daraja', d: 'O‘tgan yillardagi topshiriqlar bilan tanishib, joriy bilim darajangizni o‘lchang.' },
    { n: '3–4-hafta', t: 'Nazariy baza', d: 'Fan bo‘yicha asosiy mavzularni takrorlang; axborot xavfsizligida kriptografiya va tarmoq asoslariga e’tibor bering.' },
    { n: '5-hafta', t: 'Amaliy mashq', d: 'Mashq platformalarida muntazam topshiriq yechish tartibini o‘rnating.' },
    { n: '6-hafta', t: 'Jamoa ishi', d: 'Jamoa tuzib, rollarni taqsimlang va yechimlarni birgalikda tahlil qiling.' },
    { n: '7-hafta', t: 'Sinov bosqichi', d: 'Vaqt cheklovi bilan sinov o‘tkazib, kuchsiz toifalarni aniqlang.' },
    { n: '8-hafta', t: 'Hujjat va portfolio', d: 'Ariza, tavsiyanoma, sertifikat va nashrlarni yakuniy shaklga keltiring.' },
    { n: 'Doimiy', t: 'Kuzatuv', d: 'Rasmiy e’lonlarni kuzatib boring; muddat o‘tkazib yuborilgan imkoniyat qaytmaydi.' }
  ];

  // Bilim sinovi
  const QUIZ = [
    {
      q: 'Prezident davlat stipendiyasi qaysi kurs talabalariga tayinlanadi?',
      o: ['Bitiruvchi kurs', 'Birinchi kurs', 'Oxirgi uch kurs', 'Barcha kurslar'],
      a: 0,
      fb: 'O‘zbekiston Respublikasi Prezidenti davlat stipendiyalari oliy ta’lim tashkilotlarining bitiruvchi kurs talabalariga tayinlanadi va to‘lanadi.'
    },
    {
      q: 'Beruniy, Ibn Sino, Navoiy, Ulug‘bek, Imom al-Buxoriy va Islom Karimov nomli stipendiyalar qamrovi qanday?',
      o: ['Oxirgi ikki kursda o‘qiyotgan talabalar', 'Faqat magistrantlar', 'Faqat birinchi kurs', 'Faqat davlat OTMlari talabalari'],
      a: 0,
      fb: 'Bu stipendiyalar davlat, nodavlat va xorijiy oliy ta’lim tashkilotlari, shu jumladan qo‘shma ta’lim dasturlarining oxirgi ikki kursida o‘qiyotgan talabalarga tayinlanadi.'
    },
    {
      q: 'Stipendiyaga da’vogarlik qachondan boshlab shakllanadi?',
      o: ['Quyi bosqichdan boshlab', 'Faqat bitiruv yilida', 'Ariza topshirilgan kunda', 'Saralashdan keyin'],
      a: 0,
      fb: 'Talaba quyi bosqichdan boshlab o‘quv, ilmiy va ma’naviy-ma’rifiy sohada fanlarni a’lo o‘zlashtirib, ijodiy faollik asosida saralash bosqichida ishtirok etadi.'
    },
    {
      q: 'Fan olimpiadalarining dastlabki bosqichi qaysi darajada o‘tkaziladi?',
      o: ['Oliy ta’lim tashkiloti darajasida', 'Respublika darajasida', 'Xalqaro darajada', 'Vazirlik darajasida'],
      a: 0,
      fb: 'Dastlabki saralash oliy ta’lim tashkiloti darajasida o‘tkaziladi, so‘ngra eng iqtidorli talabalar respublika bosqichida bellashadi.'
    },
    {
      q: 'al-Xorazmiy nomidagi xalqaro matematika fan olimpiadasi qanday davriylikda o‘tkaziladi?',
      o: ['Har ikki yilda bir marta', 'Har yili', 'Har semestrda', 'Har besh yilda'],
      a: 0,
      fb: 'Har ikki yilda bir marotaba xalqaro darajadagi al-Xorazmiy nomidagi matematika fan olimpiadasi o‘tkaziladi.'
    },
    {
      q: 'Quyidagilardan qaysi biri mahalliy darajadagi fan olimpiadalari qatoriga kiradi?',
      o: ['Kiberxavfsizlik', 'Xalqaro huquq', 'Dizayn', 'Logistika'],
      a: 0,
      fb: 'Mahalliy darajada fizika, kimyo, biologiya, axborot texnologiyalari va kiberxavfsizlik kabi fan olimpiadalari o‘tkaziladi.'
    },
    {
      q: 'Tanlovlarda ishtirok etish talabaga nimani bermaydi?',
      o: ['Imtihonlardan avtomatik ozod bo‘lish', 'Jamoada ishlash tajribasi', 'Ko‘nikmalarni sinash imkoni', 'Rahbarlik salohiyati'],
      a: 0,
      fb: 'Tanlovlar bilimni mustahkamlash, ko‘nikmalarni sinash, tajriba orttirish, rahbarlik, jamoada ishlash va ijodkorlikni rivojlantiradi; imtihon majburiyatini bekor qilmaydi.'
    }
  ];

  /* =========================================================
     2. SLAYD BOSHQARUVI
     ========================================================= */
  const slides = $$('.slide');
  const total  = slides.length;
  let current  = 0;

  const outlineList = $('#outlineList');
  const progBar     = $('#progBar');
  const dockLabel   = $('#dockLabel');
  const prevBtn     = $('#prevBtn');
  const nextBtn     = $('#nextBtn');

  // Reja paneli elementlarini yig'ish
  slides.forEach((sl, i) => {
    const b = document.createElement('button');
    b.className = 'o-item';
    b.innerHTML =
      '<span class="o-item__n">' + String(i + 1).padStart(2, '0') + '</span>' +
      '<span class="o-item__t">' + sl.dataset.title + '</span>';
    b.addEventListener('click', () => { go(i); closeOutline(); });
    outlineList.appendChild(b);
  });
  const outlineItems = $$('.o-item', outlineList);

  function go(i) {
    current = Math.max(0, Math.min(total - 1, i));
    slides.forEach((s, k) => s.classList.toggle('is-on', k === current));
    outlineItems.forEach((b, k) => b.classList.toggle('is-on', k === current));

    progBar.style.width = ((current + 1) / total * 100) + '%';
    dockLabel.textContent =
      (current + 1) + ' / ' + total + '  ·  ' + slides[current].dataset.title;

    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;

    slides[current].scrollTop = 0;
  }

  prevBtn.addEventListener('click', () => go(current - 1));
  nextBtn.addEventListener('click', () => go(current + 1));

  /* =========================================================
     3. REJA PANELI
     ========================================================= */
  const outline = $('#outline');
  const scrim   = $('#scrim');

  function openOutline()  { outline.hidden = false; scrim.hidden = false; }
  function closeOutline() { outline.hidden = true;  scrim.hidden = true;  }

  $('#outlineBtn').addEventListener('click', () =>
    outline.hidden ? openOutline() : closeOutline());
  $('#outlineClose').addEventListener('click', closeOutline);
  scrim.addEventListener('click', closeOutline);

  /* =========================================================
     4. MAVZU REJIMI
     ========================================================= */
  const themeIco = $('#themeIco');
  const STORE_KEY = 'urdu-maruza-theme';

  function applyTheme(mode) {
    document.documentElement.dataset.theme = mode;
    themeIco.textContent = mode === 'dark' ? '◑' : '◐';
    try { localStorage.setItem(STORE_KEY, mode); } catch (e) { /* xotira yopiq */ }
  }

  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem(STORE_KEY) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (e) { /* standart rejim */ }
  applyTheme(savedTheme);

  $('#themeBtn').addEventListener('click', () =>
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

  /* =========================================================
     5. MASHG'ULOT TAYMERI (80 daqiqa)
     ========================================================= */
  const timerBtn = $('#timerBtn');
  const timerVal = $('#timerVal');
  const TOTAL_SEC = 80 * 60;
  let left = TOTAL_SEC, tick = null;

  function renderTimer() {
    const m = Math.floor(left / 60), s = left % 60;
    timerVal.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  timerBtn.addEventListener('click', () => {
    if (tick) {
      clearInterval(tick); tick = null;
      timerBtn.classList.remove('is-run');
      return;
    }
    if (left === 0) left = TOTAL_SEC;
    timerBtn.classList.add('is-run');
    tick = setInterval(() => {
      left = Math.max(0, left - 1);
      renderTimer();
      if (left === 0) { clearInterval(tick); tick = null; timerBtn.classList.remove('is-run'); }
    }, 1000);
  });
  renderTimer();

  /* =========================================================
     6. MASHG'ULOT BOSQICHLARI
     ========================================================= */
  $('#timeline').innerHTML = STAGES.map((t, i) =>
    '<li class="t-item"><div class="t-item__m">' + String(i + 1).padStart(2, '0') + '</div>' +
    '<div class="t-item__t">' + t + '</div></li>').join('');

  /* =========================================================
     7. SAVOL KARTALARI
     ========================================================= */
  $$('.qcard').forEach(c => {
    const toggle = () => c.classList.toggle('is-open');
    c.addEventListener('click', toggle);
    c.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  /* =========================================================
     8. STIPENDIYALAR: FILTR VA IZLASH
     ========================================================= */
  const schList   = $('#schList');
  const schCount  = $('#schCount');
  const schSearch = $('#schSearch');
  let filter = 'all';

  function renderSch() {
    const q = schSearch.value.trim().toLowerCase();
    const rows = SCHOLARSHIPS.filter(s => {
      const byCat = filter === 'all' || s.cat === filter;
      const byTxt = !q ||
        s.name.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.keys.includes(q);
      return byCat && byTxt;
    });

    schList.innerHTML = rows.length
      ? rows.map(s =>
          '<article class="card' + (s.cat === 'final' ? ' card--final' : '') + '">' +
            '<div class="card__top">' +
              '<span class="card__ico">' + s.short + '</span>' +
              '<h3 class="card__name">' + s.name + '</h3>' +
            '</div>' +
            '<p class="card__desc">' + s.desc + '</p>' +
            '<span class="card__tag">' + s.tag + '</span>' +
          '</article>').join('')
      : '<p class="empty">So‘rov bo‘yicha stipendiya topilmadi. Boshqa kalit so‘z bilan izlab ko‘ring.</p>';

    schCount.textContent = rows.length + ' / ' + SCHOLARSHIPS.length + ' ta stipendiya';
  }

  $$('.seg', $('#schFilter')).forEach(b => {
    b.addEventListener('click', () => {
      $$('.seg', $('#schFilter')).forEach(x => x.classList.remove('is-on'));
      b.classList.add('is-on');
      filter = b.dataset.f;
      renderSch();
    });
  });
  schSearch.addEventListener('input', renderSch);
  renderSch();

  /* =========================================================
     9. DA'VOGARLIK TAYYORLIGI KALKULYATORI
     Og'irliklar: o'zlashtirish 40, ilmiy nashr 25,
     tanlov/olimpiada 20, ma'naviy-ma'rifiy faollik 15 = 100
     ========================================================= */
  const calc = {
    kurs:   $('#cKurs'),
    ball:   $('#cBall'),
    nashr:  $('#cNashr'),
    tanlov: $('#cTanlov'),
    tadbir: $('#cTadbir')
  };

  function ballScore(v) {              // o'zlashtirish, maksimum 40
    if (v >= 86) return 40;            // a'lo daraja
    if (v >= 71) return 26;
    return 12;
  }
  function stepScore(v, max) {         // 0..5 shkalani ballga aylantirish
    const table = [0, .48, .72, .88, .96, 1];
    return Math.round(table[Math.min(v, 5)] * max);
  }

  function renderCalc() {
    const kurs   = +calc.kurs.value;
    const ball   = +calc.ball.value;
    const nashr  = +calc.nashr.value;
    const tanlov = +calc.tanlov.value;
    const tadbir = +calc.tadbir.value;

    // Joriy qiymatlarni yorliqlarda ko'rsatish
    $('#vBall').textContent   = ball + '%';
    $('#vNashr').textContent  = nashr === 5 ? '5+' : nashr;
    $('#vTanlov').textContent = tanlov === 5 ? '5+' : tanlov;
    $('#vTadbir').textContent = tadbir === 5 ? '5+' : tadbir;

    const pct = ballScore(ball) + stepScore(nashr, 25) +
                stepScore(tanlov, 20) + stepScore(tadbir, 15);

    const lvl = pct >= 85 ? 'Saralash bosqichiga tayyor'
              : pct >= 65 ? 'Da’vogarlikka yaqin'
              : pct >= 45 ? 'Shakllanish davri'
              : 'Boshlang‘ich daraja';

    $('#calcPct').textContent = pct + '%';
    $('#calcLvl').textContent = lvl;
    $('#calcBar').style.width = pct + '%';

    // Qamrov: metodik qo'llanmadagi kurs shartlari asosida
    const scope = kurs === 4
      ? 'Bitiruvchi kurs sifatida Prezident davlat stipendiyasiga hamda alloma nomidagi stipendiyalarga da’vogarlik qamrovidasiz.'
      : kurs === 3
        ? 'Oxirgi ikki kurs qamroviga kirasiz: Beruniy, Ibn Sino, Navoiy, Ulug‘bek, Imom al-Buxoriy va Islom Karimov nomli stipendiyalar.'
        : 'Hozircha qamrovga kirmaydi — bu bosqich portfolio to‘plash davri. Ko‘rsatkichlar aynan shu yillarda shakllanadi.';
    $('#calcScope').textContent = scope;

    // Yetishmayotgan mezonlar
    const gaps = [];
    if (ball < 86)   gaps.push('O‘zlashtirishni a’lo darajaga (86% va yuqori) ko‘tarish — asosiy shart.');
    if (nashr === 0) gaps.push('Kamida bitta maqola yoki tezis tayyorlash.');
    else if (nashr < 2) gaps.push('Ilmiy nashrlar sonini oshirish — ikki va undan ko‘pi barqaror natija hisoblanadi.');
    if (tanlov === 0) gaps.push('Tanlov yoki olimpiadaning dastlabki bosqichida ishtirok etish.');
    else if (tanlov < 2) gaps.push('Ishtirokni turli formatlarga kengaytirish: olimpiada, hakaton, loyiha tanlovi.');
    if (tadbir < 2)  gaps.push('Ma’naviy-ma’rifiy va ijodiy tadbirlarda faollikni oshirish.');
    if (kurs <= 2)   gaps.push('Hujjat va sertifikatlarni hozirdan tizimli saqlab boring.');
    if (!gaps.length) gaps.push('Barcha asosiy mezonlar qamrab olingan — hujjatlarni saralash bosqichiga tayyorlang.');

    $('#calcGaps').innerHTML = gaps.map(g => '<li>' + g + '</li>').join('');
  }

  Object.keys(calc).forEach(k => {
    calc[k].addEventListener('input', renderCalc);
    calc[k].addEventListener('change', renderCalc);
  });
  renderCalc();

  /* =========================================================
     10. HAFTALIK REJA
     ========================================================= */
  $('#weeks').innerHTML = WEEKS.map(w =>
    '<div class="week"><div class="week__n">' + w.n + '</div>' +
    '<h3>' + w.t + '</h3><p>' + w.d + '</p></div>').join('');

  /* =========================================================
     11. BILIM SINOVI
     ========================================================= */
  const quizBox  = $('#quiz');
  const scoreVal = $('#scoreVal');
  const scoreTxt = $('#scoreTxt');
  let score = 0, answered = 0;

  function buildQuiz() {
    score = 0; answered = 0;
    scoreVal.textContent = '0';
    scoreTxt.textContent = 'Boshlang';

    quizBox.innerHTML = QUIZ.map((item, qi) =>
      '<div class="q" data-q="' + qi + '">' +
        '<div class="q__q"><span class="q__n">' + (qi + 1) + '</span><span>' + item.q + '</span></div>' +
        '<div class="q__opts">' +
          item.o.map((o, oi) =>
            '<button class="opt" data-o="' + oi + '">' + o + '</button>').join('') +
        '</div>' +
        '<p class="q__fb">' + item.fb + '</p>' +
      '</div>').join('');

    $$('.q', quizBox).forEach(qEl => {
      const qi = +qEl.dataset.q;
      const opts = $$('.opt', qEl);
      opts.forEach(btn => btn.addEventListener('click', () => {
        if (qEl.dataset.done) return;
        qEl.dataset.done = '1';

        const pick = +btn.dataset.o;
        const right = QUIZ[qi].a;
        opts.forEach((b, i) => {
          b.disabled = true;
          if (i === right) b.classList.add('is-ok');
          else if (i === pick) b.classList.add('is-no');
        });
        $('.q__fb', qEl).classList.add('is-on');

        if (pick === right) score++;
        answered++;
        scoreVal.textContent = score;
        scoreTxt.textContent = answered < QUIZ.length
          ? 'Javob berildi: ' + answered
          : (score === QUIZ.length ? 'Mavzu to‘liq o‘zlashtirilgan'
            : score >= 5 ? 'Yaxshi natija' : 'Mavzuni takrorlash tavsiya etiladi');
      }));
    });
  }
  $('#quizReset').addEventListener('click', buildQuiz);
  buildQuiz();

  /* =========================================================
     12. KLAVIATURA BOSHQARUVI
     ========================================================= */
  document.addEventListener('keydown', e => {
    if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;

    switch (e.key) {
      case 'ArrowRight': case 'PageDown': go(current + 1); break;
      case 'ArrowLeft':  case 'PageUp':   go(current - 1); break;
      case ' ':          e.preventDefault(); go(current + 1); break;
      case 'Home':       go(0); break;
      case 'End':        go(total - 1); break;
      case 'Escape':     closeOutline(); break;
      case 'o': case 'O': outline.hidden ? openOutline() : closeOutline(); break;
      case 'f': case 'F':
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen().catch(() => {});
        break;
      default:
        if (/^[1-9]$/.test(e.key)) go(+e.key - 1);
    }
  });

  /* =========================================================
     13. ISHGA TUSHIRISH
     ========================================================= */
  go(0);
})();
