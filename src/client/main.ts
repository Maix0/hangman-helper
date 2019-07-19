const creator= document.querySelector(".creator")!
const helper = document.querySelector(".helper")!

const createBtn = document.getElementById("createHelper")!
const createInput: any = document.getElementById("maxLenght")!
const wordList = document.querySelector(".wordList")!
const bestLetter = document.querySelector(".bestLetters")!
const Word = document.querySelector(".word")!

createBtn.addEventListener("click", function (e) {
    for (let index = 0; index < Number(createInput.value); index++) {
        Word.innerHTML += `<input class="letter ${index}" maxlength="1">`
    }
    helper.classList.toggle("hidden")
    creator.classList.toggle("hidden")
    
})