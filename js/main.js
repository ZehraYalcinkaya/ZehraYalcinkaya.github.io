/* ===================== ZEHRA PORTFOLYO - main.js ===================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Yıl (footer) ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobil hamburger menü ---------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("open");
  });

  // Menüden bir linke tıklanınca mobil menüyü kapat
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
    });
  });

  /* ---------- Navbar gölge (scroll) ---------- */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 10);
  });

  /* ---------- Scroll-reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Aktif menü vurgusu ---------- */
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navAnchors = navLinks.querySelectorAll("a[href^='#']");

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navAnchors.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => activeObserver.observe(s));

  /* ---------- Profil yukarı çıktığında düşen yıldız ---------- */
  const photoFrame = document.querySelector(".photo-frame");
  const hero = document.getElementById("hero");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function spawnStar() {
    if (!photoFrame || !hero || document.hidden) return;

    const heroRect = hero.getBoundingClientRect();
    const frameRect = photoFrame.getBoundingClientRect();

    const star = document.createElement("span");
    star.className = "star";
    star.textContent = "⭐";

    // Çerçevenin üst kenarında, rastgele yatay konum
    const x = frameRect.left - heroRect.left + Math.random() * frameRect.width;
    const y = frameRect.top - heroRect.top;
    star.style.left = x + "px";
    star.style.top = y + "px";
    hero.appendChild(star);

    // Rastgele açı, yana sürüklenme ve düşüş mesafesi
    const startAngle = Math.random() * 360;
    const drift = (Math.random() - 0.5) * 140;
    const fall = frameRect.height + 140 + Math.random() * 90;
    const dur = 2800 + Math.random() * 1600;

    const anim = star.animate(
      [
        { transform: `translate(0,0) rotate(${startAngle}deg) scale(0.3)`, opacity: 0 },
        { transform: `translate(${drift * 0.3}px, ${fall * 0.18}px) rotate(${startAngle + 80}deg) scale(1)`, opacity: 1, offset: 0.18 },
        { transform: `translate(${drift}px, ${fall}px) rotate(${startAngle + 360}deg) scale(0.6)`, opacity: 0 }
      ],
      { duration: dur, easing: "cubic-bezier(.25,.1,.4,1)" }
    );
    anim.onfinish = () => star.remove();
  }

  if (!prefersReduced) {
    // float animasyonu 6sn: zirve (en üst nokta) 3sn'de, sonra her 6sn'de bir
    setTimeout(() => {
      spawnStar();
      setInterval(spawnStar, 6000);
    }, 3000);
  }

  /* ---------- Dil değiştirme (TR / EN) ---------- */
  const langBtn = document.getElementById("langBtn");
  const htmlEl = document.documentElement;
  const translatable = document.querySelectorAll("[data-tr]");

  function setLang(lang) {
    translatable.forEach((el) => {
      const text = el.getAttribute("data-" + lang);
      if (text !== null) el.textContent = text;
    });
    htmlEl.setAttribute("lang", lang);
    // Buton, geçilebilecek DİĞER dili gösterir
    langBtn.textContent = lang === "tr" ? "EN" : "TR";
    localStorage.setItem("lang", lang);
  }

  // Kayıtlı tercih (varsayılan: tr)
  setLang(localStorage.getItem("lang") || "tr");

  langBtn.addEventListener("click", () => {
    const current = htmlEl.getAttribute("lang");
    setLang(current === "tr" ? "en" : "tr");
  });
});
