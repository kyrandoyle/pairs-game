//Grab the information we need
const section = document.querySelector("section");
const playerLives = document.querySelector("span");
let playerLivesCount = 11;
const playerLivesEasy = 11;
const playerLivesMedium = 8;
const playerLivesHard = 5;
const difficultyBtn = document.querySelectorAll(".difficulty-btn");
//Sounds
const backgroundMusic = document.querySelector(".background-music");
const correctSound = document.querySelector(".correct-sound");
const loseSound = document.querySelector(".lose-sound");
const winSound = document.querySelector(".win-sound");
const muteBtn = document.querySelector(".mute-music");
const soundFx = document.querySelectorAll("audio");
const playSounds = soundFx;
//Modal box
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modalBtn");
const closeModal = document.querySelector(".close");

//Set Player Lives
playerLives.textContent = playerLivesCount;

//Playing Cards
const getData = () => [
  { imgSrc: "./images/ada.jpg", name: "ada" },
  { imgSrc: "./images/bnb.jpg", name: "bnb" },
  { imgSrc: "./images/btc.jpg", name: "btc" },
  { imgSrc: "./images/doge.jpg", name: "doge" },
  { imgSrc: "./images/eth.jpg", name: "eth" },
  { imgSrc: "./images/sol.jpg", name: "sol" },
  { imgSrc: "./images/usdt.jpg", name: "usdt" },
  { imgSrc: "./images/xrp.jpg", name: "xrp" },
  { imgSrc: "./images/ada.jpg", name: "ada" },
  { imgSrc: "./images/bnb.jpg", name: "bnb" },
  { imgSrc: "./images/btc.jpg", name: "btc" },
  { imgSrc: "./images/doge.jpg", name: "doge" },
  { imgSrc: "./images/eth.jpg", name: "eth" },
  { imgSrc: "./images/sol.jpg", name: "sol" },
  { imgSrc: "./images/usdt.jpg", name: "usdt" },
  { imgSrc: "./images/xrp.jpg", name: "xrp" },
];

//Randomise
const randomise = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//Generate Cards
const cardGenerator = () => {
  cardData = randomise();

  //Loop over the cards
  cardData.forEach((item) => {
    //Create the HTML
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");

    card.classList.add("card");
    face.classList.add("face");
    back.classList.add("back");

    //Append cards
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

    card.addEventListener("click", function (e) {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

//Check if the cards Match
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCard = document.querySelectorAll(".flipped");
  const disableCards = document.querySelectorAll(".card");
  const toggleCard = document.querySelectorAll(".toggleCard");

  console.log(clickedCard);

  //LOGIC
  // - Check if two cards are turned
  if (flippedCard.length === 2) {
    //Check if turned cards match
    if (
      flippedCard[0].getAttribute("name") ===
      flippedCard[1].getAttribute("name")
    ) {
      console.log("match");
      setTimeout(() => correctSound.play(), 500);
      flippedCard.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      flippedCard.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1500);
      });
      //Reduce player Lives on incorrect guess
      playerLivesCount--;
      playerLives.innerText = playerLivesCount;
    }
  }
  // Lose Game sequence
  if (playerLivesCount === 0) {
    loseSound.play();
    restart();

    //Reset Player Lives to the correct amount as per difficulty level
    difficultyBtn.forEach((btn) => {
      if (btn.classList.contains("active")) {
        const btnName = btn.getAttribute("name");
        switch (btnName) {
          case "easy":
            playerLivesCount = playerLivesEasy;
            break;
          case "medium":
            playerLivesCount = playerLivesMedium;
            break;
          case "hard":
            playerLivesCount = playerLivesHard;
            break;
        }
      }
    });
    playerLives.innerText = playerLivesCount;
  }
  //Win Game sequence

  if (toggleCard.length === 16) {
    winSound.play();
    setTimeout(() => {
      restart();
      //Reset Player Lives to the correct amount as per difficulty level
      difficultyBtn.forEach((btn) => {
        if (btn.classList.contains("active")) {
          const btnName = btn.getAttribute("name");
          switch (btnName) {
            case "easy":
              playerLivesCount = playerLivesEasy;
              break;
            case "medium":
              playerLivesCount = playerLivesMedium;
              break;
            case "hard":
              playerLivesCount = playerLivesHard;
              break;
          }
        }
      });
      playerLives.innerText = playerLivesCount;
    }, 3500);
  }
};

//Restart Game

const restart = () => {
  let cardData = randomise();

  // const toggleCard = document.querySelectorAll(".toggleCard");
  const cards = document.querySelectorAll(".card");
  const faces = document.querySelectorAll(".face");

  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    cards[index].classList.remove("flipped");
    cards[index].style.pointerEvents = "all";
    setTimeout(() => {
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
    }, 1000);
  });
};

const changeDifficulty = (e) => {
  const difficultyIndex = e.target.name;
  difficultyBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
  switch (difficultyIndex) {
    case "easy":
      restart();
      playerLivesCount = playerLivesEasy;
      playerLives.innerText = playerLivesCount;
      e.target.classList.toggle("active");
      break;
    case "medium":
      restart();
      playerLivesCount = playerLivesMedium;
      playerLives.innerText = playerLivesCount;
      e.target.classList.toggle("active");
      break;
    case "hard":
      restart();
      playerLivesCount = playerLivesHard;
      playerLives.innerText = playerLivesCount;
      e.target.classList.toggle("active");
      break;
  }
};

//Change Difficulty
difficultyBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    changeDifficulty(e);
  });
});

// Set sounds to be muted as default

window.onload = () => {
  for (const fx of soundFx) {
    fx.muted = true;
    fx.pause();
    muteBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
  }
};

// Music Button
const muteMusic = (e) => {
  e.target.classList.toggle("active");
  if (e.target.classList.contains("active")) {
    for (const fx of soundFx) {
      fx.muted = true;
      fx.pause();
      muteBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    }
  } else {
    console.log("hello");
    for (const fx of soundFx) {
      fx.muted = false;
      backgroundMusic.play();
      muteBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    }
  }
};

// Music Button
muteBtn.addEventListener("click", function (e) {
  muteMusic(e);
});

//Modal Box
modalBtn.addEventListener("click", function () {
  modal.style.display = "flex";
});

closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

cardGenerator();
