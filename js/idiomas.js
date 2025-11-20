// Language switch functionality
    const switchBtn = document.getElementById('lang-switch');
    let currentLang = 'en'; // default language

    switchBtn.addEventListener('click', () => {
      const elements = document.querySelectorAll('[data-lang-en]');
      if (currentLang === 'en') {
        elements.forEach(el => {
          el.textContent = el.getAttribute('data-lang-es');
          if(el.tagName.toLowerCase() === 'a' && el.hasAttribute('data-link-es')){
            el.href = el.getAttribute('data-link-es'); // Change link to Spanish
          }
        });
        switchBtn.textContent = 'EN';
        currentLang = 'es';
      } else {
        elements.forEach(el => {
          el.textContent = el.getAttribute('data-lang-en');
          if(el.tagName.toLowerCase() === 'a' && el.hasAttribute('data-link-en')){
            el.href = el.getAttribute('data-link-en'); // Change link to English
          }
        });
        switchBtn.textContent = 'ES';
        currentLang = 'en';
      }
    });

    // On load, ensure default language is English
    window.addEventListener('DOMContentLoaded', () => {
      const elements = document.querySelectorAll('[data-lang-en]');
      elements.forEach(el => {
        el.textContent = el.getAttribute('data-lang-en');
        if(el.tagName.toLowerCase() === 'a' && el.hasAttribute('data-link-en')){
          el.href = el.getAttribute('data-link-en');
        }
      });
      switchBtn.textContent = 'ES';
      currentLang = 'en';
    });