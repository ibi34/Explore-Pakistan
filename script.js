
 
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







