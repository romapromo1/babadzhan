document.addEventListener('DOMContentLoaded', () => {
  //list all card options
  const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ]

  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  const startScreen = document.querySelector('#start-screen')
  const gameContainer = document.querySelector('#game-container')
  const startButton = document.querySelector('#start-button')
  const restartButton = document.querySelector('#restart-button')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []
  let isChecking = false
  let gameActive = false

  //create your board
  function createBoard() {
    grid.innerHTML = ''
    cardsChosen = []
    cardsChosenId = []
    cardsWon = []
    isChecking = false
    resultDisplay.textContent = '0'
    restartButton.hidden = true
    cardArray.sort(() => 0.5 - Math.random())

    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'images/blank.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
    gameActive = true
  }

  //check for matches
  function checkForMatch() {
    const cards = grid.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if(optionOneId === optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen[0])
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if  (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = 'Congratulations! You found them all!'
      restartButton.hidden = false
      gameActive = false
    }
    isChecking = false
  }

  //flip your card
  function flipCard() {
    if (!gameActive || isChecking) return

    let cardId = this.getAttribute('data-id')
    if (cardsChosenId.includes(cardId)) return

    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length ===2) {
      isChecking = true
      setTimeout(checkForMatch, 500)
    }
  }

  function startGame() {
    startScreen.classList.add('hidden')
    gameContainer.hidden = false
    createBoard()
  }

  function restartGame() {
    createBoard()
  }

  startButton.addEventListener('click', startGame)
  restartButton.addEventListener('click', restartGame)
})
