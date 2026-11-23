/* Balcony8 — intro timeline + contact copy interaction */
(function () {
  var root = document.documentElement;

  // ---- Intro: start once the brand fonts and the background are ready (max 2.5 s wait) ----
  if (root.classList.contains('anim')) {
    var started = false;
    var start = function () {
      if (started) return;
      started = true;
      requestAnimationFrame(function () { root.classList.add('play'); });
    };
    var waits = [];
    if (document.fonts && document.fonts.load) {
      waits.push(document.fonts.load('110px "Hot Mess"'));
      waits.push(document.fonts.load('500 24px "Eleven Eleven"'));
    }
    var bg = document.querySelector('.bg img');
    if (bg && bg.decode) waits.push(bg.decode().catch(function () {}));
    Promise.all(waits).then(start, start);
    setTimeout(start, 2500);
  }

  // ---- After the intro: drop the intro classes so hover animations start from a clean state ----
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var ready = !root.classList.contains('anim');
  var finishIntro = function () {
    if (ready) return;
    ready = true;
    root.classList.remove('anim', 'play');
  };
  var underline = document.querySelector('.wordmark .u');
  if (!ready && underline) {
    underline.addEventListener('animationend', finishIntro, { once: true });
    setTimeout(finishIntro, 6000);
  }

  // Re-run a one-shot hover animation, letting it finish before it can run again.
  var replay = function (el, cls, endTarget) {
    if (!ready || reduced.matches || !finePointer.matches || el.classList.contains(cls)) return;
    el.classList.add(cls);
    (endTarget || el).addEventListener('animationend', function () { el.classList.remove(cls); }, { once: true });
  };

  // Headline: each letter re-inks as the cursor passes over it
  document.querySelectorAll('.headline .l').forEach(function (l) {
    l.addEventListener('pointerenter', function () { replay(l, 'reink'); });
  });

  // Wordmark: letters ripple and the underline re-signs
  var wordmark = document.querySelector('.wordmark');
  if (wordmark && underline) {
    wordmark.addEventListener('pointerenter', function () { replay(wordmark, 'wave', underline); });
  }

  // ---- C2: click to copy on desktop (phones keep tel:/mailto: behaviour) ----
  document.querySelectorAll('.contact [data-copy]').forEach(function (link) {
    var tip = link.querySelector('.tip');
    var timer;
    link.addEventListener('click', function (e) {
      if (!finePointer.matches || !navigator.clipboard) return;
      e.preventDefault();
      navigator.clipboard.writeText(link.dataset.copy).then(function () {
        tip.textContent = 'Copied';
        link.classList.add('copied');
        clearTimeout(timer);
        timer = setTimeout(function () {
          link.classList.remove('copied');
          tip.textContent = 'Click to copy';
        }, 1600);
      }, function () {
        window.location.href = link.getAttribute('href');
      });
    });
  });
})();
