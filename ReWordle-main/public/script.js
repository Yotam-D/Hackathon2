console.log('hello from script');
let currentInd = 1;
let keyBtns = document.querySelectorAll('button')
keyBtns.forEach(button=>button.addEventListener('click', pressButton))

function getWord(params) {   
}



function pressButton(event) {
    console.log(event.target.dataset.key);
}