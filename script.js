const menu = document.getElementById('menu');
menu.addEventListener('click',function(){
    const hiddenContent = document.getElementById('hiddenContent');
    if(hiddenContent.classList.contains('hidden')){
        hiddenContent.classList.remove('hidden');
    } else{
        hiddenContent.classList.add('hidden')
    }

});


document.addEventListener('DOMContentLoaded', function () {
    const textElement = document.getElementById('heading');
    const words = ['Meet our team 😊'];
  
    let currentWordIndex = 0;
    let currentCharIndex = 0;
  
    function type() {
      if (currentWordIndex < words.length) {
        const currentWord = words[currentWordIndex];
        textElement.textContent = currentWord.substring(0, currentCharIndex + 1);
        currentCharIndex++;
  
        if (currentCharIndex === currentWord.length) {
          // Move to the next word
          currentWordIndex++;
          currentCharIndex = 0;
  
          setTimeout(type, 1000); // Pause before typing the next word
        } else {
          setTimeout(type, 50); // Type next character
        }
      } else {
        // Reset indices and start the animation again
        currentWordIndex = 0;
        currentCharIndex = 0;
        setTimeout(type, 1000); // Pause before restarting
      }
    }
    // Start typing animation
    type();
  });

 