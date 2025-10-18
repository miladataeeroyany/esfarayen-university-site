document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.section, .subsection, .linzi');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
});
// آدرس هدفی که می‌خواهی نشان داده شود
const target = 'https://esfarayen-university-site/';

// تابع کمکی برای بررسی same-origin
function isSameOrigin(url) {
  try {
    const u = new URL(url, window.location.href);
    return u.origin === window.location.origin;
  } catch (e) {
    return false;
  }
}

// سعی می‌کنیم URL کامل را (اگر same-origin بود) یا مسیر را (fallback) ست کنیم
function setDisplayedUrl(url) {
  if (isSameOrigin(url)) {
    // اگر همان origin است، می‌توانیم از replaceState استفاده کنیم تا entry جدید در history ایجاد نکند
    history.replaceState({}, '', url);
    console.log('Displayed URL set to (same-origin):', url);
  } else {
    // اگر origin متفاوت است، فقط مسیر را نشان می‌دهیم (بدون تغییر origin)
    // مسیر مناسب را از URL هدف جدا می‌کنیم
    try {
      const u = new URL(url, window.location.href);
      const path = u.pathname + (u.search || '') + (u.hash || '');
      history.replaceState({}, '', path);
      console.log('Displayed URL set to path-only (origin preserved):', path);
    } catch (e) {
      console.error('Invalid URL:', e);
    }
  }
}

// اجرای تابع
setDisplayedUrl(target);

