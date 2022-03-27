console.log('hello from script');
let currWord = [];
let currentInd = 1;
let keyBtns = document.querySelectorAll('button')
keyBtns.forEach(button=>button.addEventListener('click', pressButton))

async function getWord() {   
let word = await fetch('http://localhost:5000/getWord')
    .then(response => response.json())
    .then(data => setCurrWord(data))
    .catch(err => console.error('couldnt get word from server:'+err))
}

function pressButton(event) {
    console.log(event.target.dataset.key);
}

function setCurrWord(wordObj) {
    currWord = wordObj.userWord.split('')
    console.log('Set Current Word to:',currWord);
}