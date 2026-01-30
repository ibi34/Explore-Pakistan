
 
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


const faders = document.querySelectorAll('.fade-up');

const appearOptions = {
  threshold: 0.2,
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target); // fade only once
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});




