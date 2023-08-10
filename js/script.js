const menu = document.getElementById('menu-btn');
const close = document.getElementById('close-btn');
const nav = document.getElementById('navBar');

menu.addEventListener('click', () => {
    nav.classList.add('active');
});

close.addEventListener('click', () => {
    nav.classList.remove('active'); 
});


function countWordsAndChars() {
    const textArea = document.getElementById('textArea');
    const content = textArea.value;
    const words = content.trim().split(/\s+/).filter(word => word !== '');
    
    const wordCount = words.length;
    const charCount = content.length;
    const spaceCount = content.split(' ').length - 1;
    
    const wordCountSpan = document.getElementById('wordCount');
    const charCountSpan = document.getElementById('charCount');
    const spaceCountSpan = document.getElementById('spaceCount');
    
    wordCountSpan.textContent = wordCount;
    charCountSpan.textContent = charCount;
    spaceCountSpan.textContent = spaceCount;
  }

function removeWords() {
    const inputTextArea = document.getElementById('inputTextArea');
    const wordsToRemoveInput = document.getElementById('wordsToRemove');
    const outputTextArea = document.getElementById('outputTextArea');

    const inputText = inputTextArea.value;
    const wordsToRemove = wordsToRemoveInput.value.split(',').map(word => word.trim());

    let modifiedText = inputText;
    wordsToRemove.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        modifiedText = modifiedText.replace(regex, '');
    });

    outputTextArea.value = modifiedText;
}
 
  
function replaceWords() {
    const inputTextArea = document.getElementById('inputTextArea');
    const wordToReplaceInput = document.getElementById('wordToReplace');
    const replacementWordInput = document.getElementById('replacementWord');
    const outputTextArea = document.getElementById('outputTextArea');
    
    const inputText = inputTextArea.value;
    const wordToReplace = wordToReplaceInput.value;
    const replacementWord = replacementWordInput.value;
  
    const modifiedText = inputText.replace(new RegExp(wordToReplace, 'gi'), replacementWord);
    outputTextArea.value = modifiedText;
  }

  let speechUtterance;
  let isPaused = false;
  
  function toggleSpeech() {
    const textArea = document.getElementById('textArea');
    const readButton = document.getElementById('readButton');
    const pauseButton = document.getElementById('pauseButton');
    const resumeButton = document.getElementById('resumeButton');
    const volumeControl = document.getElementById('volumeControl');
  
    if (!speechUtterance || speechUtterance.text !== textArea.value) {
      speechUtterance = new SpeechSynthesisUtterance(textArea.value);
    }
  
    if (isPaused) {
      speechSynthesis.resume();
      isPaused = false;
      pauseButton.style.display = 'block';
      resumeButton.style.display = 'none';
    } else {
      speechSynthesis.speak(speechUtterance);
      pauseButton.style.display = 'block';
      resumeButton.style.display = 'none';
    }
  
    readButton.style.display = 'none';
    textArea.disabled = true;
  
    speechUtterance.onend = () => {
      readButton.style.display = 'block';
      pauseButton.style.display = 'none';
      resumeButton.style.display = 'none';
      textArea.disabled = false;
    };
  
    speechUtterance.onerror = () => {
      readButton.style.display = 'block';
      pauseButton.style.display = 'none';
      resumeButton.style.display = 'none';
      textArea.disabled = false;
    };
  
    speechUtterance.volume = volumeControl.value;
  }
  
  function pauseSpeech() {
    speechSynthesis.pause();
    isPaused = true;
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('resumeButton').style.display = 'block';
  }
  
  function resumeSpeech() {
    speechSynthesis.resume();
    isPaused = false;
    document.getElementById('pauseButton').style.display = 'block';
    document.getElementById('resumeButton').style.display = 'none';
  }
  
  document.getElementById('volumeControl').addEventListener('input', () => {
    if (speechUtterance) {
      speechUtterance.volume = document.getElementById('volumeControl').value;
    }
  });
  
  window.addEventListener('beforeunload', () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
  });
  
  
  



