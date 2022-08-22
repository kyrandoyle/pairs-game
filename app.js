//Grab the information we need
const section = document.querySelector("section");
const playerLives = document.querySelector("span");
let playerLivesCount = 6;
const difficultyBtn = document.querySelectorAll(".difficulty-btn");
const backgroundMusic = document.querySelector(".background-music");
const correctSound = document.querySelector(".correct-sound");
const loseSound = document.querySelector(".lose-sound");
const winSound = document.querySelector(".win-sound");
const muteBtn = document.querySelector(".mute-music");
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
    //Disable turning other cards until check complete
    // disableCards.forEach((card) => {
    //   card.style.pointerEvents = "none";
    //   setTimeout(() => (card.style.pointerEvents = "all"), 1500);
    // });

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
      //disableCards.forEach((card) => (card.style.pointerEvents = "all"));
      //Reduce player Lives on incorrect guess
      playerLivesCount--;
      playerLives.innerText = playerLivesCount;
    }
  }
  if (playerLivesCount === 0) {
    loseSound.play();
    restart();
    playerLivesCount = 6;
    playerLives.innerText = playerLivesCount;
  }
  if (toggleCard.length === 16) {
    winSound.play();
    setTimeout(() => {
      restart();
      playerLivesCount = 6;
      playerLives.innerText = PlayerLivesCount;
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
  switch (difficultyIndex) {
    case "easy":
      restart();
      playerLivesCount = 11;
      playerLives.innerText = playerLivesCount;
      break;
    case "medium":
      restart();
      playerLivesCount = 8;
      playerLives.innerText = playerLivesCount;
      break;
    case "hard":
      restart();
      playerLivesCount = 5;
      playerLives.innerText = playerLivesCount;
      break;
  }
};

//Change Difficulty
difficultyBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    changeDifficulty(e);
  });
});

const muteMusic = (e) => {
  const soundFx = document.querySelectorAll("audio");
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
cardGenerator();
