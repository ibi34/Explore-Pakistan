
 
  const searchWrapper = document.querySelector('.search-wrapper');
  const searchButton = document.querySelector('.search-button');

  searchButton.addEventListener('click', () => {
 
    searchWrapper.classList.toggle('active');

  
    if(searchWrapper.classList.contains('active')) {
      searchWrapper.querySelector('.search-input').focus();
    }
  });

  
  searchWrapper.querySelector('.search-input').addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
      e.preventDefault();
      alert("Searching for: " + this.value);
 
    }
  });


  // 1. Sab se pehle un sab elements ko pakro jin par 'scroll-hidden' class lagi hai
const hiddenElements = document.querySelectorAll('.scroll-hidden');

// 2. Chowkidar (Observer) banao
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Agar element screen par nazar aa gaya hai (intersect ho gaya hai)
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-show'); // Usko show karne wali class laga do
        } else {
            // (Optional) Agar aap chahte hain ke jab user wapis upar jaye to element dobara chup jaye
            // to aap is line ko uncomment kar sakte hain:
            // entry.target.classList.remove('scroll-show');
        }
    });
}, {
    threshold: 0.2 // Iska matlab hai jab div 20% screen par nazar aajaye tab animation start ho
});

// 3. Chowkidar ko kaho ke document mein jitne bhi hidden elements hain, un sab par nazar rakhay
hiddenElements.forEach((el) => observer.observe(el));






