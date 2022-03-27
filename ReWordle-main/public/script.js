console.log('hello from script');
let currWord = [];
let gssWord = [];
let rowInd = 1;
let colInd = 0;
let matchCount = 0;
let keyBtns = document.querySelectorAll('button')
keyBtns.forEach(button=>button.addEventListener('click', pressButton));

(async function getWord() {   
let word = await fetch('http://localhost:5000/getWord')
    .then(response => response.json())
    .then(data => setCurrWord(data))
    .catch(err => {
        console.error('couldnt get word from server:'+err)
        setCurrWord({userWord: 'BIRDS'})       //default word in case couldnt get from server
    })
})();

function setCurrWord(wordObj) {
    currWord = wordObj.userWord.split('')
    console.log('Set Current Word to:',currWord);
}

function pressButton(event) {
    let key = event.target.dataset.key
    console.log(event.target);
    switch (key) {
        case '←':
            deleteLetter();
            break;
        case '↵':
            if (gssWord.length % 5 ==0 && gssWord.length > 0) 
                testWord();
            break;
        case 'restart':
            resetBoard();
            break;
        default:
            if (rowInd <= 5)
                    putLetter(key.toUpperCase());
            break;
    }
}


function putLetter(letter){
    gssWord.push(letter);
    console.log(gssWord);
    let butEl = document.getElementById(`${colInd*5+rowInd}`)
    butEl.innerHTML = letter
    rowInd++;
}

function deleteLetter() {
    if (gssWord.length>0) {
        gssWord.splice(-1)
        let butEl = document.getElementById(`${colInd*5+rowInd-1}`)
        butEl.innerHTML = ' '
        rowInd--; 
    }
}

function testWord() {
    // Change Buttons Color
    for (let index = 1; index <= 5; index++) {
        let butEl = document.getElementById(`${colInd*5+index}`)
        if (butEl.innerHTML == currWord[index-1]) {
            butEl.style.backgroundColor = 'rgb(106,170,100)'
            
            matchCount++;
        } else if(currWord.some(item => item == butEl.innerHTML)){
            butEl.style.backgroundColor = 'orange'
        } else {
            butEl.style.backgroundColor = 'red'
        }
    }
    setTimeout(() => {console.log("timeout", 5000)}, 5000);
    if(matchCount == 5){
        if(confirm("you won!, Do you want to play again?")){
            resetBoard();
        };
        return
    } else if ( colInd == 5){
        if(confirm("you lost, Do you want to play again?")){
            resetBoard();
        };
    }
    matchCount = 0;
    colInd++;
    rowInd = 1;
    gssWord =[];
}

function resetBoard() {
    // reset color and innerHTML
    for (let index = 1; index <= 25; index++){
        let butEl = document.getElementById(`${index}`)
        butEl.style.backgroundColor = 'rgb(172, 169, 169)';
        butEl.innerHTML = ' ';
    }
    matchCount = 0;
    colInd = 0;
    rowInd = 1;
    gssWord =[]; 
}