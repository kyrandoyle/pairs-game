//Grab the information we need
const section = document.querySelector("section");
const playerLives = document.querySelector("span");
const playerLivesCount = 6;

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
  });
};

cardGenerator();
