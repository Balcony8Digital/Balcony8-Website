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

  // ---- C2: click to copy on desktop (phones keep tel:/mailto: behaviour) ----
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
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
