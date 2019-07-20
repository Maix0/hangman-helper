const creator= document.querySelector(".creator")!
const helper = document.querySelector(".helper")!

const createBtn = document.getElementById("createHelper")!
const createInput: any = document.getElementById("maxLenght")!
const wordList = document.querySelector(".wordList")!
const bestLetter = document.querySelector(".bestLetters")!
const Word = document.querySelector(".word")!

const wrongBtn = document.querySelector(".wrongBtn")!
const wrongInp = document.querySelector(".wrongInp")!
const wrongList= document.querySelector(".wrong-list")!

const submit = document.querySelector(".submitLetters")!


createBtn.addEventListener("click", function (e) {
    for (let index = 0; index < Number(createInput.value); index++) {
        Word.innerHTML += `<input class="letter ${index}" maxlength="1">`
    }
    helper.classList.toggle("hidden")
    creator.classList.toggle("hidden")
})

wrongBtn.addEventListener("click", function () {
    wrongList.innerText += wrongInp.value
})

submit.addEventListener("click", function () {
    const letters = document.querySelectorAll(".letter")
    //gather letter from word inputs
    let regexSender = ""
    letters.forEach(node => {
        regexSender += node.value ? "_": node.value
    });

})
