let wordSpace = document.querySelector(".word-space");
let hints = document.querySelector(".hints");
const baseUrl = "https://api.datamuse.com/words?rel_";
const first = async () => {
  let jsFormat = await (await fetch(`${baseUrl}jja=public`)).json();
  let random = Math.floor(Math.random() * 85);
  let jsFormat2 = await (
    await fetch(`${baseUrl}jja=${jsFormat[random].word}`)
  ).json();
  limitCheck(jsFormat2);
};
function limitCheck(arr) {
  let newArr = [];
  for (i of arr) {
    if (i.word.length <= 6) {
      newArr.push(i.word);
    }
  }
  if (newArr.length == 0) {
    first();
  } else {
    let random = Math.floor(Math.random() * newArr.length);
    console.log(newArr[random]);
    placement(newArr[random]);
  }
}

let wordCheck = "";
const placement = async (word) => {
  let jsFormat = await (await fetch(`${baseUrl}syn=${word}`)).json();
  if (jsFormat.length > 3) {
    for (let i = 0; i < word.length; i++) {
      let temp = document.createElement("div");
      temp.setAttribute("class", "word");
      wordSpace.append(temp);
    }
    hints.innerHTML = `<b>Hints:</b> ${jsFormat[0].word}, ${jsFormat[1].word}, ${jsFormat[2].word}`;
    wordCheck = word;
  } else {
    first();
  }
};

document.addEventListener("keypress", keydown);
let guess = 8;

if (window.screen.width > 768+"px") {
  function keydown(e) {
    let Guessed = false;
    for (let i = 0; i < wordCheck.length; i++) {
      if (wordCheck[i].toUpperCase() == e.key.toUpperCase()) {
        document.querySelectorAll(".word")[i].innerText = e.key.toUpperCase();
        Guessed = true;
      }
    }
    if (!Guessed) {
      document.querySelector(".guess span").innerText = --guess;
    }
    if (guess == 0) {
      document.removeEventListener("keypress", keydown);
      alert("Game Over, The word was " + wordCheck);
    }
  }
} else {
  document.querySelectorAll(".virtual-keyboard button").forEach((button) => {
    button.addEventListener("click", () => {
      handleGuess(button.innerText);
    });
  });

  function handleGuess(key) {
    let Guessed = false;
    for (let i = 0; i < wordCheck.length; i++) {
      if (wordCheck[i].toUpperCase() == key.toUpperCase()) {
        document.querySelectorAll(".word")[i].innerText = key.toUpperCase();
        Guessed = true;
      }
    }
    if (!Guessed) {
      document.querySelector(".guess span").innerText = --guess;
    }
    if (guess == 0) {
      document.removeEventListener("keypress", keydown);
      alert("Game Over, The word was " + wordCheck);
    }
  }

  document.addEventListener("keypress", (e) => handleGuess(e.key));
}
window.onload = first;
